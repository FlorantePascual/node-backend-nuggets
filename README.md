# NodeJS Backend Nuggets (node-backend-nuggets)

Welcome to NodeJS Backend Nuggets, a collection of backend code snippets and tutorials using Node.js and TypeScript. This repository is designed to complement the Angular Snippet Nuggets by providing backend services that run on GCP's Firebase Platform and are deployed as serverless cloud functions.

## Tutorials

### 1. Real-Time Crypto Currency Graph Dashboard Backend

**Description:**  
This tutorial covers setting up a backend proxy for retrieving real-time cryptocurrency data from coingecko.com. The data is then used in the [Angular Snippet Nuggets](https://github.com/FlorantePascual/ng-snippet-nuggets) real-time cryptocurrency graph dashboard.

**Technologies Used:**
- Node.js
- TypeScript
- Firebase Cloud Functions

**Features:**
- Serverless architecture
- Real-time data retrieval from coingecko.com
- Secure and scalable backend services

## Getting Started

### Prerequisites
- Node.js (v16.x or later)
- Setup Firebase
   ```sh
   npm install -g firebase-tools  # if you haven't done so already
   ```
- Initialize Firebase
   ```sh
   firebase login       # if not logged in yet
   firebase use --clear # clears any active project
   firebase init
   ```
   Follow the prompts to link your Firebase project and configure the Functions emulator and other Firebase services as needed.
   1. For features to setup, select **Functions** and **Emulators**
   2. Create new or select a project. When asked to Initialize or Overwrite codebase, select **Overwrite**
   3. Select **TypeScript** as the language
   4. Select **Yes** for ESLint
   5. For all prompts where a file already exists, select **No Overwrite**
   6. Include dependencies now? **Yes**
   7. For emulators, select **Function Emulator**

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/FlorantePascual/node-backend-nuggets
   cd node-backend-nuggets
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set API keys to the secure environment:**
   ```sh
   firebase functions:config:set coingecko.key="YOUR_API_KEY"
   ```
   Make a local copy of the keys so that the local emulator can access them:
   ```sh
   firebase functions:config:set > .runtimeconfig.json
   ```
   IMPORTANT: Do not check-in this file `.runtimeconfig.json` in your remote repo!

4. **Deploy to Firebase:**
   ```sh
   npm run deploy
   ```

## Running Locally

To run the backend locally using the Firebase Functions emulator, follow these steps:

1. **Make sure Firebase Tools is installed and go to the functions directory**
   ```sh
   firebase --version # should display version number
   cd functions
   ```

2. **Start the emulator:**
   ```sh
   npm run serve
   ```

3. **Access the local endpoints:**
   The local emulator will provide URLs for the functions that can be used for local development and testing.

## Usage

After deploying the backend, it will be accessible as a set of serverless functions on Firebase. Use the provided endpoints in your frontend application.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any inquiries, please contact me at [FlorantePascual.com](https://www.florantepascual.com).

Happy Coding!