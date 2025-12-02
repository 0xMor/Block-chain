import { ethers } from "hardhat";

async function main() {
    // --- CONFIGURACIÓN ---
    // Pegamos aquí la dirección de tu TIENDA (Crowdsale) que acabas de desplegar
    const crowdsaleAddress = "0xC75778FD4643F304ba6CF5523bAC0676F9E10268";
    // ---------------------

    console.log("🕵️‍♂️ Iniciando operación de extracción...");

    // 1. Conectamos con tu cuenta (El Jefe)
    const [owner] = await ethers.getSigners();
    console.log("🔑 Usando la cuenta del jefe:", owner.address);

    // 2. Conectamos con el contrato
    // (Usamos una interfaz mínima porque solo queremos llamar a withdraw)
    const crowdsale = await ethers.getContractAt("Crowdsale", crowdsaleAddress);

    // 3. Miramos cuánto dinero hay antes del robo
    const balance = await ethers.provider.getBalance(crowdsaleAddress);
    console.log(`💰 La tienda tiene: ${ethers.formatEther(balance)} ETH`);

    if (balance === 0n) {
        console.log("⚠️ La tienda está vacía. ¡Compra algo primero desde la web!");
        return;
    }

    // 4. ¡EJECUTAMOS LA ORDEN!
    console.log("🚀 Llamando a la función withdraw()...");
    const tx = await crowdsale.withdraw();

    console.log("⏳ Esperando confirmación de la red...");
    await tx.wait();

    console.log("✅ ¡EXTRACCIÓN COMPLETADA! El dinero vuelve a casa.");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});