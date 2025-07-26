// Contract configuration
const CONTRACT_ADDRESS = "0x11af6ba27ab2dea8c738eadd67aa3ddf1905f409";

// Load ABI (make sure fileABI.json is in the same directory)
let fileABI;
fetch('./fileABI.json')
    .then(response => response.json())
    .then(abi => {
        fileABI = abi;
    })
    .catch(error => {
        console.error("Error loading ABI:", error);
        document.getElementById('statusMessage').textContent = "Error loading contract ABI";
        document.getElementById('statusMessage').className = "error";
    });

let contract;
let signer;

async function connectBlockchain() {
    if (typeof window.ethereum !== 'undefined') {
        try {
            // Request account access
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            
            // Create provider and signer
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();
            
            // Create contract instance
            contract = new ethers.Contract(CONTRACT_ADDRESS, fileABI, signer);
            
            return true;
        } catch (error) {
            console.error("Connection error:", error);
            updateStatus("Failed to connect to blockchain", "error");
            return false;
        }
    } else {
        updateStatus("Please install MetaMask!", "error");
        return false;
    }
}

async function hashFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = async (event) => {
            try {
                const buffer = event.target.result;
                const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
                resolve(hashHex);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = (error) => reject(error);
        reader.readAsArrayBuffer(file);
    });
}

function updateStatus(message, type = "") {
    const statusElement = document.getElementById('statusMessage');
    statusElement.textContent = message;
    statusElement.className = type;
}

// Event listeners
document.getElementById('uploadBtn').addEventListener('click', async () => {
    const file = document.getElementById('fileInput').files[0];
    if (!file) {
        updateStatus("Please select a file first", "error");
        return;
    }

    updateStatus("Processing file...");
    
    try {
        // Connect to blockchain if not already connected
        if (!contract) {
            const connected = await connectBlockchain();
            if (!connected) return;
        }

        // Calculate file hash
        const fileHash = await hashFile(file);
        updateStatus("Uploading file hash to blockchain...");

        // Call smart contract function
        const tx = await contract.uploadFile(fileHash);
        updateStatus("Transaction sent. Waiting for confirmation...");

        // Wait for transaction confirmation
        await tx.wait();
        updateStatus("File hash successfully uploaded to blockchain!", "success");

    } catch (error) {
        console.error("Upload error:", error);
        updateStatus("Upload failed: " + (error.message || "Unknown error"), "error");
    }
});

document.getElementById('verifyBtn').addEventListener('click', async () => {
    const file = document.getElementById('fileInput').files[0];
    if (!file) {
        updateStatus("Please select a file first", "error");
        return;
    }

    updateStatus("Processing file...");
    
    try {
        // Connect to blockchain if not already connected
        if (!contract) {
            const connected = await connectBlockchain();
            if (!connected) return;
        }

        // Calculate file hash
        const fileHash = await hashFile(file);
        updateStatus("Verifying file on blockchain...");

        // Call smart contract function
        const result = await contract.verifyFile(fileHash);
        
        if (result.exists) {
            updateStatus(`File is VERIFIED. Uploaded by: ${result.uploader}`, "success");
        } else {
            updateStatus("File NOT found in blockchain records", "error");
        }

    } catch (error) {
        console.error("Verification error:", error);
        updateStatus("Verification failed: " + (error.message || "Unknown error"), "error");
    }
});