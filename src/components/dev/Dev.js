// To fix:
// 1. Button text overflows out of button and is clickable


// Admin page:
// 1. Import admin settings from json, then create backup copy, then edit json to modify site
// 2. Detailed settings for individual pages such as website.com/avatar are modified at website.com/admin/avatar
//    Then, gate all /admin pages behind admin login







//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';
import { FormatTypes, Interface } from "@ethersproject/abi";

import './dev.css';
import devbuttonImage from '../../image//button_4x1.png'

import { connectWallet } from '../../scripts/SmartContractOperator';

const { ethers } = require("ethers");
const { utils } = require('ethers').utils;
//const { BigNumber } = require('ethers').BigNumber;







//--------------------------------------------------------------------------------------------------
//# Variable Declaration

// *Update project_name with the name of your project
const project_name = 'nofunzone';

let runOnLoad = false;
let update_wallet_buttons = false;

const default_network = 'Goerli';
let network = default_network;

// *Update the contract address list based on your smart contract
let contractAddressList = {'Mainnet': '',
                           'Goerli': '0xE914eCA2a17f7d402a5095fF44c92ECCCD26F912',
                           'Hyperspace': '0xB4fECac2F5BdEc2eD15547cF857464c8691b9849'}
let contractAddress = contractAddressList[network];

// *Update JSON ABI list with your smart contract's latest JSON ABI
let jsonAbiList = {'Mainnet': `[]`,
                   'Goerli': `[
                    
                    {
                      "inputs": [],
                      "stateMutability": "nonpayable",
                      "type": "constructor"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "ApprovalForAll",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "values",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "TransferBatch",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ],
                      "name": "TransferSingle",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "string",
                          "name": "value",
                          "type": "string"
                        },
                        {
                          "indexed": true,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "URI",
                      "type": "event"
                    },
                    {
                      "inputs": [],
                      "name": "INTERFACE_ID_ERC1155",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint8",
                          "name": "",
                          "type": "uint8"
                        }
                      ],
                      "name": "attributes",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "balanceOf",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address[]",
                          "name": "accounts",
                          "type": "address[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "balanceOfBatch",
                      "outputs": [
                        {
                          "internalType": "uint256[]",
                          "name": "",
                          "type": "uint256[]"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        },
                        {
                          "internalType": "string",
                          "name": "newImageURI",
                          "type": "string"
                        }
                      ],
                      "name": "changeImageURI",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
                        }
                      ],
                      "name": "characters",
                      "outputs": [
                        {
                          "internalType": "uint8",
                          "name": "element",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint8",
                          "name": "",
                          "type": "uint8"
                        }
                      ],
                      "name": "elements",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        }
                      ],
                      "name": "gainEXP",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        }
                      ],
                      "name": "gainUserEXP",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint8",
                          "name": "num",
                          "type": "uint8"
                        }
                      ],
                      "name": "getAttribute",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        }
                      ],
                      "name": "getCurrentLevel",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "currentLevel",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        }
                      ],
                      "name": "getCurrentStats",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "currentLevel",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint16",
                          "name": "fire",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "water",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "air",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "earth",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "charisma",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "creativity",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "cunning",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "patience",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint8",
                          "name": "num",
                          "type": "uint8"
                        }
                      ],
                      "name": "getElement",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        }
                      ],
                      "name": "getMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        }
                      ],
                      "name": "getPrimaryStats",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "element",
                          "type": "string"
                        },
                        {
                          "internalType": "uint16",
                          "name": "level",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserCurrentStats",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "currentLevel",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint16",
                          "name": "fire",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "water",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "air",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "earth",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "charisma",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "creativity",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "cunning",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint16",
                          "name": "patience",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "metadataUri",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserPrimaryStats",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "element",
                          "type": "string"
                        },
                        {
                          "internalType": "uint16",
                          "name": "level",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserTokenID",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "largestTokenId",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        }
                      ],
                      "name": "isApprovedForAll",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "name": "levelUp",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint8",
                          "name": "element",
                          "type": "uint8"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "name": "mint",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [],
                      "name": "nftCounter",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "_value",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "amounts",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeBatchTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "setApprovalForAll",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        },
                        {
                          "internalType": "string",
                          "name": "_metadata",
                          "type": "string"
                        }
                      ],
                      "name": "setMetadata",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "bytes4",
                          "name": "interfaceId",
                          "type": "bytes4"
                        }
                      ],
                      "name": "supportsInterface",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
                        }
                      ],
                      "name": "tokenMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "tokenOwners",
                      "outputs": [
                        {
                          "internalType": "uint16",
                          "name": "",
                          "type": "uint16"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint16",
                          "name": "tokenID",
                          "type": "uint16"
                        },
                        {
                          "internalType": "uint8",
                          "name": "element",
                          "type": "uint8"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "name": "updateCharacter",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "uri",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    }
                   
                   ]`,
                   'Hyperspace': `[
                    {
                      "inputs": [],
                      "stateMutability": "nonpayable",
                      "type": "constructor"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "ApprovalForAll",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256[]",
                          "name": "values",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "TransferBatch",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "indexed": true,
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "indexed": false,
                          "internalType": "uint256",
                          "name": "value",
                          "type": "uint256"
                        }
                      ],
                      "name": "TransferSingle",
                      "type": "event"
                    },
                    {
                      "anonymous": false,
                      "inputs": [
                        {
                          "indexed": false,
                          "internalType": "string",
                          "name": "value",
                          "type": "string"
                        },
                        {
                          "indexed": true,
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "URI",
                      "type": "event"
                    },
                    {
                      "inputs": [],
                      "name": "INTERFACE_ID_ERC1155",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        }
                      ],
                      "name": "balanceOf",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address[]",
                          "name": "accounts",
                          "type": "address[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        }
                      ],
                      "name": "balanceOfBatch",
                      "outputs": [
                        {
                          "internalType": "uint256[]",
                          "name": "",
                          "type": "uint256[]"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "newImageURI",
                          "type": "string"
                        }
                      ],
                      "name": "changeImageURI",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "characters",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_token_ID",
                          "type": "uint256"
                        }
                      ],
                      "name": "getMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_token_ID",
                          "type": "uint256"
                        }
                      ],
                      "name": "getStats",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "metadataURI",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUserStats",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        }
                      ],
                      "name": "getUsertoken_ID",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "largesttoken_ID",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "account",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        }
                      ],
                      "name": "isApprovedForAll",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_id",
                          "type": "uint256"
                        }
                      ],
                      "name": "isNonFungible",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "pure",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "_userAddress",
                          "type": "address"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "name": "levelUp",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "imageURI",
                          "type": "string"
                        }
                      ],
                      "name": "mint",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [],
                      "name": "nftCounter",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "_value",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "max",
                          "type": "uint256"
                        }
                      ],
                      "name": "random",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "randomInt",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "ids",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "uint256[]",
                          "name": "amounts",
                          "type": "uint256[]"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeBatchTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "from",
                          "type": "address"
                        },
                        {
                          "internalType": "address",
                          "name": "to",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "amount",
                          "type": "uint256"
                        },
                        {
                          "internalType": "bytes",
                          "name": "data",
                          "type": "bytes"
                        }
                      ],
                      "name": "safeTransferFrom",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "operator",
                          "type": "address"
                        },
                        {
                          "internalType": "bool",
                          "name": "approved",
                          "type": "bool"
                        }
                      ],
                      "name": "setApprovalForAll",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "_token_ID",
                          "type": "uint256"
                        },
                        {
                          "internalType": "string",
                          "name": "_metadata",
                          "type": "string"
                        }
                      ],
                      "name": "setMetadata",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "bytes4",
                          "name": "interfaceId",
                          "type": "bytes4"
                        }
                      ],
                      "name": "supportsInterface",
                      "outputs": [
                        {
                          "internalType": "bool",
                          "name": "",
                          "type": "bool"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "tokenMetadata",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "address",
                          "name": "",
                          "type": "address"
                        },
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "tokenOwners",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "id",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "level",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "exp",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "creativity",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "cunning",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "charisma",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "patience",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "fire",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "water",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "air",
                          "type": "uint256"
                        },
                        {
                          "internalType": "uint256",
                          "name": "earth",
                          "type": "uint256"
                        }
                      ],
                      "name": "updateCharacter",
                      "outputs": [],
                      "stateMutability": "nonpayable",
                      "type": "function"
                    },
                    {
                      "inputs": [
                        {
                          "internalType": "uint256",
                          "name": "",
                          "type": "uint256"
                        }
                      ],
                      "name": "URI",
                      "outputs": [
                        {
                          "internalType": "string",
                          "name": "",
                          "type": "string"
                        }
                      ],
                      "stateMutability": "view",
                      "type": "function"
                    }
                  ]`};

const jsonAbi = jsonAbiList[network];

const openSeaLinkDelay = 8;
var openSeaPrefixes = {
  Mainnet: 'https://opensea.io/assets/ethereum/',
  Goerli: 'https://testnets.opensea.io/assets/goerli/', 
  Hyperspace: ''
}
let openSeaPrefix = openSeaPrefixes[network];

let balance, signer, provider;

let user_token_ID, user_metadata_URI;
let user_avatar_URI, user_avatar, user_icon_URI, user_icon, user_minted_NFT;

const iface = new Interface(jsonAbi);
iface.format(FormatTypes.full);

const IPFS_prefixes = {
  Pinata: 'https://gateway.pinata.cloud/IPFS/',
  Infura: '',
  Filecoin: 'https://IPFS.io/IPFS/'
}
const network_IPFS_dict = {'Mainnet': 'Pinata',
                           'Goerli': 'Pinata',
                           'Hyperspace': 'Filecoin'};
var network_default_IPFS = network_IPFS_dict[network];
var IPFS_prefix = IPFS_prefixes[network_default_IPFS];

var image_URIs, base_image_URI;
var base_image_URI = '';

// *Update the IPFS URIs based on your file storage
if (network_default_IPFS === 'Filecoin') {
  image_URIs = {'Fire': {1:'https://IPFS.io/IPFS/bafybeid2oy2tbsig674eh7n4kp4gqribvpr6ajodxokfhyzftl3il7troy/LMNTLfire1.png', 
                               2:'https://IPFS.io/IPFS/bafybeiaejbgk6zlz43r4fgubbxv5m3nveb23wt2mtywwqhaoj627vpf7xi/LMNTLfire2.png'},
                      'Water': {1:'https://IPFS.io/IPFS/bafybeihrxhmnywfxxv6jfe2adfbe22m4r56dfkpgksdn2fdbkdardxcjhu/LMNTLwater1.png',
                                2:'https://IPFS.io/IPFS/bafybeidmkzry7ycmrii5iaibbycocptpbm5x6xo7m5y3yvln3qzdw53xwi/LMNTLwater2.png'},
                      'Air':{1:'https://IPFS.io/IPFS/bafybeifxei46fbqxdcriqls6bb4bkvehqhs7ibbsx62mena3fisf73tk3a/LMNTLair1.png',
                             2:'https://IPFS.io/IPFS/bafybeihp5xj3ynypjsl2si2ve47bs4uydm6tvyxvljnbllyrobxom67hxa/LMNTLair2.png'},
                      'Earth': {1:'https://IPFS.io/IPFS/bafybeibh7cukho5d2i7gjtuophcw455wnzk5rvy5cp7dwva74izhwst46a/LMNTLearth1.png',
                                2:'https://IPFS.io/IPFS/bafybeicnog62bhxyinwq6f43pkalkr26ahcj3fjpl3nizg5deaaz7cruxm/LMNTLearth2.png'}}
} else if (network_default_IPFS === 'Pinata') {
  base_image_URI = 'QmPF4nrDbTnGk2UWduZDw2FCHZcF6HJicYDdsDAkEqJgH7';
  image_URIs = {'Fire': {1:'/LMNTLfire1.png', 
                         2:'/LMNTLfire2.png'},
                'Water': {1:'/LMNTLwater1.png',
                          2:'/LMNTLwater2.png'},
                'Air':{1:'/LMNTLair1.png',
                       2:'/LMNTLair2.png'},
                'Earth': {1:'/LMNTLearth1.png',
                          2:'/LMNTLearth2.png'}}
}






//--------------------------------------------------------------------------------------------------
//# Basic Functions

const Dev = () => {

const [isConnected, toggleConnected] = useState(0);
const [isMinted, toggleMinted] = useState(0);

let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function pause(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}



//--------------------------------------------------------------------------------------------------
//# Wallet & Metadata Functions

if (runOnLoad) {
  onLoad();
};
async function onLoad () {
  if (runOnLoad) {
    runOnLoad = false;
    await connectWallet();
    await updateUserStats();
  }
}


/*async function connectWallet() {
  provider = await setProvider();
  signer = await setSigner(provider);
  address = await setUserAddress(signer);
  balance = await setUserBalance(signer);
  var contract = contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  user_token_ID = await setUserTokenID(contract);
  user_metadata = await setUserMetadata(contract);
  if (provider && signer && balance && address != null) {  toggleConnected ( !isConnected ); }
};*/




//--------------------------------------------------------------------------------------------------
//# Wallet UI Functions

let last_button_clicked;

let mint_button_active = true;

async function handleConnectClick(event) {
  last_button_clicked = document.getElementById(event.target.id);
  if (!isConnected) {
    const wallet_info = await connectWallet();
    user_address = wallet_info.address;
    user_metadata = wallet_info.metadata;
    setAddress_Context(user_address);
    setMetadata_Context(user_metadata);
  }
  //await updateWalletUI();
}

async function handleMintClick(event) {
  if (!isConnected) {
    connectWallet()
  } else if (!user_minted_NFT) {
    var mint_params = [];
    console.log('Last Button Clicked ID: ', event.target.id);
    last_button_clicked = document.getElementById(event.target.id);
    //mint_params = await generateMintParams(project_name);
    //await mintNFT(last_button_clicked, mint_params);
    await updateWalletButton(last_button_clicked);
  } else {
    window.location.href = window.location['origin'] + '/avatar';
  }
};

async function updateWalletUI(button_list=[]) {
  console.log(button_list);

  if (button_list.length === 1) {
    updateWalletButton(button_list[0]);
  } if (button_list.length === 2) {
    updateWalletButton(button_list[1]);
  } if (button_list.length === 3) {
    updateWalletButton(button_list[2]);
  } if (button_list.length === 4) {
    updateWalletButton(button_list[3]);
  } if (button_list.length === 5) {
    updateWalletButton(button_list[4]);
  }
}

async function updateWalletButton(wallet_button_text_element) {
  const button_ID = wallet_button_text_element.id;
  if (isConnected) {
    if (button_ID.includes('connect2opensea')) {
      wallet_button_text_element.textContent = 'View on OpenSea';
      //openSeaLink.href = openSeaPrefix + contractAddress + '/' + user_stats['ID'].toString();
      //openSeaLink.target = '_blank';
    } else if (button_ID.includes('mint2opensea')) {
      if (user_minted_NFT) {
        wallet_button_text_element.textContent = 'View on OpenSea';
      } else {
        wallet_button_text_element.textContent = 'Mint NFT';
      };
      //openSeaLink.href = openSeaPrefix + contractAddress + '/' + user_stats['ID'].toString();
      //openSeaLink.target = '_blank';
    } else if (button_ID.includes('connect2icon')) {
      console.log('set icon');
    } else {
      wallet_button_text_element.textContent = 'Wallet Connected';
    }
  } else {
    wallet_button_text_element.textContent = 'Connect Wallet';
  }
  return isConnected;
}






//--------------------------------------------------------------------------------------------------
//# Smart Contract Functions


  
  
//--------------------------------------------------------------------------------------------------
//# Optional Dev Page Functions for Testing




//--------------------------------------------------------------------------------------------------
//# Custom Smart Contract Calls
// *Update this section with your smart contract's custom function calls

let user_stats, user_stats_list, evolveButtonActive, user_primary_stats, element_choice;

async function updateUserStats() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  if (user_address) {
    user_token_ID = await contract.getUserTokenID(user_address);
    user_primary_stats = await contract.getUserPrimaryStats(user_address);
    user_stats_list = await contract.getUserCurrentStats(user_address);
    
    user_stats['ID'] = parseInt(user_token_ID, 10);
    user_stats['Element'] = capitalize(user_primary_stats[0]);
    user_stats['Level'] = parseInt(user_stats_list[0], 10);
    user_stats['EXP'] = parseInt(user_stats_list[1], 10);
    user_stats['Image URI'] = user_primary_stats[3];
    user_stats['Fire'] = parseInt(user_stats_list[2], 10);
    user_stats['Water'] = parseInt(user_stats_list[3], 10);
    user_stats['Air'] = parseInt(user_stats_list[4], 10);
    user_stats['Earth'] = parseInt(user_stats_list[5], 10);
    user_stats['Charisma'] = parseInt(user_stats_list[6], 10);
    user_stats['Creativity'] = parseInt(user_stats_list[7], 10);
    user_stats['Cunning'] = parseInt(user_stats_list[8], 10);
    user_stats['Patience'] = parseInt(user_stats_list[9], 10);

    console.log('User Stats: ', user_stats);
    return user_stats;
  }
}


function handleLevelUpClick() {
  if (evolveButtonActive) {
    if (!isConnected) {connectWallet()}
      else {levelUp();
    }
  } else {
    window.location.href = window.location['origin'] + '/avatar';
  }
}


async function levelUp() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, signer);
  const previous_user_exp = user_stats['EXP'];
  const evolveButton = document.getElementById('moduleTestEvolveButtonText');

  user_primary_stats = await contract.getUserPrimaryStats(user_address);
  user_stats['Level'] = user_primary_stats[1];
  console.log('User Primary Stats: ', user_primary_stats);
  
  var imageURI = image_URIs[user_stats['Element']][(user_stats['Level'] % 2) + 1];
  console.log('New Image URI: ', imageURI);

  const transactionInfo = await contract.levelUp(user_address, imageURI);

  console.log("Transaction info: ", transactionInfo);
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);
  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);
  evolveButton.textContent = "Evolving";
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      evolveButton.textContent = "Evolving";
      loop_count = 0;
    } else {
      evolveButton.insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }

  evolveButtonActive = false;

  console.log("Mined transaction receipt: ", transactionReceipt);
  console.log("Transaction Info: ", transactionInfo);
  while (previous_user_exp === user_stats['EXP']) {
    user_stats = await updateUserStats();
    pause(500);
  }
  evolveButton.textContent = "View LMNTL!";
  evolveButton.href = window.location['origin'] + '/avatar';
  //user_metadata = await setUserMetadata();
  console.log("User Metadata: ", user_metadata);
  //user_avatar = await setAvatarURI(user_metadata);
  //updateWalletUI();
}

return (
  <div className='dev'>
    <div className='devcontainer'>
      <div className='devmultiButtonContainer'>
        <div className='devbuttonContainer'>
          <div className='devbutton' id='devbutton1' onClick={handleConnectClick}>
            <img className='devbuttonImage' id='devbuttonImage1' src={devbuttonImage} alt='Connect Wallet' />
            <div id="devbuttonText1" className='devbuttonText'>{(user_address) ? 'Wallet Connected' : 'Connect Wallet'}</div>
          </div>
        </div>
        <div className='devbuttonContainer'>
          <div className='devbutton' id='devbutton2' onClick={handleMintClick}>
            <a href='#' id="openSeaLink" className='devlink' rel="noreferrer">
              <img className='devbuttonImage' id='devbuttonImage2' src={devbuttonImage} alt='Mint NFT' />
              <div id="mint2opensea" className='devbuttonText'>{(user_address) ? 'Mint NFT' : 'Connect Wallet'}</div>
            </a>
          </div>
        </div>
        <div className='devbuttonContainer'>
          <div className='devbutton' id='devbutton3' onClick={handleMintClick}>
            <a href='#' id="avatarButtonLink" className='devlink' rel="noreferrer">
              <img className='devbuttonImage' id='devbuttonImage3' src={devbuttonImage} alt='Mint NFT' />
              <div id="devbuttonText3" className='devbuttonText'>{(user_address) ? 'Mint NFT' : 'Connect Wallet'}</div>
            </a>
          </div>
        </div>
        <div className='devbuttonContainer'>
          <div className='devbutton' id='devbutton4' onClick={handleLevelUpClick}>
            <a href='#' id="devlink4" className='devlink' rel="noreferrer">
              <img className='devbuttonImage' id='devbuttonImage4' src={devbuttonImage} alt='Level Up' />
              <div id="devbuttonText4" className='devbuttonText'>{(user_address) ? 'Level Up' : 'Connect Wallet'}</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}



export default Dev
