// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileRegistry {
    struct FileRecord {
        string fileHash;
        address uploader;
        uint256 timestamp;
    }

    mapping(string => FileRecord) public files;

    event FileUploaded(string fileHash, address uploader, uint256 timestamp);

    function uploadFile(string memory _fileHash) public {
        require(bytes(files[_fileHash].fileHash).length == 0, "File already uploaded.");
        files[_fileHash] = FileRecord(_fileHash, msg.sender, block.timestamp);
        emit FileUploaded(_fileHash, msg.sender, block.timestamp);
    }

    function verifyFile(string memory _fileHash) public view returns (bool exists, address uploader, uint256 timestamp) {
        if(bytes(files[_fileHash].fileHash).length > 0) {
            FileRecord memory record = files[_fileHash];
            return (true, record.uploader, record.timestamp);
        }
        return (false, address(0), 0);
    }
}
