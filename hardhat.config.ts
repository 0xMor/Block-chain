import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    hardhat: {},
    sepolia: {
      url: "https://sepolia.drpc.org",
      // ¡AQUÍ ES DONDE BORRAS TU CLAVE REAL!
      accounts: ["0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"]
    }
  },
  etherscan: {
    // ¡AQUÍ BORRAS LA API KEY REAL!
    apiKey: "TU_API_KEY_ETHERSCAN"
  }
};

export default config;