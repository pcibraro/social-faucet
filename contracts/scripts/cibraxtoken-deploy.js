// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const initialSupply = 1000000;
  const faucetSupply = 500000;

  const Auth0Token = await hre.ethers.getContractFactory("Auth0Token");
  const auth0Token = await Auth0Token.deploy(initialSupply);

  await auth0Token.deployed();

  console.log(`Auth0Token deployed to ${auth0Token.address} with initial supply equal to ${initialSupply}`);

  const Faucet = await hre.ethers.getContractFactory("Faucet");
  const faucet = await Faucet.deploy(auth0Token.address);

  await faucet.deployed();

  console.log(`Faucet deployed to ${faucet.address}`);

  await auth0Token.approve(faucet.address, faucetSupply);

  console.log(`Faucet assigned with ${faucetSupply} tokens`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
