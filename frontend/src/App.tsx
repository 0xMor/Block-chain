import { useState, useEffect } from 'react'
import { ethers } from 'ethers'
import CoinArtifact from './CoinABI.json'
import './index.css'

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
const OWNER_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266"
const LOCAL_RPC_URL = "http://127.0.0.1:8545"

function App() {
  const [ownerBalance, setOwnerBalance] = useState<string>('')
  const [userAddress, setUserAddress] = useState<string>('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(LOCAL_RPC_URL)
        const contract = new ethers.Contract(CONTRACT_ADDRESS, CoinArtifact.abi, provider)

        const balance = await contract.balanceOf(OWNER_ADDRESS)
        setOwnerBalance(ethers.formatUnits(balance, 18))
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }

    fetchData()
  }, [])

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        const signer = await provider.getSigner()
        setUserAddress(await signer.getAddress())
      } catch (error) {
        console.error("Error connecting wallet:", error)
      }
    } else {
      alert("MetaMask not found!")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <div className="bg-gray-800/50 backdrop-blur-lg p-10 rounded-2xl shadow-2xl max-w-lg w-full space-y-8 border border-gray-700">
        <h1 className="text-5xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-lg">
          Banco NiniCoin
        </h1>

        <div className="space-y-6">
          <div className="bg-gray-700/50 p-6 rounded-xl border border-gray-600 hover:border-yellow-500/50 transition duration-300">
            <p className="text-gray-400 text-sm uppercase tracking-wider mb-2">Saldo del Dueño</p>
            <p className="text-3xl font-bold text-green-400 font-mono">
              {ownerBalance ? `${parseFloat(ownerBalance).toLocaleString()} Ninka` : "Cargando..."}
            </p>
            <p className="text-xs text-gray-500 mt-2 break-all">{OWNER_ADDRESS}</p>
          </div>
        </div>

        <button
          onClick={connectWallet}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition duration-300 transform hover:scale-[1.02] shadow-lg flex items-center justify-center gap-3"
        >
          {userAddress ? (
            <>
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span>Conectado: {userAddress.slice(0, 6)}...{userAddress.slice(-4)}</span>
            </>
          ) : (
            <span>Conectar Wallet</span>
          )}
        </button>
      </div>
    </div>
  )
}

export default App
