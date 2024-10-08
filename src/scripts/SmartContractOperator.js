// To add:
// 1. Default function for calling any contract that makes sure there will be no errors,
//    waits for any missing information, and has error handling.
//      -This will include confirming that providers._network is defined

// Admin page:
// 1. Import admin settings from json, then create backup copy, then edit json to modify site
// 2. Detailed settings for individual pages such as website.com/avatar are modified at website.com/admin/avatar
//    Then, gate all /admin pages behind admin login

// Web3 Oracles
// 1. Supra
// 2. Gelato
// 3. ChainLink







//--------------------------------------------------------------------------------------------------
//# Imports

import { FormatTypes, Interface } from "@ethersproject/abi";

const fs = require("fs");
const { ethers } = require("ethers");
//const { utils } = require('ethers').utils;
//const { BigNumber } = require('ethers').BigNumber;









//--------------------------------------------------------------------------------------------------
//# Variable Declaration

let run_on_load = false;
const default_contract_name = 'MelioraComicV1';

let contract_dict = {'default': {},
                     'Signatures': {'Address': {'mainnet': '',
                                                'goerli': '0x22d95fff7bb4e88bf1651daea74e36896919dbc0',
                                                'sepolia': '0x1Fd69E3941030940f58e537B15bea96F5e766291', 
                                                'optimism': '',
                                                'optimism_sepolia': '0x1Fd69E3941030940f58e537B15bea96F5e766291'},
                                   'ABI': `[{
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
                                        "name": "owner",
                                        "type": "address"
                                      },
                                      {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "approved",
                                        "type": "address"
                                      },
                                      {
                                        "indexed": true,
                                        "internalType": "uint256",
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "Approval",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
                                      {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "owner",
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
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "_fromTokenId",
                                        "type": "uint256"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "_toTokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "BatchMetadataUpdate",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
                                      {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "_tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "MetadataUpdate",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
                                      {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "previousOwner",
                                        "type": "address"
                                      },
                                      {
                                        "indexed": true,
                                        "internalType": "address",
                                        "name": "newOwner",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "OwnershipTransferred",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
                                      {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "token_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "address",
                                        "name": "user_address",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "PrimaryTokenAssigned",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
                                      {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "task_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "string",
                                        "name": "task_tags",
                                        "type": "string"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "bytes32",
                                        "name": "task_hash",
                                        "type": "bytes32"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "task_timestamp",
                                        "type": "uint256"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "address",
                                        "name": "completer_address",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "TaskCompleted",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
                                      {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "task_count",
                                        "type": "uint256"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "uint256",
                                        "name": "task_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "string",
                                        "name": "task_tags",
                                        "type": "string"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "string",
                                        "name": "task_metadata_URI",
                                        "type": "string"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "bytes32",
                                        "name": "task_hash",
                                        "type": "bytes32"
                                      }
                                    ],
                                    "name": "TaskCreated",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
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
                                        "indexed": true,
                                        "internalType": "uint256",
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "Transfer",
                                    "type": "event"
                                  },
                                  {
                                    "anonymous": false,
                                    "inputs": [
                                      {
                                        "indexed": false,
                                        "internalType": "address",
                                        "name": "user_address",
                                        "type": "address"
                                      },
                                      {
                                        "indexed": false,
                                        "internalType": "uint16",
                                        "name": "whitelist_tier",
                                        "type": "uint16"
                                      }
                                    ],
                                    "name": "WhitelistAssigned",
                                    "type": "event"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "task_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "string",
                                        "name": "task_tags",
                                        "type": "string"
                                      },
                                      {
                                        "internalType": "string",
                                        "name": "task_metadata_URI",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "__createTask",
                                    "outputs": [
                                      {
                                        "internalType": "bytes32",
                                        "name": "task_hash",
                                        "type": "bytes32"
                                      }
                                    ],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "string",
                                        "name": "token_URI",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "__mintFree",
                                    "outputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "token_ID",
                                        "type": "uint256"
                                      }
                                    ],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "string",
                                        "name": "new_collectionInfoURI",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "__setContractURI",
                                    "outputs": [
                                      {
                                        "internalType": "string",
                                        "name": "old_collectionInfoURI",
                                        "type": "string"
                                      }
                                    ],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "new_max_supply",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "__setMaxSupply",
                                    "outputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "old_max_supply",
                                        "type": "uint256"
                                      }
                                    ],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "new_price",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "uint16",
                                        "name": "whitelist_tier",
                                        "type": "uint16"
                                      }
                                    ],
                                    "name": "__setMintPrice",
                                    "outputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "old_price",
                                        "type": "uint256"
                                      }
                                    ],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "token_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "address",
                                        "name": "user_address",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "__setPrimaryTokenID",
                                    "outputs": [],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "token_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "string",
                                        "name": "token_URI",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "__setTokenURI",
                                    "outputs": [
                                      {
                                        "internalType": "string",
                                        "name": "old_token_URI",
                                        "type": "string"
                                      }
                                    ],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [],
                                    "name": "_maxSupply",
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
                                        "internalType": "address",
                                        "name": "to",
                                        "type": "address"
                                      },
                                      {
                                        "internalType": "uint256",
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "approve",
                                    "outputs": [],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "address",
                                        "name": "owner",
                                        "type": "address"
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
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "characters",
                                    "outputs": [
                                      {
                                        "internalType": "string",
                                        "name": "metadata_URI",
                                        "type": "string"
                                      },
                                      {
                                        "internalType": "uint256",
                                        "name": "tasks_completed",
                                        "type": "uint256"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [],
                                    "name": "collectionInfoURI",
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
                                        "name": "task_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "string",
                                        "name": "task_tags",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "completeTask",
                                    "outputs": [
                                      {
                                        "internalType": "bytes32",
                                        "name": "task_hash",
                                        "type": "bytes32"
                                      }
                                    ],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [],
                                    "name": "contractURI",
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
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "getApproved",
                                    "outputs": [
                                      {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "token_ID",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "getCharacter",
                                    "outputs": [
                                      {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                      },
                                      {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "uint256[]",
                                        "name": "",
                                        "type": "uint256[]"
                                      },
                                      {
                                        "internalType": "string[]",
                                        "name": "",
                                        "type": "string[]"
                                      },
                                      {
                                        "internalType": "bytes32[]",
                                        "name": "",
                                        "type": "bytes32[]"
                                      },
                                      {
                                        "internalType": "uint256[]",
                                        "name": "",
                                        "type": "uint256[]"
                                      },
                                      {
                                        "internalType": "address[]",
                                        "name": "",
                                        "type": "address[]"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [],
                                    "name": "getMaxSupply",
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
                                        "internalType": "uint16",
                                        "name": "whitelist_tier",
                                        "type": "uint16"
                                      }
                                    ],
                                    "name": "getMintPrice",
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
                                        "name": "index",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "getPrimaryHolderByIndex",
                                    "outputs": [
                                      {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [],
                                    "name": "getPrimaryHolderCount",
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
                                        "internalType": "address",
                                        "name": "user_address",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "getPrimaryTokenID",
                                    "outputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "token_ID",
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
                                        "name": "user_address",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "getPrimaryTokenURI",
                                    "outputs": [
                                      {
                                        "internalType": "string",
                                        "name": "_tokenURI",
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
                                        "name": "task_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "string",
                                        "name": "task_tags",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "getTask",
                                    "outputs": [
                                      {
                                        "internalType": "string",
                                        "name": "",
                                        "type": "string"
                                      },
                                      {
                                        "internalType": "bytes32",
                                        "name": "",
                                        "type": "bytes32"
                                      },
                                      {
                                        "internalType": "address[]",
                                        "name": "",
                                        "type": "address[]"
                                      },
                                      {
                                        "internalType": "uint256",
                                        "name": "",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "task_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "string",
                                        "name": "task_tags",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "getTaskHash",
                                    "outputs": [
                                      {
                                        "internalType": "bytes32",
                                        "name": "task_hash",
                                        "type": "bytes32"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "address",
                                        "name": "user_address",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "getWhitelistTier",
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
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "holderPrimaryTokens",
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
                                        "internalType": "address",
                                        "name": "owner",
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
                                        "internalType": "string",
                                        "name": "token_URI",
                                        "type": "string"
                                      }
                                    ],
                                    "name": "mint",
                                    "outputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "token_ID",
                                        "type": "uint256"
                                      }
                                    ],
                                    "stateMutability": "payable",
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
                                    "name": "mint_limits",
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
                                        "name": "",
                                        "type": "uint16"
                                      }
                                    ],
                                    "name": "mint_prices",
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
                                    "inputs": [],
                                    "name": "name",
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
                                    "inputs": [],
                                    "name": "owner",
                                    "outputs": [
                                      {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "ownerOf",
                                    "outputs": [
                                      {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
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
                                    "name": "primaryTokenHolderIndex",
                                    "outputs": [
                                      {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [],
                                    "name": "renounceOwnership",
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
                                        "name": "tokenId",
                                        "type": "uint256"
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
                                        "name": "tokenId",
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
                                        "name": "token_ID",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "setPrimaryTokenID",
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
                                    "inputs": [],
                                    "name": "symbol",
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
                                        "internalType": "bytes32",
                                        "name": "",
                                        "type": "bytes32"
                                      }
                                    ],
                                    "name": "taskHashArray",
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
                                        "name": "",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "tasks",
                                    "outputs": [
                                      {
                                        "internalType": "string",
                                        "name": "metadata_URI",
                                        "type": "string"
                                      },
                                      {
                                        "internalType": "uint256",
                                        "name": "task_ID",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "string",
                                        "name": "task_tags",
                                        "type": "string"
                                      },
                                      {
                                        "internalType": "bytes32",
                                        "name": "task_hash",
                                        "type": "bytes32"
                                      },
                                      {
                                        "internalType": "uint256",
                                        "name": "task_creation_timestamp",
                                        "type": "uint256"
                                      },
                                      {
                                        "internalType": "address",
                                        "name": "task_creator_address",
                                        "type": "address"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "uint256",
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "tokenURI",
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
                                        "name": "tokenId",
                                        "type": "uint256"
                                      }
                                    ],
                                    "name": "transferFrom",
                                    "outputs": [],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "address",
                                        "name": "newOwner",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "transferOwnership",
                                    "outputs": [],
                                    "stateMutability": "nonpayable",
                                    "type": "function"
                                  },
                                  {
                                    "inputs": [
                                      {
                                        "internalType": "address",
                                        "name": "",
                                        "type": "address"
                                      }
                                    ],
                                    "name": "whitelist_tiers",
                                    "outputs": [
                                      {
                                        "internalType": "uint16",
                                        "name": "",
                                        "type": "uint16"
                                      }
                                    ],
                                    "stateMutability": "view",
                                    "type": "function"
                                  }]`,
                                   'Functions': {'mint': {'number_of_inputs': 1},
                                                 '__mintFree': {'number_of_inputs': 1},
                                                 'contractURI': {'number_of_inputs': 0},
                                                 '__setContractURI': {'number_of_inputs': 1},
                                                 'getMintPrice': {'number_of_inputs': 0},
                                                 '__setMintPrice': {'number_of_inputs': 1},
                                                 'getMaxSupply': {'number_of_inputs': 0},
                                                 '__setMaxSupply': {'number_of_inputs': 1},
                                                 'tokenURI': {'number_of_inputs': 1},
                                                 '__setTokenURI': {'number_of_inputs': 2},
                                                 'lockToken': {'number_of_inputs': 2},
                                                 '__lockToken': {'number_of_inputs': 2},
                                                 'unlockToken': {'number_of_inputs': 1},
                                                 '__unlockToken': {'number_of_inputs': 1},
                                                 'getTimeLocked': {'number_of_inputs': 1},
                                                 'getLocked': {'number_of_inputs': 1},
                                                 'getPrimaryTokenID': {'number_of_inputs': 1},
                                                 'setPrimaryTokenID': {'number_of_inputs': 2},
                                                 'getPrimaryTokenURI': {'number_of_inputs': 1},
                                                 'getPrimaryHolderByIndex': {'number_of_inputs': 1},
                                                 'getPrimaryHolderCount': {'number_of_inputs': 0},
                                                 '__createTask': {'number_of_inputs': 3},
                                                 'getTaskHash': {'number_of_inputs': 2},
                                                 'getTask': {'number_of_inputs': 2},
                                                 'getCharacter': {'number_of_inputs': 1},
                                                 'completeTask': {'number_of_inputs': 2},
                                                 'completeTaskBatch': {'number_of_inputs': 2},
                                                 'setApprovalForAll': {'number_of_inputs': 2}}},
                     'MelioraComicV1': {'Address': {'mainnet': '',
                                                    'polygon': '',
                                                    'mumbai': '0xbAE8C07F52d440573e503d4a89A056Cd1E1907e3',
                                                    'base': '0x4E35d70889B5A698fE9AE2C19CB280f29DBDF7eC',
                                                    'base_sepolia': '',
                                                    'goerli': '',
                                                    'sepolia': '0xE67EF54708a1e49591c804970091d36c1b780f36', 
                                                    'optimism': '',
                                                    'optimism_sepolia': '0xDd87063B0fb8F7b13AFA7886F51106013004744f'},
                                        'ABI_location': '../../../artifacts/contracts/MelioraComicV1.sol',
                                          'ABI': `[{
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "initialOwner",
                                                "type": "address"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "constructor"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "numerator",
                                                "type": "uint256"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "denominator",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "ERC2981InvalidDefaultRoyalty",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "receiver",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC2981InvalidDefaultRoyaltyReceiver",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "numerator",
                                                "type": "uint256"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "denominator",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "ERC2981InvalidTokenRoyalty",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              },
                                              {
                                                "internalType": "address",
                                                "name": "receiver",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC2981InvalidTokenRoyaltyReceiver",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "sender",
                                                "type": "address"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              },
                                              {
                                                "internalType": "address",
                                                "name": "owner",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC721IncorrectOwner",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "operator",
                                                "type": "address"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "ERC721InsufficientApproval",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "approver",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC721InvalidApprover",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "operator",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC721InvalidOperator",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "owner",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC721InvalidOwner",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "receiver",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC721InvalidReceiver",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "sender",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "ERC721InvalidSender",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "ERC721NonexistentToken",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "owner",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "OwnableInvalidOwner",
                                            "type": "error"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "account",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "OwnableUnauthorizedAccount",
                                            "type": "error"
                                          },
                                          {
                                            "anonymous": false,
                                            "inputs": [
                                              {
                                                "indexed": true,
                                                "internalType": "address",
                                                "name": "owner",
                                                "type": "address"
                                              },
                                              {
                                                "indexed": true,
                                                "internalType": "address",
                                                "name": "approved",
                                                "type": "address"
                                              },
                                              {
                                                "indexed": true,
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "Approval",
                                            "type": "event"
                                          },
                                          {
                                            "anonymous": false,
                                            "inputs": [
                                              {
                                                "indexed": true,
                                                "internalType": "address",
                                                "name": "owner",
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
                                                "indexed": false,
                                                "internalType": "uint256",
                                                "name": "_fromTokenId",
                                                "type": "uint256"
                                              },
                                              {
                                                "indexed": false,
                                                "internalType": "uint256",
                                                "name": "_toTokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "BatchMetadataUpdate",
                                            "type": "event"
                                          },
                                          {
                                            "anonymous": false,
                                            "inputs": [
                                              {
                                                "indexed": false,
                                                "internalType": "uint256",
                                                "name": "_tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "MetadataUpdate",
                                            "type": "event"
                                          },
                                          {
                                            "anonymous": false,
                                            "inputs": [
                                              {
                                                "indexed": true,
                                                "internalType": "address",
                                                "name": "previousOwner",
                                                "type": "address"
                                              },
                                              {
                                                "indexed": true,
                                                "internalType": "address",
                                                "name": "newOwner",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "OwnershipTransferred",
                                            "type": "event"
                                          },
                                          {
                                            "anonymous": false,
                                            "inputs": [
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
                                                "indexed": true,
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "Transfer",
                                            "type": "event"
                                          },
                                          {
                                            "anonymous": false,
                                            "inputs": [
                                              {
                                                "indexed": false,
                                                "internalType": "uint16",
                                                "name": "whitelist_tier",
                                                "type": "uint16"
                                              },
                                              {
                                                "indexed": false,
                                                "internalType": "address",
                                                "name": "user_address",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "WhitelistAssigned",
                                            "type": "event"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "string",
                                                "name": "token_URI",
                                                "type": "string"
                                              }
                                            ],
                                            "name": "__mintFree",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "token_ID",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "string",
                                                "name": "new_collectionInfoURI",
                                                "type": "string"
                                              }
                                            ],
                                            "name": "__setContractURI",
                                            "outputs": [
                                              {
                                                "internalType": "string",
                                                "name": "old_collectionInfoURI",
                                                "type": "string"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "receiver_address",
                                                "type": "address"
                                              },
                                              {
                                                "internalType": "uint96",
                                                "name": "fee_numerator",
                                                "type": "uint96"
                                              }
                                            ],
                                            "name": "__setDefaultRoyalty",
                                            "outputs": [],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "string",
                                                "name": "token_URI",
                                                "type": "string"
                                              }
                                            ],
                                            "name": "__setDefaultTokenURI",
                                            "outputs": [
                                              {
                                                "internalType": "string",
                                                "name": "old_default_token_URI",
                                                "type": "string"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address payable",
                                                "name": "recipient_address",
                                                "type": "address"
                                              },
                                              {
                                                "internalType": "uint16",
                                                "name": "fund_weight",
                                                "type": "uint16"
                                              }
                                            ],
                                            "name": "__setFundRecipientWeight",
                                            "outputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "old_fund_weight",
                                                "type": "uint16"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "new_max_supply",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "__setMaxSupply",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "old_max_supply",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "whitelist_tier",
                                                "type": "uint16"
                                              },
                                              {
                                                "internalType": "uint16",
                                                "name": "new_limit",
                                                "type": "uint16"
                                              }
                                            ],
                                            "name": "__setMintLimit",
                                            "outputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "old_limit",
                                                "type": "uint16"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "whitelist_tier",
                                                "type": "uint16"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "new_price",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "__setMintPrice",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "old_price",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "token_ID",
                                                "type": "uint256"
                                              },
                                              {
                                                "internalType": "string",
                                                "name": "token_URI",
                                                "type": "string"
                                              }
                                            ],
                                            "name": "__setTokenURI",
                                            "outputs": [
                                              {
                                                "internalType": "string",
                                                "name": "old_token_URI",
                                                "type": "string"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "string",
                                                "name": "token_URI",
                                                "type": "string"
                                              }
                                            ],
                                            "name": "__setUniqueTokenBaseURI",
                                            "outputs": [
                                              {
                                                "internalType": "string",
                                                "name": "old_unique_token_base_URI",
                                                "type": "string"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "new_unique_token_maxSupply",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "__setUniqueTokenMaxSupply",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "old_unique_token_maxSupply",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "new_whitelist_minimum_requirement",
                                                "type": "uint16"
                                              }
                                            ],
                                            "name": "__setWhitelistMinimumRequirement",
                                            "outputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "old_whitelist_minimum_requirement",
                                                "type": "uint16"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "new_whitelist_tier",
                                                "type": "uint16"
                                              },
                                              {
                                                "internalType": "address",
                                                "name": "user_address",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "__setWhitelistTier",
                                            "outputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "old_whitelist_tier",
                                                "type": "uint16"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [],
                                            "name": "__updateAllDefaultTokenURIs",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "current_supply",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [],
                                            "name": "__updateAllUniqueTokenURIs",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "current_supply",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [],
                                            "name": "_currentTokenID",
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
                                            "inputs": [],
                                            "name": "_maxSupply",
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
                                                "internalType": "address",
                                                "name": "to",
                                                "type": "address"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "approve",
                                            "outputs": [],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "owner",
                                                "type": "address"
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
                                            "inputs": [],
                                            "name": "collectionInfoURI",
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
                                            "inputs": [],
                                            "name": "contractURI",
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
                                            "inputs": [],
                                            "name": "defaultTokenURI",
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
                                            "inputs": [],
                                            "name": "fundRecipientCount",
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
                                                "internalType": "uint256",
                                                "name": "",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "fund_recipient_addresses",
                                            "outputs": [
                                              {
                                                "internalType": "address payable",
                                                "name": "",
                                                "type": "address"
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
                                              }
                                            ],
                                            "name": "fund_recipient_weights",
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
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "getApproved",
                                            "outputs": [
                                              {
                                                "internalType": "address",
                                                "name": "",
                                                "type": "address"
                                              }
                                            ],
                                            "stateMutability": "view",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [],
                                            "name": "getCurrentSupply",
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
                                            "inputs": [],
                                            "name": "getDefaultTokenURI",
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
                                            "inputs": [],
                                            "name": "getFundRecipientCount",
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
                                                "internalType": "address",
                                                "name": "recipient_address",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "getFundRecipientWeight",
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
                                            "inputs": [],
                                            "name": "getMaxSupply",
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
                                                "internalType": "uint16",
                                                "name": "whitelist_tier",
                                                "type": "uint16"
                                              }
                                            ],
                                            "name": "getMintLimit",
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
                                                "name": "whitelist_tier",
                                                "type": "uint16"
                                              }
                                            ],
                                            "name": "getMintPrice",
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
                                            "inputs": [],
                                            "name": "getMyMintLimit",
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
                                            "inputs": [],
                                            "name": "getMyMintPrice",
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
                                            "inputs": [],
                                            "name": "getMyWhitelistTier",
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
                                            "inputs": [],
                                            "name": "getTotalFundWeight",
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
                                            "inputs": [],
                                            "name": "getUniqueTokenBaseURI",
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
                                            "inputs": [],
                                            "name": "getUniqueTokenMaxSupply",
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
                                            "inputs": [],
                                            "name": "getUniqueTokenSupply",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "unique_token_supply",
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
                                                "name": "user_address",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "getUserMintLimit",
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
                                                "internalType": "address",
                                                "name": "user_address",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "getUserMintPrice",
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
                                            "inputs": [],
                                            "name": "getWhitelistMinimumRequirement",
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
                                                "internalType": "address",
                                                "name": "user_address",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "getWhitelistTier",
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
                                                "internalType": "address",
                                                "name": "owner",
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
                                                "name": "recipient_address",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "isHuman",
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
                                            "inputs": [],
                                            "name": "mint",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "token_ID",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "payable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "amount",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "mintBatch",
                                            "outputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "token_ID",
                                                "type": "uint256"
                                              }
                                            ],
                                            "stateMutability": "payable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "mint_counts",
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
                                                "internalType": "uint16",
                                                "name": "",
                                                "type": "uint16"
                                              }
                                            ],
                                            "name": "mint_limits",
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
                                                "name": "",
                                                "type": "uint16"
                                              }
                                            ],
                                            "name": "mint_prices",
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
                                            "inputs": [],
                                            "name": "name",
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
                                            "inputs": [],
                                            "name": "owner",
                                            "outputs": [
                                              {
                                                "internalType": "address",
                                                "name": "",
                                                "type": "address"
                                              }
                                            ],
                                            "stateMutability": "view",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "ownerOf",
                                            "outputs": [
                                              {
                                                "internalType": "address",
                                                "name": "",
                                                "type": "address"
                                              }
                                            ],
                                            "stateMutability": "view",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [],
                                            "name": "renounceOwnership",
                                            "outputs": [],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
                                              },
                                              {
                                                "internalType": "uint256",
                                                "name": "salePrice",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "royaltyInfo",
                                            "outputs": [
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
                                                "internalType": "uint256",
                                                "name": "tokenId",
                                                "type": "uint256"
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
                                                "name": "tokenId",
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
                                            "inputs": [],
                                            "name": "symbol",
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
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "tokenURI",
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
                                            "inputs": [],
                                            "name": "total_fund_weight",
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
                                                "name": "tokenId",
                                                "type": "uint256"
                                              }
                                            ],
                                            "name": "transferFrom",
                                            "outputs": [],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [
                                              {
                                                "internalType": "address",
                                                "name": "newOwner",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "transferOwnership",
                                            "outputs": [],
                                            "stateMutability": "nonpayable",
                                            "type": "function"
                                          },
                                          {
                                            "inputs": [],
                                            "name": "uniqueTokenBaseURI",
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
                                            "inputs": [],
                                            "name": "unique_token_maxSupply",
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
                                            "inputs": [],
                                            "name": "whitelist_minimum_requirement",
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
                                                "internalType": "address",
                                                "name": "",
                                                "type": "address"
                                              }
                                            ],
                                            "name": "whitelist_tiers",
                                            "outputs": [
                                              {
                                                "internalType": "uint16",
                                                "name": "",
                                                "type": "uint16"
                                              }
                                            ],
                                            "stateMutability": "view",
                                            "type": "function"
                                          }]`,
                                          'Functions': {'mint': [],
                                                        'mintBatch': ['amount'],
                                                        '__mintFree': ['token_URI'],
                                                        '__toggleMintLocked': [],
                                                        'contractURI': [],
                                                        '__setContractURI': ['new_contract_URI'],
                                                        'getCurrentSupply': [],
                                                        'getMaxSupply': [],
                                                        '__setMaxSupply': ['new_max_supply'],
                                                        'getUniqueTokenSupply': [],
                                                        'getUniqueTokenMaxSupply': [],
                                                        '__setUniqueTokenMaxSupply': ['new_unique_token_maxSupply'],
                                                        'getWhitelistTier': ['user_address'],
                                                        '__setWhitelistTier': ['whitelist_tier', 'user_address'],
                                                        'getWhitelistMinimumRequirement': [],
                                                        '__setWhitelistMinimumRequirement': ['new_whitelist_minimum_requirement'],
                                                        'getMintPrice': ['whitelist_tier'],
                                                        'getUserMintPrice': ['user_address'],
                                                        'getMyMintPrice': [],
                                                        '__setMintPrice': ['whitelist_tier', 'new_mint_price'],
                                                        'getMintLimit': ['whitelist_tier'],
                                                        'getUserMintLimit': ['user_address'],
                                                        'getMyMintLimit': [],
                                                        '__setMintLimit': ['whitelist_tier', 'mint_limit'],
                                                        'tokenURI': ['token_ID'],
                                                        '__setTokenURI': ['token_ID', 'new_token_URI'],
                                                        'getDefaultTokenURI': [],
                                                        '__setDefaultTokenURI': ['defaultTokenURI'],
                                                        'getUniqueTokenBaseURI': [],
                                                        '__setUniqueTokenBaseURI': ['uniqueTokenBaseURI'],
                                                        '__updateAllDefaultTokenURIs': [],
                                                        '__updateAllUniqueTokenURIs': [],
                                                        '__setFundRecipientWeight' : ['recipient_address', 'fund_weight'],
                                                        'getFundRecipientWeight': ['recipient_address'],
                                                        'getFundRecipientCount': [],
                                                        'getTotalFundWeight': [],
                                                        'royaltyInfo': ['tokenId', 'salePrice'],
                                                        '__setDefaultRoyalty': ['receiver_address', 'fee_percent'],
                                                        'setRoyaltyRecipient': ['receiver_address'],
                                                        'setRoyaltyFee': ['int_over_10000'],
                                                        'setApprovalForAll': ['thing_1', 'thing_2']}},
                     'LMNTL': {'Address': {'mainnet': '',
                                           'goerli': '0xA70CB9f3768D9AEdF7390Fed92770dCDdE1D0C1D',
                                           'hyperspace': '0xB4fECac2F5BdEc2eD15547cF857464c8691b9849'},
                               'ABI': `[]`,
                               'Functions': {'mint': {'number_of_inputs': 1}}},
                     'FundSplitter': {'Address': {'mainnet': '',
                                                    'mumbai': '0xE20c8268Bb7efCa16842300148553cDb7910A4A1',
                                                    'base': '0xA47bD73D576544ca4380B614C1E7f9B3B3d601b9',
                                                    'base_sepolia': '',
                                                    'goerli': '',
                                                    'sepolia': '', 
                                                    'optimism': '',
                                                    'optimism_sepolia': ''},
                                      'ABI_location': '../../../artifacts/contracts/FundSplitter.sol',
                                      'ABI': `[{
                                        "inputs": [
                                          {
                                            "internalType": "address",
                                            "name": "initialOwner",
                                            "type": "address"
                                          }
                                        ],
                                        "stateMutability": "nonpayable",
                                        "type": "constructor"
                                      },
                                      {
                                        "inputs": [
                                          {
                                            "internalType": "address",
                                            "name": "owner",
                                            "type": "address"
                                          }
                                        ],
                                        "name": "OwnableInvalidOwner",
                                        "type": "error"
                                      },
                                      {
                                        "inputs": [
                                          {
                                            "internalType": "address",
                                            "name": "account",
                                            "type": "address"
                                          }
                                        ],
                                        "name": "OwnableUnauthorizedAccount",
                                        "type": "error"
                                      },
                                      {
                                        "anonymous": false,
                                        "inputs": [
                                          {
                                            "indexed": true,
                                            "internalType": "address",
                                            "name": "previousOwner",
                                            "type": "address"
                                          },
                                          {
                                            "indexed": true,
                                            "internalType": "address",
                                            "name": "newOwner",
                                            "type": "address"
                                          }
                                        ],
                                        "name": "OwnershipTransferred",
                                        "type": "event"
                                      },
                                      {
                                        "stateMutability": "payable",
                                        "type": "fallback"
                                      },
                                      {
                                        "inputs": [
                                          {
                                            "internalType": "address payable",
                                            "name": "recipient_address",
                                            "type": "address"
                                          },
                                          {
                                            "internalType": "uint16",
                                            "name": "fund_weight",
                                            "type": "uint16"
                                          }
                                        ],
                                        "name": "__setFundRecipientWeight",
                                        "outputs": [
                                          {
                                            "internalType": "uint16",
                                            "name": "old_fund_weight",
                                            "type": "uint16"
                                          }
                                        ],
                                        "stateMutability": "nonpayable",
                                        "type": "function"
                                      },
                                      {
                                        "inputs": [],
                                        "name": "getFundRecipientCount",
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
                                            "internalType": "address",
                                            "name": "recipient_address",
                                            "type": "address"
                                          }
                                        ],
                                        "name": "getFundRecipientWeight",
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
                                        "inputs": [],
                                        "name": "getTotalFundWeight",
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
                                        "inputs": [],
                                        "name": "owner",
                                        "outputs": [
                                          {
                                            "internalType": "address",
                                            "name": "",
                                            "type": "address"
                                          }
                                        ],
                                        "stateMutability": "view",
                                        "type": "function"
                                      },
                                      {
                                        "inputs": [],
                                        "name": "renounceOwnership",
                                        "outputs": [],
                                        "stateMutability": "nonpayable",
                                        "type": "function"
                                      },
                                      {
                                        "inputs": [
                                          {
                                            "internalType": "address",
                                            "name": "newOwner",
                                            "type": "address"
                                          }
                                        ],
                                        "name": "transferOwnership",
                                        "outputs": [],
                                        "stateMutability": "nonpayable",
                                        "type": "function"
                                      },
                                      {
                                        "stateMutability": "payable",
                                        "type": "receive"
                                      }]`,
                                      'Functions': {'mint': [],
                                                        'mintBatch': ['amount'],
                                                        '__mintFree': ['token_URI'],
                                                        'contractURI': [],
                                                        '__setContractURI': ['new_contract_URI'],
                                                        'getCurrentSupply': [],
                                                        'getMaxSupply': [],
                                                        '__setMaxSupply': ['new_max_supply'],
                                                        'getUniqueTokenSupply': [],
                                                        'getUniqueTokenMaxSupply': [],
                                                        '__setUniqueTokenMaxSupply': ['new_unique_token_maxSupply'],
                                                        'getWhitelistTier': ['user_address'],
                                                        '__setWhitelistTier': ['whitelist_tier', 'user_address'],
                                                        'getWhitelistMinimumRequirement': [],
                                                        '__setWhitelistMinimumRequirement': ['new_whitelist_minimum_requirement'],
                                                        'getMintPrice': ['whitelist_tier'],
                                                        'getUserMintPrice': ['user_address'],
                                                        'getMyMintPrice': [],
                                                        '__setMintPrice': ['whitelist_tier', 'new_mint_price'],
                                                        'getMintLimit': ['whitelist_tier'],
                                                        'getUserMintLimit': ['user_address'],
                                                        'getMyMintLimit': [],
                                                        '__setMintLimit': ['whitelist_tier', 'mint_limit'],
                                                        'tokenURI': ['token_ID'],
                                                        '__setTokenURI': ['token_ID', 'new_token_URI'],
                                                        'getDefaultTokenURI': [],
                                                        '__setDefaultTokenURI': ['defaultTokenURI'],
                                                        'getUniqueTokenBaseURI': [],
                                                        '__setUniqueTokenBaseURI': ['uniqueTokenBaseURI'],
                                                        '__updateAllDefaultTokenURIs': [],
                                                        '__updateAllUniqueTokenURIs': [],
                                                        '__setFundRecipientWeight' : ['recipient_address', 'fund_weight'],
                                                        'getFundRecipientWeight': ['recipient_address'],
                                                        'getFundRecipientCount': [],
                                                        'getTotalFundWeight': [],
                                                        'royaltyInfo': ['tokenId', 'salePrice'],
                                                        '__setDefaultRoyalty': ['receiver_address', 'fee_percent'],
                                                        'setRoyaltyRecipient': ['receiver_address'],
                                                        'setRoyaltyFee': ['int_over_10000'],
                                                        '__setRoyaltyReceiver': ['receiver_address'],
                                                        'setApprovalForAll': ['thing_1', 'thing_2']}}};

var contract_name = default_contract_name;
contract_dict['default'] = contract_dict[default_contract_name];




// *Update metadata URIs with your IPFS files' information
const folder_URIs = {
  NFT_Storage: 'bafybeiglxxim4fc4jxl53kxoxjsnrf7efcabx4jikrgrz2ralmgqlj6yai',
  Pinata: 'QmcvaEQrzwiNjDZzJX1jBq5zDtvF9yc2Le6nyjquABEGmh',
  Pinata_old: 'QmPF4nrDbTnGk2UWduZDw2FCHZcF6HJicYDdsDAkEqJgH7'};

const JSON_URIs = {
  NFT_Storage: {0:'/LMNTLfire1.json',
                1:'/LMNTLwater1.json',
                2:'/LMNTLair1.json',
                3:'/LMNTLearth1.json',
                4:'/LMNTLfire2.json',
                5:'/LMNTLwater2.json',
                6:'/LMNTLair2.json',
                7:'/LMNTLearth2.json',
                background_list: "bafybeicc2gguyju7625a3c6ie2gyukggwhgcle64a73bo4yxrtrr6zf2fi/background_list.json",
                pac_list: "bafybeigmgu2k25bxwjmwxwrr2kwiwzzjpuy3mzew2yochngedqof5zgmu4/pac_list.json"},
  Pinata: {0:'/LMNTLfire1.json',
           1:'/LMNTLwater1.json',
           2:'/LMNTLair1.json',
           3:'/LMNTLearth1.json',
           4:'/LMNTLfire2.json',
           5:'/LMNTLwater2.json',
           6:'/LMNTLair2.json',
           7:'/LMNTLearth2.json'},
  Pinata_old: {0:'/LMNTLfire1.png',
           1:'/LMNTLwater1.png',
           2:'/LMNTLair1.png',
           3:'/LMNTLearth1.png',
           4:'/LMNTLfire2.png',
           5:'/LMNTLwater2.png',
           6:'/LMNTLair2.png',
           7:'/LMNTLearth2.png'}};

const network_IPFS_dict = {'mainnet': 'Pinata',
                           'goerli': 'NFT_Storage',
                           'hyperspace': 'NFT_Storage',
                           'sepolia': 'NFT_Storage'};

const IPFS_prefixes = {
  Pinata: 'https://gateway.pinata.cloud/ipfs/',
  Pinata_old: 'https://gateway.pinata.cloud/ipfs/',
  Infura: '',
  NFT_Storage: 'https://nftstorage.link/ipfs/'
};

const network_dict = {'default': {},
                      'ethereum': {'name': 'ethereum',
                                   'chainId': 1,
                                   'url': 'https://mainnet.infura.io/v3/',
                                   'add_network': {chainId: '0x1', // Chain ID of the network
                                                   chainName: 'Ethereum Mainnet', // Name of the network
                                                   rpcUrls: ['https://mainnet.infura.io/v3/'], // RPC URL
                                                   nativeCurrency: {
                                                        name: 'ETH',
                                                        symbol: 'ETH',
                                                        decimals: 18},
                                                   blockExplorerUrls: ['https://etherscan.io/']}},
                      'goerli': {'name': 'goerli',
                                 'chainId': 5,
                                 'url': ''},
                      'polygon': {'name': 'polygon',
                                  'chainId': 137,
                                  'url': '', 
                                  'add_network': {chainId: "0x89",
                                                  rpcUrls: ["https://rpc-mainnet.matic.network/"],
                                                  chainName: "Matic Mainnet",
                                                  nativeCurrency: {
                                                      name: "MATIC",
                                                      symbol: "MATIC",
                                                      decimals: 18
                                                  },
                                                  blockExplorerUrls: ["https://polygonscan.com/"]}},
                      'mumbai': {'name': 'mumbai',
                                  'chainId': 80001,
                                  'url': 'https://rpc.ankr.com/polygon_mumbai', 
                                  'add_network': {chainId: "0x13881",
                                                  rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
                                                  chainName: "Mumbai Testnet",
                                                  nativeCurrency: {
                                                      name: "MATIC",
                                                      symbol: "MATIC",
                                                      decimals: 18
                                                  },
                                                  blockExplorerUrls: ["https://mumbai.polygonscan.com/"]}},
                      'sepolia': {'name': 'sepolia',
                                  'chainId': 11155111,
                                  'url': 'https://sepolia.infura.io/v3/',
                                  'add_network': {chainId: "0x2105",
                                                  rpcUrls: ["https://sepolia.infura.io/v3/"],
                                                  chainName: "Base",
                                                  nativeCurrency: {
                                                      name: "ETH",
                                                      symbol: "ETH",
                                                      decimals: 18
                                                  },
                                                  blockExplorerUrls: ["https://sepolia.etherscan.io/"]}},
                      'optimism': {'name': 'optimism',
                                   'chainId': 10,
                                   'url': ''},
                      'optimism_sepolia': {'name': 'optimism_sepolia',
                                           'chainId': 11155420,
                                           'url': ''},
                      'base': {'name': 'base',
                                           'chainId': 8453,
                                           'url': 'https://mainnet.base.org',
                                           'add_network': {chainId: "0x2105",
                                                           rpcUrls: ["https://mainnet.base.org", "https://base.llamarpc.com"],
                                                           chainName: "Base",
                                                           nativeCurrency: {
                                                               name: "ETH",
                                                               symbol: "ETH",
                                                               decimals: 18
                                                           },
                                                           blockExplorerUrls: ["https://basescan.org/"]}},
                      'base_sepolia': {'name': 'base_sepolia',
                                           'chainId': 84532,
                                           'url': 'https://base-sepolia-rpc.publicnode.com',
                                           'add_network': {chainId: "0x14a34",
                                                           rpcUrls: ["https://base-sepolia-rpc.publicnode.com"],
                                                           chainName: "Base Sepolia",
                                                           nativeCurrency: {
                                                               name: "ETH",
                                                               symbol: "ETH",
                                                               decimals: 18
                                                           },
                                                           blockExplorerUrls: ["https://sepolia.basescan.org/"]}},
                      1: {'name': 'ethereum',
                                  'chainId': 1,
                                  'url': 'https://mainnet.infura.io/v3/'},
                      5: {'name': 'goerli',
                                 'chainId': 5,
                                 'url': ''},
                      137: {'name': 'polygon',
                                  'chainId': 137,
                                  'url': ''},
                      80001: {'name': 'mumbai',
                                  'chainId': 80001,
                                  'url': ''},
                      11155111: {'name': 'sepolia',
                                  'chainId': 11155111,
                                  'url': 'https://sepolia.infura.io/v3/'},
                      10: {'name': 'optimism',
                                   'chainId': 10,
                                   'url': ''},
                      11155420: {'name': 'optimism_sepolia',
                                           'chainId': 11155420,
                                           'url': ''},
                      8453: {'name': 'base',
                                           'chainId': 8453,
                                           'url': 'https://base.llamarpc.com'},
                                           
                      84532: {'name': 'base_sepolia',
                                           'chainId': 84532,
                                           'url': 'https://base-sepolia-rpc.publicnode.com'}};

const default_network = 'sepolia';
var network_name = default_network;
var network_ID = network_dict[default_network]['chainId'];
network_dict['default'] = network_dict[default_network];

const opensea_link_delay = 8;
const opensea_prefixes = {
  'mainnet': 'https://opensea.io/assets/ethereum/',
  'goerli': 'https://testnets.opensea.io/assets/goerli/',
  'sepolia': 'https://testnets.opensea.io/assets/sepolia/',
  'hyperspace': ''
};

// These variables are set as Context variables to be accessed by other components
var user_address, user_token_ID, user_metadata_URI, user_metadata, user_avatar_URI, user_balance, contract_name;

var provider, signer, user_web_wallet;



var user_minted_NFT = false;









//--------------------------------------------------------------------------------------------------
//# Basic Functions

//const [address, toggleConnected] = useState(0);
//const [isMinted, toggleMinted] = useState(0);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


function pause(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


async function getRounding(number) {
  // Convert the number to a string
  const number_string = number.toString();
  console.log('number_string:', number_string);
  // Find the position of the decimal point
  const decimal_index = number_string.indexOf('.');
  
  // If there is no decimal point, return 0
  if (decimal_index === -1) {
      return 0;
  }

  const rounding_amount = number_string.length - decimal_index - 1;
  
  // Return the number of characters after the decimal point
  return(rounding_amount);
};











//--------------------------------------------------------------------------------------------------
//# Wallet & Metadata Functions

if (run_on_load) {
  onLoad();
};
async function onLoad () {
  if (run_on_load) {
    run_on_load = false;
    await connectWallet();
    contract_dict['Signatures']['Functions'] = await parseABIfunctions(contract_dict['Signatures']['ABI']);
    console.log("Functions:", contract_dict['Signatures']['Functions']);
    
  }
}


async function setProvider() {
  provider = new ethers.providers.Web3Provider(window.ethereum);
  console.log('Provider: ', provider);
  user_web_wallet = provider['connection']['url'];
  console.log('Web Wallet: ', user_web_wallet);
  if ('_network' in provider) {
    network_name = provider['_network']['name'];
    console.log('Network: ', network_name);
  };
  return(provider);
};


async function setSigner(provider_input) {
  if (!provider_input) {
    provider_input = provider;
  };
  if (!provider_input) {
    provider_input = await setProvider();
  };
  // Prompt user for account connections
  await provider_input.send("eth_requestAccounts", []);
  signer = await provider_input.getSigner();
  console.log('Signer: ', signer);
  return(signer);
};


async function setUserAddress(signer_input) {
  if (!signer_input) {
    signer_input = signer;
  };
  if (!signer_input) {
    signer_input = await setSigner();
  };
  user_address = await signer_input.getAddress();
  console.log('Address: ', user_address);
  return(user_address);
}


async function setUserBalance(signer_input) {
  if (!signer_input) {
    signer_input = signer;
  };
  if (!signer_input) {
    signer_input = await setSigner();
  };
  user_balance = await signer_input.getBalance();
  user_balance = ethers.utils.formatEther(user_balance);
  console.log('Balance: ', user_balance);
  return user_balance;
};


export async function setUserTokenID(contract_name_input, address_input) {
  // Set user address
  if (!address_input) {
    address_input = user_address;
  };
  if (!address_input) {
    address_input = await setUserAddress();
  };

  // Set contract name
  if (!contract_name_input) {
    contract_name_input = contract_name;
  };
  if (!contract_name_input) {
    contract_name_input = default_contract_name;
  };

  const contract = new ethers.Contract(contract_dict[contract_name_input]['Address'][network_name], contract_dict[contract_name_input]['ABI'], provider);
  user_token_ID = await contract.getPrimaryTokenID(address_input);
  console.log('User Token ID: ', user_token_ID);
  return user_token_ID;
};


export async function setUserMetadata(contract_name_input, address_input) {
  // Set user address
  if (!address_input) {
    address_input = user_address;
  };
  if (!address_input) {
    address_input = await setUserAddress();
  };

  // Set contract name
  if (!contract_name_input) {
    contract_name_input = contract_name;
  };
  if (!contract_name_input) {
    contract_name_input = default_contract_name;
  };

  const contract = new ethers.Contract(contract_dict[contract_name_input]['Address'][network_name], contract_dict[contract_name_input]['ABI'], provider);
  user_metadata_URI = await contract.getPrimaryTokenURI(address_input);
  if (user_metadata_URI.includes('.json')) {
    try {
      const response = await fetch(user_metadata_URI);
      user_metadata = await response.json();
      user_metadata['URI'] = user_metadata_URI;
      console.log('User Metadata: ', user_metadata);
      return user_metadata;
    } catch(error) {
      console.log('setUserMetadata Error:', error.message);
    };
  } else {
    return user_metadata_URI;
  };
};


export async function setUserAvatarURI(metadata_input) {
  if (!metadata_input) {
    metadata_input = user_metadata;
  };
  if (!metadata_input) {
    metadata_input = await setUserMetadata();
  };
  if (typeof(metadata_input) === 'string') {
    user_avatar_URI = metadata_input;
  } else {
    user_avatar_URI = metadata_input['image'];
  }
  console.log('User Avatar URI: ', user_avatar_URI);
  return user_avatar_URI;
};


export async function getMetadataURI(metadata_info) {
  if (!network_name) {
    network_name = getNetwork();
  }
  var metadata_URI;
  const IPFS_name = network_IPFS_dict[network_name];

  // Pre-set Image URI
  if (JSON_URIs[IPFS_name][metadata_info]) {
    metadata_URI = IPFS_prefixes[IPFS_name] + folder_URIs[IPFS_name] + JSON_URIs[IPFS_name][metadata_info];
  } else {
    metadata_URI = IPFS_prefixes[IPFS_name] + metadata_info;
  };
  return metadata_URI;
};


export async function getOpenSeaLink(contract_name_input, token_ID_input) {
  if (!token_ID_input) {
    token_ID_input = user_token_ID;
  };
  if (!token_ID_input) {
    token_ID_input = await setUserTokenID(contract_name_input);
  };

  var contract_address;
  if (contract_dict[contract_name_input]) {
    contract_address = contract_dict[contract_name_input]['Address'][network_name];
  } else {
    contract_address = contract_name_input;
  };

  var opensea_link = opensea_prefixes[network_name] + contract_address + '/' + token_ID_input;
  console.log('OpenSea Link: ', opensea_link);
  return opensea_link;
}


export async function getNetwork() {
  if (!network_name) {
    provider = await setProvider();
    if ('_network' in provider) {
      network_name = provider['_network']['name'];
    };
  };
  console.log('Network Name: ', network_name);
  return network_name;
}

export async function getJSONfromIPFS(metadata_URI_input) {
  console.log('\nSmartContractOperator >>> RUNNING getJSONfromIPFS()');
  if (metadata_URI_input) {
    console.log("metadata_URI_input:", metadata_URI_input);
    var metadata_URI;
    if (!metadata_URI_input.includes('http')) {
      metadata_URI = getMetadataURI(metadata_URI_input);
    } else {
      metadata_URI = metadata_URI_input;
    };
    const response = await fetch(metadata_URI);
    const JSON_contents = await response.json();
    console.log('JSON Contents: ', JSON_contents);
    return JSON_contents;
  } else {
    console.log('No metadata URI input!')
  };
};


async function getContractInfo(contract_name_input) {
  const shit = 'balls';
  //return({contract_address, contract_functions with number of inputs})
}


// Function to check if the network is already added to the wallet
async function checkNetworkAdded(network_name_input) {
  try {
      const networks = await window.ethereum.request({ method: 'wallet_getEthereumChain' });
      return networks.find(net => net.chainId === network_name_input.chainId);
  } catch (error) {
      console.error('Error:', error);
      return false;
  }
}


async function promptNetworkSwitch (network_name_input) {
  console.log('\nSmartContractOperator >>> RUNNING promptNetworkSwitch()');
  console.log('network_name_input:', network_name_input);
  var network_switched = false;
  if (network_name_input === 'polygon' || network_name_input === 'matic') {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x89" }],
    });
    network_switched = true;
  } else if (network_name_input === 'goerli') {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: "0x5" }],
    });
    network_switched = true;
  };

  if (network_switched) {
    network_name = network_name_input;
    network_switched = false;
    window.location.reload();
  }
};


export async function promptAddNetwork(network_name_input) {
  //if (!network_name_input || !network_dict.includes(network_name_input)) {
  //  network_name_input = default_network;
  //};
  const network_params = network_dict[network_name_input]['add_network'];
  // if (network_name_input === 'polygon' || network_name_input === 'matic') {
  window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: [network_params]
  });
  // };
  network_name = network_name_input;
  return network_name;
};


export async function addNetwork(network_name_input) {
  console.log('\nSmartContractOperator >>> RUNNING addNetwork()');
  console.log("network_name_input:", network_name_input);
  const network_added = await checkNetworkAdded(network_name_input);
  if (!network_added) {
    await promptAddNetwork(network_name_input);
  };
  if (network_name !== network_name_input) {
    await promptNetworkSwitch(network_name_input);
  };
  console.log('Network switched to', network_name);
};


// changed from "export default" to just "export" because SmartContractOperator fails to export the function with "default" present
export async function connectWallet(network_name_input) {
  console.log('\nSmartContractOperator >>> RUNNING connectWallet()');
  console.log("network_name_input:", network_name_input);
  //contract_name = contract_name_input;
  provider = await setProvider();
  signer = await setSigner(provider);
  user_address = await setUserAddress(signer);
  user_balance = await setUserBalance(signer);
  if ('_network' in provider) {
    network_name = provider['_network']['name'];
    network_ID = provider['_network']['chainId'];
    console.log('Network Name & Chain ID:', network_name, network_ID);
    if (!network_dict[network_name]) {
      network_name = network_dict[network_ID]['name'];
    };
    console.log('Network Name: ', network_name);
  };
  if (network_name_input && (network_name !== network_name_input)) {
    console.log('PROMPTED Network Switch to: ', network_name_input);
    await addNetwork(network_name_input);
  };
  //const contract = new ethers.Contract(contract_address_dict[network_name], json_ABI_list[network_name], provider);
  //user_token_ID = await setUserTokenID(contract_name, user_address);
  //user_metadata = await setUserMetadata(contract_name, user_address);
  //user_avatar_URI = await setUserAvatarURI(user_metadata);
  return({'address': user_address,
          'network_name': network_name,
          //'token_ID': user_token_ID,
          'balance': user_balance});
          //'metadata': user_metadata,
          //'avatar_URI': user_avatar_URI,
          //'contract_name': contract_name});
};














//--------------------------------------------------------------------------------------------------
//# Smart Contract Functions


async function parseABIfunctions(ABI) {
  console.log('\nSmartContractOperator >>> RUNNING parseABIfunctions()');

  const functions = {};

  // Iterate through each ABI entry
  for (const entry of ABI) {
      if (entry.type === 'function') {
          const inputs = entry.inputs.map(input => input.name); // Extract input parameter names
          functions[entry.name] = inputs; // Store function name and input parameter names
      }
  }

  return(functions);
};


async function extractABI(JSON_file_path) {
  console.log('\nSmartContractOperator >>> RUNNING extractABI()');
  console.log('JSON_file_path:', JSON_file_path);
  try {
      // Read the JSON file

  /////THIS LINE GIVES AN ERROR!
      const JSON_data = fs.readFileSync(JSON_file_path, 'utf8');
      
      // Parse the JSON data
      const contract_data = JSON.parse(JSON_data);

      // Extract and return the ABI
      const ABI = contract_data.abi;
      console.log('ABI:', ABI);
      return ABI;
  } catch (error) {
      console.error('Error extracting ABI:', error);
      return null;
  };
};


async function getABI(contract_name_input) {
  // const JSON_file_path = contract_dict[contract_name_input]['ABI_location'];
  const JSON_file_path = '../../../artifacts/contracts/' + contract_name_input + '.sol';
  const ABI = await extractABI(JSON_file_path);
  return(ABI); 
};


export async function getFunctionParams(contract_name_input, function_name_input) {
  const function_params = contract_dict[contract_name_input]['Functions'][function_name_input];
  return(function_params);
};


export async function getContractFunctions(contract_name_input) {
  const ABI = getABI(contract_name_input);
  const functions = parseABIfunctions(ABI);
  return(functions);
}


//Should take contract address
export async function runContractFunction(contract_name_input, function_name, function_params=[], button_text_object=false ) {
  console.log('Contract Name: ', contract_name_input);
  console.log('Function Name: ', function_name);
  console.log('Function Params: ', function_params);
  console.log('Mint Button: ', button_text_object);

  // Assigns the preset contract address if it exists
  // If not, `contract_name_input` is assumed to be the address itself
  var contract_address;
  if (contract_dict[contract_name_input]) {
    contract_address = contract_dict[contract_name_input]['Address'][network_name];
    contract_name = contract_name_input;
  } else {
    contract_address = contract_name_input;
    contract_name = '';
  };

  console.log('Contract Address:', contract_address);
  
  if (!signer) {
    signer = await setSigner();
  };

  console.log('address', signer._address);

  // const ABI = await getABI(contract_name_input);
  // const iface = new Interface(ABI);
  const iface = new Interface(contract_dict[contract_name_input]['ABI']);
  iface.format(FormatTypes.full);
  const contract = new ethers.Contract(contract_address, iface, signer);
  const function_input_list = await getFunctionParams(contract_name_input, function_name);

  console.log('function_input_list:', function_input_list);
  
  var transaction_info;
  
  if (Array.isArray(function_input_list)) {
    console.log('SmartContractOperator: Using the NEW way!');
    if (function_name === 'mint' || function_name === 'mintBatch') {
      const mint_price_raw = await contract.getMyMintPrice();
      console.log('Mint Price RAW:', mint_price_raw);
      const mint_price_fixed = mint_price_raw / 1000000000000000000;
      console.log('Mint Price FIXED:', mint_price_fixed);
      const mint_price_rounding_amount = await getRounding(mint_price_fixed);
      console.log('Mint Price ROUNDING AMOUNT:', mint_price_rounding_amount);
      var total_mint_price = mint_price_fixed;
      if (function_name === 'mintBatch') {
        total_mint_price = mint_price_fixed * function_params[0]; // multiply by the 'amount' input
      };
      total_mint_price = total_mint_price.toFixed(mint_price_rounding_amount);
      console.log('TOTAL Mint Price:', total_mint_price);
      transaction_info = await contract[function_name](...function_params, { value: ethers.utils.parseUnits(total_mint_price.toString(), "ether") });
      user_minted_NFT = true;
    } else {
      transaction_info = await contract[function_name](...function_params);  
    }
  } else {
    if (function_name === 'mint') {
      if (contract_name_input === 'MelioraComicV1') {
        transaction_info = await contract.mint({ value: ethers.utils.parseUnits(".000000000000005", "ether") });
        user_minted_NFT = true;
      } else {
        transaction_info = await contract.mint(function_params[0], { value: ethers.utils.parseUnits(".000000000000005", "ether") });
        user_minted_NFT = true;
      }
    } else if (function_name === '__mintFree') {
      transaction_info = await contract.__mintFree(function_params[0]);
      user_minted_NFT = true;
    } else if (function_name === 'contractURI') {
      transaction_info = await contract.contractURI();
    } else if (function_name === '__setContractURI') {
      transaction_info = await contract.__setContractURI(function_params[0]);
    } else if (function_name === 'getMintPrice') {
      transaction_info = await contract.getMintPrice(function_params[0]);
    } else if (function_name === '__setMintPrice') {
      transaction_info = await contract.__setMintPrice(function_params[0], function_params[1]);
    } else if (function_name === 'getMaxSupply') {
      transaction_info = await contract.getMaxSupply();
    } else if (function_name === '__setMaxSupply') {
      transaction_info = await contract.__setMaxSupply(function_params[0]);
    } else if (function_name === 'tokenURI') {
      transaction_info = await contract.tokenURI(function_params[0]);
    } else if (function_name === '__setTokenURI') {
      transaction_info = await contract.__setTokenURI(function_params[0], function_params[1]);
    } else if (function_name === 'getPrimaryTokenID') {
      transaction_info = await contract.getPrimaryTokenID(function_params[0]);
    } else if (function_name === 'setPrimaryTokenID') {
      transaction_info = await contract.setPrimaryTokenID(function_params[0]);
    } else if (function_name === 'getPrimaryTokenURI') {
      transaction_info = await contract.getPrimaryTokenURI(function_params[0]);
    } else if (function_name === 'getPrimaryHolderByIndex') {
      transaction_info = await contract.getPrimaryHolderByIndex(function_params[0]);
    } else if (function_name === 'getPrimaryHolderCount') {
      transaction_info = await contract.getPrimaryHolderCount();
    } else if (function_name === 'getAllPrimaryHolders') {
      transaction_info = await contract.getAllPrimaryHolders();
    } else if (function_name === '__createTask') {
      transaction_info = await contract.__createTask(function_params[0], function_params[1], function_params[2]);
    } else if (function_name === 'getTaskHash') {
      transaction_info = await contract.getTaskHash(function_params[0], function_params[1]);
    } else if (function_name === 'getTask') {
      transaction_info = await contract.getTask(function_params[0], function_params[1]);
    } else if (function_name === 'getCharacter') {
      transaction_info = await contract.getCharacter(function_params[0]);
    } else if (function_name === 'completeTask') {
      transaction_info = await contract.completeTask(function_params[0], function_params[1]);
    } else if (function_name === 'completeTaskBatch') {
      transaction_info = await contract.completeTaskBatch(function_params[0], function_params[1]);
    } else if (function_name === 'setApprovalForAll') {
      transaction_info = await contract.setApprovalForAll(function_params[0], function_params[1]);
    };
  };
  console.log("Transaction info: ", transaction_info);
  
  var transaction_hash = transaction_info.hash;
  console.log("Transaction hash: ", transaction_hash);

  if (transaction_hash) {
    var transaction_receipt = await provider.getTransactionReceipt(transaction_hash);
    console.log("Immediate transaction receipt: ", transaction_receipt);

    // Button updated & code paused via while loop while awaiting contract execution
    if (button_text_object) {
      button_text_object.textContent = "Executing";
      var loop_count = 1;
      while ( !transaction_receipt ) {
        await pause(500);
        if (loop_count > 3) {
          button_text_object.textContent = "Executing";
          loop_count = 0;
        } else {
          button_text_object.insertAdjacentText('beforeEnd', '.');
        }
        transaction_receipt = await provider.getTransactionReceipt(transaction_hash);
        loop_count+=1;
      }
      console.log("Mined transaction receipt: ", transaction_receipt);

      // Button updated & code paused via while loop for duration of opensea_link_delay
      var wait_count = 0;
      while ( wait_count < (2 * opensea_link_delay) ) {
        await pause(500);
        if (loop_count > 3) {
          button_text_object.textContent = "Executing";
          loop_count = 0;
        } else {
          button_text_object.insertAdjacentText('beforeEnd', '.');
        }
        loop_count+=1;
        wait_count+=1;
      };
      button_text_object.textContent = "Executed!";
    };
  };

  

  // user_token_ID = parseInt(transaction_receipt.logs[0].topics[3], 10);

  if (function_name === 'mint' || function_name === '__mintFree') {
    console.log("Unparsed User Token ID: ", transaction_receipt.logs[0].topics[3]);

    // const events = contract.interface.parseLog(transaction_receipt.logs[0]);
    // const user_token_ID = events.args.token_ID;
  
    user_token_ID = parseInt( transaction_receipt.logs[0].topics[3], 16);
  
    console.log("Parsed Token ID:", user_token_ID)
    console.log("Transaction Info: ", transaction_info);
    return user_token_ID; 
  } else {
    console.log("Transaction Info: ", transaction_info);
    return transaction_info;
  }
  
  // console.log("User Token ID: ", user_token_ID);
  // console.log(parseInt(transaction_receipt.logs[0].topics[3], 10));

  
   
};







//Should take contract address
export async function mintNFT(contract_name_input, mint_button, params) {
  console.log('Mint Contract Name: ', contract_name_input);
  console.log('Mint Params: ', params);
  console.log('Mint Button: ', mint_button);

  // Assigns the preset contract address if it exists
  // If not, `contract_name_input` is assumed to be the address itself
  var contract_address;
  if (contract_dict[contract_name_input]) {
    contract_address = contract_dict[contract_name_input]['Address'][network_name];
  } else {
    contract_address = contract_name_input;
  };

  console.log('Contract Address:', contract_address);
  
  if (!signer) {
    signer = await setSigner();
  };
  const iface = new Interface(contract_dict[contract_name_input]['ABI']);
  iface.format(FormatTypes.full);
  const contract = new ethers.Contract(contract_address, iface, signer);
  var transactionInfo;
  

  if (params.length === 0) {
    transactionInfo = await contract.mint();
  } else if (params.length === 1) {
    transactionInfo = await contract.mint(params[0]);
  } else if (params.length === 2) {
    transactionInfo = await contract.mint(params[0], params[1]);
  } else if (params.length === 3) {
    transactionInfo = await contract.mint(params[0], params[1], params[2]);
  } else if (params.length === 4) {
    transactionInfo = await contract.mint(params[0], params[1], params[2], params[3]);
  } else {
    transactionInfo = await contract.mint(params[0], params[1], params[2], params[3], params[4]);
  };
  user_minted_NFT = true;
  console.log("Transaction info: ", transactionInfo);
  
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);

  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);

  // Button updated & code paused via while loop while awaiting contract execution
  mint_button.textContent = "Minting";
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      mint_button.textContent = "Minting";
      loop_count = 0;
    } else {
      mint_button.insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }
  console.log("Mined transaction receipt: ", transactionReceipt);

  // Button updated & code paused via while loop for duration of opensea_link_delay
  var wait_count = 0;
  while ( wait_count < (2 * opensea_link_delay) ) {
    await pause(500);
    if (loop_count > 3) {
      mint_button.textContent = "Minting";
      loop_count = 0;
    } else {
      mint_button.insertAdjacentText('beforeEnd', '.');
    }
    loop_count+=1;
    wait_count+=1;
  }
  console.log("Transaction Info: ", transactionInfo);

  user_token_ID = parseInt(transactionReceipt.logs[0].topics[3], 10);
  console.log("User Token ID: ", user_token_ID);
  console.log("Unparsed User Token ID: ", transactionReceipt.logs[0].topics[3]);
  return user_token_ID;  
}





  
  
//--------------------------------------------------------------------------------------------------
//# Optional Dev Page Functions for Testing









//--------------------------------------------------------------------------------------------------
//# Custom Smart Contract Calls
// *Update this section with your smart contract's custom function calls

export async function getUserStats(address_input) {
  if (!address_input) {
    address_input = user_address;
  };
  if (!address_input) {
    address_input = await setUserAddress();
  };
  const contract = new ethers.Contract(contract_dict['LMNTL']['Address'][network_name], contract_dict['LMNTL']['ABI'], provider);
  user_token_ID = await contract.getPrimaryTokenID(address_input);
  const user_primary_stats = await contract.getUserPrimaryStats(address_input);
  console.log('User Primary Stats: ', user_primary_stats);
  const user_stats_list = await contract.getUserCurrentStats(address_input);
  const user_stats_dict = {
    user_token_ID: user_token_ID,
    user_primary_stats: user_primary_stats,
    user_stats_list: user_stats_list
  };
  console.log('User Stats: ', user_stats_dict);
  return user_stats_dict;
}


export async function levelUp(level_up_button) {
  if (!user_metadata_URI) {
    user_metadata = await setUserMetadata();
  };
  const iface = new Interface(contract_dict['LMNTL']['ABI']);
  iface.format(FormatTypes.full);
  const contract = new ethers.Contract(contract_dict['LMNTL']['Address'][network_name], iface, signer);

  const old_metadata_base_address = user_metadata_URI.split('LMNTL')[0];
  const old_metadata_filename = 'LMNTL' + user_metadata_URI.split('LMNTL')[1];

  var new_metadata_URI;

  if (network_IPFS_dict[network_name] === 'Pinata_old') {
    new_metadata_URI = old_metadata_base_address + old_metadata_filename.substring(0, old_metadata_filename.length - 5) + "2.png";
  } else {
    new_metadata_URI = old_metadata_base_address + old_metadata_filename.substring(0, old_metadata_filename.length - 6) + "2.json";
  };
  console.log('New Metadata URI: ', new_metadata_URI);
  const transactionInfo = await contract.levelUp(user_address, new_metadata_URI);

  console.log("Transaction info: ", transactionInfo);
  var transactionHash = transactionInfo.hash;
  console.log("Transaction hash: ", transactionHash);
  var transactionReceipt = await provider.getTransactionReceipt(transactionHash);
  console.log("Immediate transaction receipt: ", transactionReceipt);
  level_up_button.textContent = "Evolving";
  var loop_count = 1;
  while ( !transactionReceipt ) {
    await pause(500);
    if (loop_count > 3) {
      level_up_button.textContent = "Evolving";
      loop_count = 0;
    } else {
      level_up_button.insertAdjacentText('beforeEnd', '.');
    }
    transactionReceipt = await provider.getTransactionReceipt(transactionHash);
    loop_count+=1;
  }

  console.log("Mined transaction receipt: ", transactionReceipt);
  console.log("Transaction Info: ", transactionInfo);

  const response = await fetch(new_metadata_URI);
  user_metadata_URI = new_metadata_URI;
  user_metadata = await response.json();
  user_avatar_URI = await setUserAvatarURI(user_metadata);
  return({'metadata': user_metadata,
          'avatar_URI': user_avatar_URI}); 
};