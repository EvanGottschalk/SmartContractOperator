import React, { useState } from 'react'

//import { ReactComponent as MobileMenu } from '../../icons/MobileMenu.svg'
//import { ReactComponent as Close } from '../../icons/Close.svg'
//import { ReactComponent as Logo } from '../../icons/AlchmLogo.svg'

import logo from '../../image/logo.png'

//import header1 from '../../image/header1.png'
//import header2 from '../../image/header2.png'

import { FormatTypes, Interface } from "@ethersproject/abi";

import './navbar.css'

import { Origin, Horoscope } from "../../../node_modules/circular-natal-horoscope-js";

import pinToIPFS from "./pin-to-ipfs.js";
import createAlchmMetadata from "./create-alchm-metadata";

import locationCSV from "./allLocationsUSfirst.csv";

const { ethers } = require("ethers");

const useMyInfo = false;

const openSeaLinkDelay = 8;

let address, signer, provider;
var mintButtonActive = false;

//E~ Update these variables manually according to the smart contract address of your NFT collection,
//   and the URI of the metadata to be minted as an NFT
let contractAddress = '0xA055CD98B0b4f09bb96ba43BE64963BdF11783e1';
//let metadataURI = 'https://gateway.pinata.cloud/ipfs/QmeDnUfLX7WKufRgc2b6GMb9uVRV5DEFwd9Lpr1QwjLfPc';
let network = 'Goerli';


var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile = true;
};

const Navbar = () => {

const [isConnected, toggleConnected] = useState(0);
const [isMinted, toggleMinted] = useState(0);

const jsonAbi = `[
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
        "name": "recipient",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintNFT",
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
        "name": "_data",
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
  }
]`;

const iface = new Interface(jsonAbi);
iface.format(FormatTypes.full);

//E~
function pause(time) {
  return new Promise(resolve => setTimeout(resolve, time));
}


function setAddress(ethaddy) {
    address = ethaddy;
    if (address != null) {  toggleConnected ( !isConnected ); }
    console.log("Account:", address);
    //alert("Connected: " + address);
}

function handleButtonClick() {
  var validityMessage = activateMintButton();
  if (mintButtonActive) {
    if (!isConnected) {connectWallet()}
      else {mintNFT();
    }
  } else {
    document.getElementById("validityMessage").textContent = validityMessage;
    document.getElementById("validityMessage").style.color = '#ff6262';
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
}

function activateMintButton() {
  var validityMessage = 'Birth info confirmed! Ready to mint!';
  var mintButton = document.getElementById("mintButton");
  // Checks birth day
  const birthDay = Number(document.getElementById("birthDayEntry").value);
  if (Number(document.getElementById("birthYearEntry").value) >= 0 &&
    document.getElementById("birthYearEntry").value !== '' &&
    birthDay > 0 &&
    document.getElementById("birthDayEntry").value !== '' &&
    document.getElementById("birthMonthSelect").value !== 'Month' &&
    ((document.getElementById("birthMonthSelect").value === '0' && birthDay <= 31) ||
    (document.getElementById("birthMonthSelect").value === '1' && birthDay <= 29) ||
    (document.getElementById("birthMonthSelect").value === '2' && birthDay <= 31) ||
    (document.getElementById("birthMonthSelect").value === '3' && birthDay <= 30) ||
    (document.getElementById("birthMonthSelect").value === '4' && birthDay <= 31) ||
    (document.getElementById("birthMonthSelect").value === '5' && birthDay <= 30) ||
    (document.getElementById("birthMonthSelect").value === '6' && birthDay <= 31) ||
    (document.getElementById("birthMonthSelect").value === '7' && birthDay <= 31) ||
    (document.getElementById("birthMonthSelect").value === '8' && birthDay <= 30) ||
    (document.getElementById("birthMonthSelect").value === '9' && birthDay <= 31) ||
    (document.getElementById("birthMonthSelect").value === '10' && birthDay <= 30) ||
    (document.getElementById("birthMonthSelect").value === '11' && birthDay <= 31)))
  {
    // Checks birth time
    console.log("Birthday is valid...");
    if (document.getElementById("validityMessage").textContent === "Please choose a valid birth day.") {
      document.getElementById("validityMessage").textContent = '';
    }
    if (document.getElementById("birthTimeUnknown").checked ||
      (Number(document.getElementById("birthMinuteEntry").value) <= 60 &&
      Number(document.getElementById("birthMinuteEntry").value) >= 0 &&
      document.getElementById("birthMinuteEntry").value) !== '')
    {
      // Checks birth location
      console.log("Birth time is valid...");
      if (document.getElementById("validityMessage").textContent === "Please choose a valid birth time.") {
        document.getElementById("validityMessage").textContent = '';
      }
      if (fetchCoordinates()) {
        console.log("Birth location is valid!");
        if (document.getElementById("validityMessage").textContent === "Please choose a valid birth location.") {
          document.getElementById("validityMessage").textContent = '';
        }
        console.log("ENABLED mint button");
        mintButtonActive = true;
        mintButton.style.backgroundColor = '#f2ff61';
      } else {
        console.log("Birth location is NOT valid!");
        console.log("DISABLED mint button");
        validityMessage = "Please choose a valid birth location.";
        mintButtonActive = false;
        mintButton.style.backgroundColor = '#bbbbbb';
        
      }
    } else {
      console.log("Birth time is NOT valid!");
      console.log("DISABLED mint button");
      validityMessage = "Please choose a valid birth time.";
      mintButtonActive = false;
      mintButton.style.backgroundColor = '#bbbbbb';
    }
  } else {
    console.log("Birth day is NOT valid!");
    console.log("DISABLED mint button");
    validityMessage = "Please choose a valid birth day.";
    mintButtonActive = false;
    mintButton.style.backgroundColor = '#bbbbbb';
  }
  if (mintButtonActive) {
    document.getElementById("validityMessage").textContent = validityMessage;
    document.getElementById("validityMessage").style.color = '#00ff00';
  } else if (document.getElementById("validityMessage").textContent.length > 0) {
    document.getElementById("validityMessage").textContent = validityMessage;
    document.getElementById("validityMessage").style.color = '#ff6262';
  }
  return validityMessage;
}

function astrologize() {
  var origin;
  // Uses Evan's birthday automatically without input. Used for testing
  if (useMyInfo) {
    origin = new Origin({
      year: 1990,
      month: 3, // 0 = January, 11 = December!
      date: 20,
      hour: 4,
      minute: 20,
      latitude: 40.7498,
      longitude: -73.7976
    });
  } else {
    // If "Don't Know" is checked for birth time, 12:00 PM is used
    if (document.getElementById("birthTimeUnknown").value.checked) {
      birthHour = 11;
      birthMinute = 0;
    } else {
      birthHour = document.getElementById("birthHourSelect").value;
      birthMinute = document.getElementById("birthMinuteEntry").value;
      if (document.getElementById("birthAMPMSelect").value === 'PM') {
        birthHour += 12;
        if (birthHour === 24) {
          birthHour = 0;
        }
      }
    }
    // If "Don't Know" is checked for birth location, fetchCoordinates() uses the highest population city in user's time zone
    birthCoordinates = fetchCoordinates();
    origin = new Origin({
      year: document.getElementById("birthYearEntry").value,
      month: document.getElementById("birthMonthSelect").value, // 0 = January, 11 = December!
      date: document.getElementById("birthDayEntry").value,
      hour: birthHour,
      minute: birthMinute,
      latitude: birthCoordinates["Latitude"],
      longitude: birthCoordinates["Longitude"]
    });
  }
  
  
  const horoscope = new Horoscope({
    origin: new Origin(origin),
    houseSystem: "whole-sign",
    zodiac: "tropical",
    aspectPoints: ['bodies', 'points', 'angles'],
    aspectWithPoints: ['bodies', 'points', 'angles'],
    aspectTypes: ["major", "minor"],
    customOrbs: {},
    language: 'en'
  });
  console.log(horoscope.CelestialBodies['sun']['Sign']['label']);
  console.log(horoscope.CelestialBodies);
  horoscope.CelestialBodies['all'].forEach(entry =>
    console.log(entry['label'], entry['Sign']['label'], entry['House']['label']))
  return horoscope.CelestialBodies
}

async function mintNFT() {
  const nftContract = new ethers.Contract(contractAddress, iface,signer);
  const NFTmetadata = await createAlchmMetadata.createMetadata(astrologize());
  console.log("Metadata: ", NFTmetadata);
  const metadataURI = pinToIPFS.pinMetadata(NFTmetadata);
  metadataURI
  .then(metadataURI => {
    console.log("The token URI is: ", metadataURI)
    //mintNFT(metadataURI)
  })
  const transactionInfo = await nftContract.mintNFT(address, metadataURI);
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
  const tokenID = parseInt(transactionReceipt.logs[0].topics[3], 16);
  console.log("Token ID: ", tokenID);
}


//   const [Mobile, setMobile] = useState(false)
//   useEffect(() => {
//     WindowChange()
//   }, [])

//   //   const HandleMobileMenu = () => {
//   //     setMobile(!Mobile)
//   //   }

//   const WindowChange = () => {
//     if (window.innerWidth > 1050) {
//       setMobile(false)
//     }
//   }

//   window.addEventListener('resize', WindowChange)

const handleMint = () => {}
const handleAbout = () => {
  var scroll = document.getElementsByClassName('aboutAnchor')
  window.scroll({ behavior: 'smooth', top: scroll[0].offsetTop + 80 })
}
const handleRoadmap = () => {
  var scroll = document.getElementsByClassName('roadmapBC')
  window.scroll({ behavior: 'smooth', top: scroll[0].offsetTop - 40 })
}
const handleTeam = () => {
  var scroll = document.getElementsByClassName('teamAnchor')
  window.scroll({ behavior: 'smooth', top: scroll[0].offsetTop - 40 })
}
const handleFaq = () => {
  var scroll = document.getElementsByClassName('faqScroll')
  window.scroll({ behavior: 'smooth', top: scroll[0].offsetTop + 20 })
}


function handleDayChange(event) {
  console.log("Day: ", {value: event.target.value});
  activateMintButton();
}

function handleMonthChange(event) {
  console.log("Month: ", {value: event.target.value});
  activateMintButton();
}

function handleYearChange(event) {
  console.log("Year: ", {value: event.target.value});
  activateMintButton();
}

function handleTimeUnknown(event) {
  console.log("Time Unknown: ", {value: event.target.checked});
  document.getElementById("birthHourSelect").disabled = event.target.checked;
  document.getElementById("birthMinuteEntry").disabled = event.target.checked;
  document.getElementById("birthAMPMSelect").disabled = event.target.checked;
  activateMintButton();
}

function handleHourChange(event) {
  console.log("Hour: ", {value: event.target.value});
  activateMintButton();
}

function handleMinuteChange(event) {
  console.log("Minute: ", {value: event.target.value});
  activateMintButton();
}

function handleAMPMChange(event) {
  console.log("AM/PM: ", {value: event.target.value});
  activateMintButton();
}

function handleLocationUnknown(event) {
  console.log("Location Known: ", {value: event.target.checked});
  document.getElementById("birthCountrySelect").disabled = event.target.checked;
  if (countryArray_Lowercase.includes(document.getElementById("birthCountrySelect").value.toLowerCase())) {
    //if (countryArray.includes(event.target.value)) {
    //if (event.target.value === 'United States') {
    if (document.getElementById("birthCountrySelect").value.toLowerCase() === 'united states') {
      document.getElementById("birthStateSelect").disabled = event.target.checked;
    } else {
      document.getElementById("birthStateSelect").disabled = true;
      document.getElementById("birthCitySelect").disabled = false;
    }
  } else {
    document.getElementById("birthStateSelect").disabled = true;
    document.getElementById("birthCitySelect").disabled = true;
  }
  if (stateArray_Lowercase.includes(document.getElementById("birthStateSelect").value.toLowerCase())) {
  //if (stateArray.includes(event.target.value)) {
    document.getElementById("birthCitySelect").disabled = event.target.checked;
    document.getElementById("cityList").innerHTML = "";
  } else {
    document.getElementById("birthCitySelect").disabled = true;
  }
  fetchCoordinates();
  activateMintButton();
}

function handleCountryChange(event) {
  console.log("Country: ", {value: event.target.value});
  if (countryArray_Lowercase.length === 0) {
    fetch(locationCSV)
      .then(response => response.text())
      .then(text => locationCSVtoArray(text));
  }
  if (countryArray_Lowercase.includes(event.target.value.toLowerCase())) {
  //if (countryArray.includes(event.target.value)) {
    //if (event.target.value === 'United States') {
    if (event.target.value.toLowerCase() === 'united states') {
      document.getElementById("birthStateSelect").disabled = false;
    } else {
      document.getElementById("birthStateSelect").disabled = true;
      document.getElementById("birthCitySelect").disabled = false;
      var cityList = document.getElementById("cityList");
      cityList.innerHTML = "";
      countryCityDict[event.target.value.toLowerCase()].forEach(item => {
        let option = document.createElement('option');
        option.value = item;   
        cityList.appendChild(option);
      });
    }
  } else {
    document.getElementById("birthStateSelect").disabled = true;
    document.getElementById("birthCitySelect").disabled = true;
  }
  activateMintButton();
}

function handleStateChange(event) {
  console.log("State: ", {value: event.target.value});
  if (stateArray_Lowercase.includes(event.target.value.toLowerCase())) {
  //if (stateArray.includes(event.target.value)) {
    var cityList = document.getElementById("cityList");
    document.getElementById("birthCitySelect").disabled = false;
    cityList.innerHTML = "";
    stateCityDict[event.target.value.toLowerCase()].forEach(item => {
      let option = document.createElement('option');
      option.value = item;   
      cityList.appendChild(option);
    });
  } else {
    document.getElementById("birthCitySelect").disabled = true;
  }
  activateMintButton();
}

function handleCityChange(event) {
  console.log("City: ", {value: event.target.value});
  if (cityArray_ALL_Lowercase.includes(event.target.value.toLowerCase())) {
  //if (cityArray_ALL.includes(event.target.value)) {
    fetchCoordinates();
  }
  activateMintButton();
}

function fetchCoordinates() {
  // If "Don't Know" is checked for birth location, the highest population city in the user's current time zone is used
  if (document.getElementById("birthLocationUnknown").checked) {
    const dateObject = new Date();
    var UTCoffset = dateObject.toString().split('GMT')[1].split(' (')[0];
    console.log('User UTC Offset: ', UTCoffset);
    if (!(UTCoffset in populousLocationsByTimeZone)) {
      UTCoffset = UTCoffset[0] + UTCoffset[1] + UTCoffset[2] + '00';
    }
    birthCountry = populousLocationsByTimeZone[UTCoffset]['Country'];
    birthState = populousLocationsByTimeZone[UTCoffset]['State'];
    birthCity = populousLocationsByTimeZone[UTCoffset]['City'];
    console.log('User Location Guess: ', birthCountry + ', ' + birthState + ', ' + birthCity);
  } else {
    birthCountry = document.getElementById("birthCountrySelect").value;
    birthState = document.getElementById("birthStateSelect").value;
    birthCity = document.getElementById("birthCitySelect").value;
  }
  // Pulls the latitude and longitude from the coordinateDict_Lowercase dictionary
  if (birthCountry.toLowerCase() === 'united states') {
    birthCoordinates = coordinateDict_Lowercase[birthCountry.toLowerCase() + ', ' + birthState.toLowerCase() + ', ' + birthCity.toLowerCase()];
  } else {
    birthCoordinates = coordinateDict_Lowercase[birthCountry.toLowerCase() + ', ' + birthCity.toLowerCase()];
  }
  console.log(birthCoordinates);
  return birthCoordinates;
}

const populousLocationsByTimeZone = {'-1100': {'Abbreviation': 'SST',
                                               'Country': 'Pago Pago',
                                               'State': '',
                                               'City': 'American Samoa'},
                                     '-1000': {'Abbreviation': 'HST',
                                               'Country': 'United States',
                                               'State': 'Hawaii',
                                               'City': 'Honolulu'}, 
                                     '-0900': {'Abbreviation': 'AKST',
                                               'Country': 'United States',
                                               'State': 'Alaska',
                                               'City': 'Anchorage'},
                                     '-0800': {'Abbreviation': 'PST',
                                               'Country': 'United States',
                                               'State': 'California',
                                               'City': 'Los Angeles'}, 
                                     '-0700': {'Abbreviation': 'MST',
                                               'Country': 'United States',
                                               'State': 'Arizona',
                                               'City': 'Phoenix'},
                                     '-0600': {'Abbreviation': 'CST',
                                               'Country': 'United States',
                                               'State': 'Illinois',
                                               'City': 'Chicago'}, 
                                     '-0500': {'Abbreviation': 'EST',
                                               'Country': 'United States',
                                               'State': 'New York',
                                               'City': 'New York'},
                                     '-0400': {'Abbreviation': 'AST',
                                               'Country': 'Brazil',
                                               'State': '',
                                               'City': 'Manaus'}, 
                                     '-0300': {'Abbreviation': 'NST',
                                               'Country': 'Canada',
                                               'State': '',
                                               'City': "St. John's"},
                                     '-0200': {'Abbreviation': 'BRST',
                                               'Country': 'Brazil',
                                               'State': '',
                                               'City': 'Sao Paulo'}, 
                                     '-0100': {'Abbreviation': 'EGT',
                                               'Country': 'Cabo Verde',
                                               'State': '',
                                               'City': 'Praia'},
                                     '+0000': {'Abbreviation': 'UTC',
                                               'Country': 'United Kingdom',
                                               'State': '',
                                               'City': 'London'}, 
                                     '+0100': {'Abbreviation': 'WAT',
                                               'Country': 'Nigeria',
                                               'State': '',
                                               'City': 'Lagos'},
                                     '+0200': {'Abbreviation': 'CAT',
                                               'Country': 'Egypt',
                                               'State': '',
                                               'City': 'Cairo'}, 
                                     '+0300': {'Abbreviation': 'MSK',
                                               'Country': 'Russia',
                                               'State': '',
                                               'City': 'Moscow'},
                                     '+0400': {'Abbreviation': 'AZT',
                                               'Country': 'Azerbaijan',
                                               'State': '',
                                               'City': 'Baku'}, 
                                     '+0500': {'Abbreviation': 'PKT',
                                               'Country': 'Pakistan',
                                               'State': '',
                                               'City': 'Karachi'},
                                     '+0600': {'Abbreviation': 'BST',
                                               'Country': 'Bangladesh',
                                               'State': '',
                                               'City': 'Dhaka'}, 
                                     '+0700': {'Abbreviation': 'WIB',
                                               'Country': 'Indonesia',
                                               'State': '',
                                               'City': 'Jakarta'},
                                     '+0800': {'Abbreviation': 'HKT',
                                               'Country': 'China',
                                               'State': '',
                                               'City': 'Shanghai'}, 
                                     '+0900': {'Abbreviation': 'JST',
                                               'Country': 'Japan',
                                               'State': '',
                                               'City': 'Tokyo'},
                                     '+1000': {'Abbreviation': 'AET',
                                               'Country': 'Australia',
                                               'State': '',
                                               'City': 'Brisbane'}, 
                                     '+1100': {'Abbreviation': 'AEDT',
                                               'Country': 'Australia',
                                               'State': '',
                                               'City': 'Sydney'},
                                     '+1200': {'Abbreviation': 'NZST',
                                               'Country': 'New Zealand',
                                               'State': '',
                                               'City': 'Auckland'}};

var locationsArray;
var countryArray = [];
var countryArray_Lowercase = [];
var countryCityDict = {};
var stateArray = [];
var stateArray_Lowercase = [];
var stateCityDict = {};
var cityArray = [];
var cityArray_ALL = [];
var cityArray_ALL_Lowercase = [];
var coordinateDict = {};
var coordinateDict_Lowercase = {};

var birthHour, birthMinute, birthCountry, birthState, birthCity;
var birthCoordinates;

fetch(locationCSV)
  .then(response => response.text())
  .then(text => locationCSVtoArray(text));

function locationCSVtoArray(str, delimiter = ",") {
  var countryList = document.getElementById('countryList');
  var stateList = document.getElementById('stateList');
  var cityList = document.getElementById('cityList');
  if (countryList.options.length === 0 || countryArray.length === 0) {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    var currentCountry = '';
    var currentState = '';
    locationsArray = rows.map(function (row) {
      const values = row.split(delimiter);
      const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
      }, {}); 
      if (currentCountry !== el['Country']) {
        if (currentCountry !== '') {
          countryArray.push(currentCountry);
          countryArray_Lowercase.push(currentCountry.toLowerCase());
        }
        if (currentCountry !== 'United States' && currentCountry !== '') {
          countryCityDict[currentCountry.toLowerCase()] = cityArray;
        } else if (currentCountry === 'United States') {
          stateArray.push(currentState);
          stateArray_Lowercase.push(currentState.toLowerCase());
          stateCityDict[currentState.toLowerCase()] = cityArray;
        }
        currentCountry = el['Country'];
        cityArray = [];
      }
      if (currentCountry === 'United States') {
        if (currentState !== el['State']) {
          if (currentState !== '') {
            stateArray.push(currentState);
            stateArray_Lowercase.push(currentState.toLowerCase());
            stateCityDict[currentState.toLowerCase()] = cityArray;
          }
          cityArray = [];
          currentState = el['State'];
        }
      }
      if (currentCountry !== '') {
        if (currentCountry === 'United States') {
          coordinateDict[currentCountry + ', ' + currentState + ', ' + el['City']] = {'Latitude': el['Latitude'], 
                                                                                      'Longitude': el['Longitude']}
          coordinateDict_Lowercase[currentCountry.toLowerCase() + ', ' + currentState.toLowerCase() + ', ' + el['City'].toLowerCase()] = {'Latitude': el['Latitude'], 
                                                                                                                                          'Longitude': el['Longitude']}                                                                                        
        } else {
          coordinateDict[currentCountry + ', ' + el['City']] = {'Latitude': el['Latitude'], 
                                                                'Longitude': el['Longitude']}
          coordinateDict_Lowercase[currentCountry.toLowerCase() + ', ' + el['City'].toLowerCase()] = {'Latitude': el['Latitude'], 
                                                                                                      'Longitude': el['Longitude']}
        }
      }
      if (el['City'] !== undefined) {
        cityArray.push(el['City']);
        cityArray_ALL.push(el['City']);
        cityArray_ALL_Lowercase.push(el['City'].toLowerCase());
      }
      return el;
    });
    if (countryList.options.length === 0) {
      countryArray.forEach(item => {
        let option = document.createElement('option');
        option.value = item;   
        countryList.appendChild(option);
      });
    }
    if (stateList.options.length === 0) {
      stateArray.forEach(item => {
        let option = document.createElement('option');
        option.value = item;   
        stateList.appendChild(option);
      });
    }
    if (cityList.options.length === 0) {
      cityArray_ALL.forEach(item => {
        let option = document.createElement('option');
        option.value = item;   
        cityList.appendChild(option);
      });
    }
    console.log("Country Array Length: ", countryArray.length);
    return locationsArray;
  }
}

return (
  <div className='navbar'>
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
    <div className='navbarContainer SlideRightAnimation'>
      <div className='navbarLeft'></div>
      <div className='navbarCenter'>
      <div className='navbarCenterBottom'>
          <div className='navbarCenterItem' onClick={handleMint}>
            <div className='navbarButton1'>
              Mint
            </div>
          </div>
          <div className='navbarCenterItem' onClick={handleAbout}>
            <div className='navbarButton2'>
              About Alchm
            </div>
          </div>
          <div className='navbarCenterItem' onClick={handleRoadmap}>
            <div className='navbarButton3'>
              Roadmap
            </div>
          </div>
          <div className='navbarCenterItem' onClick={handleTeam}>
            <div className='navbarButton4'>
              Team
            </div>
          </div>
          <div className='navbarCenterItem' onClick={handleFaq}>
            <div className='navbarButton5'>
              FAQ
            </div>
          </div>
        </div>
        <div className='navbarLogo'>
          <img src={logo} alt='' className='navbarBoxImage' />
        </div>
      </div>
      <div className='navbarRight'>
        <div className='navbarBox'>
          <div className='navbarBoxTitle'>
          </div>
          <div id="walletButton" className='navbarWalletButton' onClick={handleButtonClick}>{(isConnected) ? 'WALLET CONNECTED' : 'CONNECT WALLET'}</div>
      </div>
      </div>
    </div>

    <div className='navbarContainer SlideRightAnimation'>
      {/*<div className='navbarLeft'>
        <img src={header1} alt='' className='navbarBoxImage' />
      </div>*/}
      <div className='navbarCenter'>
        <div className='navbarBox'>
          <div className='navbarBoxTitle'>
            <span className='textHighlight'>Alchm</span>
          </div>
          <div className='navbarBoxSubTitle'>Astrology NFTs unique to you.<br></br>Own Your Alchemy.</div>
          <div className='birthInfoForm' id='birthInfoForm'>
            <p className='birthInfoTitle' id='birthInfoTitle'>Mint Your Alchm Avatar</p>
            <p className='birthInfoSubtitle' id='birthInfoSubtitle'>Enter your birth information below to<br></br>generate your custom Alchm NFT.</p>
            <div className='birthdayInputContainer' id='birthdayInputContainer'>
              <p className='birthdayTitle' id='birthdayTitle'>Birthday</p>                  
                <select className='birthMonthSelect' id='birthMonthSelect' onChange={handleMonthChange}>
                  <option value="selectMonth">Month</option>
                  <option value="0">January</option>
                  <option value="1">February</option>
                  <option value="2">March</option>
                  <option value="3">April</option>
                  <option value="4">May</option>
                  <option value="5">June</option>
                  <option value="6">July</option>
                  <option value="7">August</option>
                  <option value="8">September</option>
                  <option value="9">October</option>
                  <option value="10">November</option>
                  <option value="11">December</option>
                </select>
                <input className='birthDayEntry' id='birthDayEntry' placeholder="Day" type="number" onChange={handleDayChange} required min="1" max="31" minLength="1" maxLength="2"/>
                <input className='birthYearEntry' id='birthYearEntry' placeholder="Year" type="number" onChange={handleYearChange} required min="0" max="2022" minLength="1" maxLength="4"/>
            </div>
            <div className='birthTimeInputContainer' id='birthTimeInputContainer'>
              <span className='birthTimeTitle' id='birthTimeTitle'>Birth Time</span>
              <span className='timeGuessText' id='timeGuessText'>(you can guess!)</span>
              <br></br>
                <input className="birthTimeUnknown" id="birthTimeUnknown" type="checkbox" onChange={handleTimeUnknown} />
                  <label className="timeUnknownLabel" id="timeUnknownLabel">Don't Know</label>
                <br></br>
                <select className='birthHourSelect' id='birthHourSelect' onChange={handleHourChange}>
                  <option value="12">12</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                </select>
                <span className='colon' id='colon'>:</span>
                <input className='birthMinuteEntry' id='birthMinuteEntry' placeholder="00" type="number" onChange={handleMinuteChange} required min="0" max="59" minLength="1" maxLength="2"/>
                <select className='birthAMPMSelect' id='birthAMPMSelect' onChange={handleAMPMChange}>
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
            </div>
            <div className='birthLocationInputContainer' id='birthLocationInputContainer'>
              <span className='birthLocationTitle' id='birthLocationTitle'>Birth Location</span>
              <span className='locationGuessText' id='locationGuessText'>(you can guess!)</span>
              <br></br>
                <input className="birthLocationUnknown" id="birthLocationUnknown" type="checkbox" onChange={handleLocationUnknown} />
                  <label className="locationUnknownLabel" id="locationUnknownLabel">Don't Know</label>
                <br></br>
                <input placeholder="Country" list="countryList" className='birthCountrySelect' id='birthCountrySelect' onChange={handleCountryChange}/>
                  <datalist id="countryList"></datalist>
                <input placeholder="State" list="stateList" disabled="{true}" className='birthStateSelect' id='birthStateSelect' onChange={handleStateChange}/>
                  <datalist id="stateList"></datalist>
                <input placeholder="City" list="cityList" disabled="{true}" className='birthCitySelect' id='birthCitySelect' onChange={handleCityChange}/>
                  <datalist id="cityList"></datalist>
              <input className="submitButton" id="submitButton" type="submit" value="Submit" onClick={astrologize}/>
            </div>
            <span className="validityMessage" id="validityMessage"/>
          </div>
          <div id="mintButton" className='mintButton' onClick={handleButtonClick}>{(isConnected) ? 'MINT NOW' : 'CONNECT WALLET'}</div>
        </div>
      </div>
      {/*<div className='navbarRight'>
        <img src={header2} alt='' className='navbarBoxImage' />
      </div>*/}
    </div>
  </div>
)
}



//////////
// Origin
//////////
// This class automatically derives the local timezone from latitude/longitude coordinates
// and calculates UTC time with respect to timezone and historical daylight savings time.
// Only works for C.E. date (> 0).
/////////
// * int year: value >= 0 C.E.
// * int month: (0 = january ...11 = december)
// * int date: (1...31)
// * int hours = local time - hours value (0...23)
// * int minute = local time - minute value (0...59)
// * float latitude = latitude in decimal format (-90.00...90.00)
// * float longitude = longitude in decimal format (-180.00...180.00)

// December 1st, 2020 - 430pm

export default Navbar
