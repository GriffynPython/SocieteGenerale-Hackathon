# SocieteGenerale-Hackathon
Blockchain File Verification System 📌
Blockchain File Verification Ethereum Web3

A web-based interface for tamper-proof document verification using Ethereum blockchain.

🌟 Key Features
🔒 File Hashing - Automatically computes SHA-256 hashes of uploaded files
⛓ Blockchain Storage - Stores file hashes permanently on Ethereum blockchain
✔️ Verification System - Checks file authenticity against blockchain records
💎 MetaMask Integration - Secure transactions via popular Ethereum wallet
🎨 User-Friendly UI - Clean, intuitive interface with real-time feedback
🛠 Technology Stack
Category	Technologies
Frontend	HTML5, CSS3, JavaScript (ES6+)
Blockchain	Ethereum, Ethers.js
Cryptography	Web Crypto API (SHA-256)
🚀 Quick Start
Prerequisites
Modern browser (Chrome/Firefox/Edge)
MetaMask extension installed
Testnet ETH (for testing)
Installation
git clone https://github.com/yourusername/blockchain-file-verification.git
cd blockchain-file-verification

Start local server:
bash

# Python
python -m http.server 8000

# Node.js alternative
npx serve

Access application at:
http://localhost:8000/public
🖥 How to Use

    Connect your MetaMask wallet

    Select a file using the file picker

    Choose action:

        Upload to Blockchain → Stores file hash permanently

        Verify File → Checks against existing blockchain records

🔍 Smart Contract Details
solidity

// Stores a file hash 
function uploadFile(string memory fileHash) public;

// Verifies a file hash 
function verifyFile(string memory fileHash) 
    public view returns (bool exists, address uploader);
