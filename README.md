# social-faucet
This project shows how to implement a ETH faucet for an ERC20 token with Next.js that requires authentication from social providers.

## How to run the project

1. Deploy the contracts using the Hardhat script located in contracts/scripts/cibraxtoken-deploy.js. You can do node cibraxtoken-deploy.js directly to deploy them in the local emulator. Take note of the addresses as you will need it later in the Dapp.
2. Create an .env file for the Next.js Dapp under the root directory dapp. That file should contain the following entries,


ETH_NODE_URL=<URL of the ETH Emulator> (e.g http://127.0.0.1:8545/)
ETH_FAUCET_ADDRESS=<Address of the Faucet contract deployed in step #1>
ETH_PRIVATE_KEY=<Private key used to deploy the Faucet contract> (If you are using Hardhat, that's the first address in the list)

Client Ids/Secrets for the NextAuth.js providers. See [here](https://next-auth.js.org/getting-started/introduction) for more information about how to configure those.

3. Run the Dapp with npm run dev