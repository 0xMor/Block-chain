import { ethers } from "hardhat";

async function main() {
    const diplomaNFT = await ethers.deployContract("DiplomaNFT");

    await diplomaNFT.waitForDeployment();

    console.log("DiplomaNFT deployed to:", await diplomaNFT.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
