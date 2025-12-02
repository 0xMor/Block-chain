import { ethers } from "hardhat";

async function main() {
    // --- PEGA AQUÍ LA DIRECCIÓN DE TU CONTRATO NFT ---
    const nftAddress = "0x96231FeD4EE2b0458d98F7aaaDB8759E24415241";
    // -------------------------------------------------

    const [owner] = await ethers.getSigners();
    console.log("🎨 Minteando NFT para:", owner.address);

    // Conectamos con el contrato
    const diplomaNFT = await ethers.getContractAt("DiplomaNFT", nftAddress);

    // ¡ACUÑAMOS EL NFT! (Mint)
    // Esto crea el Token ID #0 (o #1) y te lo envía a tu cartera
    const tx = await diplomaNFT.safeMint(owner.address);

    console.log("⏳ Esperando confirmación de la red...");
    await tx.wait();

    console.log("✅ ¡DIPLOMA ACUÑADO! Ya es tuyo.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});