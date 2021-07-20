// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";

interface ERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function name() view external returns (string memory);
    event Transfer(address indexed from, address indexed to, uint256 value);
}

contract Faucet is Ownable {
    uint256 constant public waitTime = 30 minutes;

    ERC20 public tokenInstance;
    
    mapping(address => uint256) lastAccessTime;

    constructor(address _tokenInstance) Ownable() {
        require(_tokenInstance != address(0));

        tokenInstance = ERC20(_tokenInstance);
    }

    function requestTokens(address _receiver, uint256 tokenAmount) onlyOwner public {
        require(allowedToWithdraw(_receiver, tokenAmount));
        tokenInstance.transfer(_receiver, tokenAmount);
        lastAccessTime[_receiver] = block.timestamp + waitTime;
    }

    function allowedToWithdraw(address _address, uint256 tokenAmount) public view returns (bool) {
        if(tokenAmount > 3) {
            return false;
        }
        
        if(lastAccessTime[_address] == 0) {
            return true;
        } else if(block.timestamp >= lastAccessTime[_address]) {
            return true;
        }

        return false;
    }

    function tokenName() public view returns (string memory) {
        return tokenInstance.name();
    }
}