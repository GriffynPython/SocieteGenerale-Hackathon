Blockchain File Verification System
📌 Overview

This project provides a web-based interface for uploading file hashes to a blockchain and verifying their authenticity. It uses Ethereum smart contracts to store and verify file hashes, ensuring tamper-proof document verification.
🌟 Features

    File Hashing: Automatically computes SHA-256 hashes of uploaded files

    Blockchain Storage: Stores file hashes on the Ethereum blockchain

    Verification: Checks if files exist in the blockchain records

    User-Friendly Interface: Clean, intuitive UI with status feedback

    MetaMask Integration: Secure blockchain transactions via MetaMask

🛠️ Technology Stack

    Frontend: HTML5, CSS3, JavaScript (ES6+)

    Blockchain: Ethereum, Ethers.js library

    Cryptography: Web Crypto API for SHA-256 hashing
🚀 Getting Started
Prerequisites

    Modern web browser (Chrome, Firefox, Edge)

    MetaMask extension installed

    Ethereum testnet ETH (for testing)

Installation

    Clone the repository:
    bash

git clone https://github.com/yourusername/blockchain-file-verification.git
cd blockchain-file-verification

Install a local web server (if needed):

    Python:
    bash

python -m http.server 8000

Node.js:
bash

    npx serve

Open the application in your browser:
text

    http://localhost:8000/public

🖥️ Usage

    Connect MetaMask when prompted

    Select a file using the file picker

    Choose an action:

        Upload to Blockchain: Stores the file's hash on-chain

        Verify File: Checks if the file exists in blockchain records

🔧 Smart Contract Details

The system uses a simple smart contract with two main functions:
solidity

// Stores a file hash
function uploadFile(string memory fileHash) public;

// Verifies a file hash
function verifyFile(string memory fileHash) public view returns (bool exists, address uploader);

🌐 Live Demo

A demo version is available at: [demo-url-here] (link your hosted version if available)
📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
🤝 Contributing

    Fork the project

    Create your feature branch (git checkout -b feature/AmazingFeature)

    Commit your changes (git commit -m 'Add some AmazingFeature')

    Push to the branch (git push origin feature/AmazingFeature)

    Open a Pull Request
