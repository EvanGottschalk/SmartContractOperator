import React, { useState } from 'react'

import { FormatTypes, Interface } from "@ethersproject/abi";

import logo from '../../image/logo.png'

import './nfzfilgui.css'

const { ethers } = require("ethers");
const { utils } = require('ethers').utils;
const { BigNumber } = require('ethers').BigNumber;

let network = 'Goerli';


const openSeaLinkDelay = 8;

let address, signer, provider;
var mintButtonActive = true;

//E~ Update these variables manually according to the smart contract address of your NFT collection,
//   and the URI of the metadata to be minted as an NFT

//Recently Added

let contractName = 'LMNTL';

let contractAddressList = {'Mainnet': '',
                           'Goerli': '0xE914eCA2a17f7d402a5095fF44c92ECCCD26F912',
                           'Hyperspace': '0xB4fECac2F5BdEc2eD15547cF857464c8691b9849'}
let contractAddress = contractAddressList[network];

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
                          "name": "_tokenId",
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
                          "name": "_tokenId",
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
                      "name": "getUserTokenID",
                      "outputs": [
                        {
                          "internalType": "uint256",
                          "name": "largestTokenId",
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
                          "name": "_tokenId",
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
                  ]`}

const jsonAbi = jsonAbiList[network];


//Recently Added

var user_avatar = "";
var user_metadata = "";
var user_tokenID = "";
var user_primary_stats = [];
var user_stats = {'ID': 0,
                  'Level': 0,
                  'EXP': 0,
                  'Element': '',
                  'Fire': 0,
                  'Water': 0,
                  'Air': 0,
                  'Earth': 0,
                  'Charisma': 0,
                  'Creativity': 0,
                  'Cunning': 0,
                  'Patience': 0};
var user_stats_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const elements = {0: 'Fire',
                1: 'Water',
                2: 'Air',
                3: 'Earth'};

const ipfs_prefixes = {
  Pinata: 'https://gateway.pinata.cloud/ipfs/',
  Infura: '',
  Filecoin: 'https://ipfs.io/ipfs/'
}
const network_ipfs_dict = {'Mainnet': 'Pinata',
                           'Goerli': 'Pinata',
                           'Hyperspace': 'Filecoin'};
var network_default_ipfs = network_ipfs_dict[network]
var ipfs_prefix = ipfs_prefixes[network_default_ipfs];

var image_uris, base_image_uri;
var base_image_uri = '';
if (network_default_ipfs === 'Filecoin') {
  image_uris = {'Fire': {1:'https://ipfs.io/ipfs/bafybeid2oy2tbsig674eh7n4kp4gqribvpr6ajodxokfhyzftl3il7troy/LMNTLfire1.png', 
                               2:'https://ipfs.io/ipfs/bafybeiaejbgk6zlz43r4fgubbxv5m3nveb23wt2mtywwqhaoj627vpf7xi/LMNTLfire2.png'},
                      'Water': {1:'https://ipfs.io/ipfs/bafybeihrxhmnywfxxv6jfe2adfbe22m4r56dfkpgksdn2fdbkdardxcjhu/LMNTLwater1.png',
                                2:'https://ipfs.io/ipfs/bafybeidmkzry7ycmrii5iaibbycocptpbm5x6xo7m5y3yvln3qzdw53xwi/LMNTLwater2.png'},
                      'Air':{1:'https://ipfs.io/ipfs/bafybeifxei46fbqxdcriqls6bb4bkvehqhs7ibbsx62mena3fisf73tk3a/LMNTLair1.png',
                             2:'https://ipfs.io/ipfs/bafybeihp5xj3ynypjsl2si2ve47bs4uydm6tvyxvljnbllyrobxom67hxa/LMNTLair2.png'},
                      'Earth': {1:'https://ipfs.io/ipfs/bafybeibh7cukho5d2i7gjtuophcw455wnzk5rvy5cp7dwva74izhwst46a/LMNTLearth1.png',
                                2:'https://ipfs.io/ipfs/bafybeicnog62bhxyinwq6f43pkalkr26ahcj3fjpl3nizg5deaaz7cruxm/LMNTLearth2.png'}}
} else if (network_default_ipfs === 'Pinata') {
  base_image_uri = 'QmPF4nrDbTnGk2UWduZDw2FCHZcF6HJicYDdsDAkEqJgH7';
  image_uris = {'Fire': {1:'/LMNTLfire1.png', 
                         2:'/LMNTLfire2.png'},
                'Water': {1:'/LMNTLwater1.png',
                          2:'/LMNTLwater2.png'},
                'Air':{1:'/LMNTLair1.png',
                       2:'/LMNTLair2.png'},
                'Earth': {1:'/LMNTLearth1.png',
                          2:'/LMNTLearth2.png'}}
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const NFZFILGUI = () => {

const [isConnected, toggleConnected] = useState(0);
const [isMinted, toggleMinted] = useState(0);  

const iface = new Interface(jsonAbi);
iface.format(FormatTypes.full);


function pause(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function setAddress(ethaddy) {
    address = ethaddy;
    if (address != null) {  toggleConnected ( !isConnected ); }
    console.log("Account:", address);
    //alert("Connected: " + address);
}

function handleMintClick(event) {
  var element_choice = capitalize(event.target.textContent.split(" ")[1].toLowerCase());
  if (mintButtonActive) {
    if (!isConnected) {connectWallet()}
      else {mintNFT(element_choice);
    }
  }
}

async function connectWallet() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  signer = provider.getSigner();
  console.log(signer);
  setAddress( await signer.getAddress() );
  let balance = await signer.getBalance();
  console.log(await ethers.utils.formatEther(balance));
  user_metadata = await getUserMetadata();
  console.log('User Metadata: ', user_metadata);
  setAvatarURI(user_metadata);
  document.getElementById('userAvatar').src = user_avatar;
  user_stats = await getUserStats();
}


async function mintNFT(element) {
  const nftContract = new ethers.Contract(contractAddress, iface,signer);
  var transactionInfo;
  var imageURI = image_uris[element][1];
  setAvatarURI(imageURI);
  if (element === 'Fire') {
    transactionInfo = await nftContract.mint(0, user_avatar);
  } else if (element === 'Water') {
    transactionInfo = await nftContract.mint(1, user_avatar);
  } else if (element === 'Air') {
    transactionInfo = await nftContract.mint(2, user_avatar);
  } else if (element === 'Earth') {
    transactionInfo = await nftContract.mint(3, user_avatar);
  }  
  toggleMinted ( !isMinted );
  console.log("Transaction info: ", transactionInfo);
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);
  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);
  document.getElementById('mintButton').textContent = "MINTING"
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      document.getElementById('mintButton').textContent = "MINTING"
      loop_count = 0;
    } else {
      document.getElementById('mintButton').insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }
  console.log("Mined transaction receipt: ", transactionReceipt);
  var wait_count = 0;
  while ( wait_count < (2 * openSeaLinkDelay) ) {
    await pause(500);
    if (loop_count > 3) {
      document.getElementById('mintButton').textContent = "MINTING"
      loop_count = 0;
    } else {
      document.getElementById('mintButton').insertAdjacentText('beforeEnd', '.');
    }
    loop_count+=1;
    wait_count+=1;
  }
  document.getElementById('mintButton').textContent = "MINT SUCCESS!"
  const tokenID = parseInt(transactionReceipt.logs[0].topics[3], 10);
  console.log("Token ID: ", tokenID);
  console.log("Transaction Info: ", transactionInfo);

  user_metadata = await getUserMetadata();
  console.log("User Metadata: ", user_metadata);

  user_avatar = await setAvatarURI(user_metadata);
  document.getElementById('userAvatar').src = user_avatar;
  user_stats = await getUserStats();
}


// Recently Added
async function getUserMetadata() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  let userMetadata = await contract.getUserMetadata(address);
  return userMetadata;
}

async function getUserStats() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, provider);
  user_tokenID = await contract.getUserTokenID(address);
  user_primary_stats = await contract.getUserPrimaryStats(address);
  user_stats_list = await contract.getUserCurrentStats(address);
  
  user_stats['ID'] = parseInt(user_tokenID, 10);
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


  

  console.log('User Element: ', user_stats['Element']);

  console.log('User Stats: ', user_stats);
  return user_stats;
}


async function levelUp() {
  const contract = new ethers.Contract(contractAddress, jsonAbi, signer);
  const previous_user_exp = user_stats['EXP'];

  user_primary_stats = await contract.getUserPrimaryStats(address);
  user_stats['Level'] = user_primary_stats[1];
  console.log('User Primary Stats: ', user_primary_stats);
  
  var imageURI = image_uris[user_stats['Element']][(user_stats['Level'] % 2) + 1];
  console.log('New Image URI: ', imageURI);

  const transactionInfo = await contract.levelUp(address, imageURI);

  console.log("Transaction info: ", transactionInfo);
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);
  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);
  document.getElementById('mintButton').textContent = "LEVELING"
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      document.getElementById('mintButton').textContent = "LEVELING"
      loop_count = 0;
    } else {
      document.getElementById('mintButton').insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }


  console.log("Mined transaction receipt: ", transactionReceipt);
  document.getElementById('mintButton').textContent = "LEVEL UP!"
  console.log("Transaction Info: ", transactionInfo);
  while (previous_user_exp === user_stats['EXP']) {
    user_stats = await getUserStats();
    pause(500);
  }
  user_metadata = await getUserMetadata();
  console.log("User Metadata: ", user_metadata);
  user_avatar = await setAvatarURI(user_metadata);
  document.getElementById('userAvatar').src = user_avatar;
}

async function setAvatarURI(user_metadata) {
  if (user_metadata) {
    if ('https://' !== user_metadata.substr(0, 8)) {
      user_avatar = ipfs_prefix + base_image_uri + user_metadata;
    } else {
      user_avatar = user_metadata;
    };
  } else {
    user_avatar = 'some_default_image'
  }
  console.log('User Avatar: ', user_avatar);
  return(user_avatar);
}


return (
  <div className='nfzfilgui'>
    {/* <div className='navbarMobile'>
      <div className='navbarCenterIcon'>
        <div className='navbarMobileTopRight '>MobileLeftTitle</div>
      </div>
    </div>
    <div className='navbarMobileButton'>
      <MobileMenu className={Mobile ? 'Mobile' : 'Mobile'} onClick={HandleMobileMenu} />
      <div className={Mobile ? 'navbarMobileContainerActive' : 'navbarMobileContainer'}>
        <div className={Mobile ? 'navbarMenu active' : 'navbarMenu'}>
          <div className='navbarMenuContainer'>
            <div className='navbarMobileTop'>
              <div className='navbarMobileTopRight menuOpen'>MobileMenuText</div>
              <div className='navbarMobileTopLeft'>
                <Close className='CloseIcon' onClick={HandleMobileMenu} />
              </div>
            </div>
            <div className='navbarMobileMain'>
              <div className='navbarCenterLink opacity7'>MobileMenuMiddleText</div>
              <div className='navbarCenterLink navbarRightButton'>MobileMenuButton</div>
            </div>
          </div>
        </div>
      </div>
    </div>*/}
    <div>
      <div className='nfzfilguiLogo SlideRightAnimation'>
        <img src={logo} alt='' className='nfzfilguiBoxImage' />
      </div>
    </div>

    <div className='nfzfilguiContainer SlideRightAnimation'>
      {/*<div className='nfzfilguiLeft'>
        <img src={header1} alt='' className='navbarBoxImage' />
      </div>*/}
      <div className='nftfilguiCenter'>
        <div className='nfzfilguiBox'>
          <div className='nfzfilguiBoxTitle'>
            <span className='textHighlight'>Alchm</span>
          </div>
          <div className='nfzfilguiBoxSubTitle'>Astrology NFTs unique to you.<br></br>Own Your Alchemy.</div>

          <div id="nfzfilguiMintButton" className='nfzfilguiMintButton' onClick={getUserStats}>GET STATS</div>
          <div id="nfzfilguiMintButton" className='nfzfilguiMintButton' onClick={levelUp}>LEVEL UP</div>
          <div id="nfzfilguiMintButton" className='nfzfilguiMintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT FIRE' : 'CONNECT WALLET'}</div>
          <div id="nfzfilguiMintButton" className='nfzfilguiMintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT WATER' : 'CONNECT WALLET'}</div>
          <div id="nfzfilguiMintButton" className='nfzfilguiMintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT AIR' : 'CONNECT WALLET'}</div>
          <div id="nfzfilguiMintButton" className='nfzfilguiMintButton' onClick={handleMintClick}>{(isConnected) ? 'MINT EARTH' : 'CONNECT WALLET'}</div>
        </div>
      </div>
    </div>
    <img id="userAvatar" className="userAvatar" src="" alt="LMNTL"></img>
  </div>
)
}


export default NFZFILGUI
