import * as functions from 'firebase-functions';
import * as cors from 'cors';

export const coinGeckoProxy = functions.https.onRequest((req, res) => {
    cors({ origin: true })(req, res, main);
    function main() {
        return requestHandler(req, res);
    }
});

// listen to the request and respond with the result from Coingecko API
const requestHandler = async (req: functions.Request, res: functions.Response) => {
    // Check for POST request and API key
    if (req.method !== 'POST') {
        res.status(405).send('Method Not Allowed');
        return;
    }

    const { overrideKey } = req.body;
    const override = overrideKey === 'YOUR_SECRET_OVERRIDE_KEY';

    const isLocal = process.env.FUNCTIONS_EMULATOR;
    if (!isLocal && !override) {
        // check valid domains of request
        const origin = req.headers.origin || '';
        const validOrigins = ['https://yourdomain.com', 'https://yourdomain.web.app'];
        const match = validOrigins.some((pattern) => origin.includes(pattern) || origin === pattern);
        if (!match) {
            res.status(403).send('Forbidden - Invalid origin');
            return;
        }
    }

    // Validate payload
    const { currency, coinId } = req.body;
    if (!currency) {
        res.status(400).send('Bad Request - Missing required fields');
        return;
    }

    let url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}`;

    // If coinId is provided, get the coin market chart data
    if (coinId) {
        url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency}&days=1`;
    }

    // Call Coingecko API
    const CG_API_KEY = functions.config().coingecko.key;
    try {
        const responseMessage = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-cg-demo-api-key': `${CG_API_KEY}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            })
            ;
        res.status(200).json(responseMessage);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
};
