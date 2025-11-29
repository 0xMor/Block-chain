import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const niniCoin = await ethers.deployContract("NiniCoin");

  await niniCoin.waitForDeployment();

  console.log("NiniCoin deployed to:", await niniCoin.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
