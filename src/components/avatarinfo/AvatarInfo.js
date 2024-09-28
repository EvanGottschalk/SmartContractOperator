//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import axios from "axios";

import background from '../../image/background.png'

import './avatarinfo.css'

import { connectWallet } from '../../scripts/SmartContractOperator';
import {getOpenSeaLink, getUserStats, setUserTokenID, setUserMetadata, setUserAvatarURI} from '../../scripts/SmartContractOperator';







//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;

let opensea_link = '#';

let user_avatar_URL;
var user_primary_stats = [];
var user_stats = {'ID': '',
                  'Metadata URI': '',
                  'Level': '',
                  'EXP': '',
                  'Element': '',
                  'Fire': '',
                  'Water': '',
                  'Air': '',
                  'Earth': '',
                  'Charisma': '',
                  'Creativity': '',
                  'Cunning': '',
                  'Patience': ''};
var user_stats_list = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



//AppStart
const AvatarInfo = () => {

let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { network_name, setNetwork_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);
let { contract_name, setContractName_Context } = useContext(SmartContractContext);








//--------------------------------------------------------------------------------------------------
//# Functions

if (connect_on_load && !user_address) {
  handleConnectClick();
};


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function pause(time) {
  const seconds = time/1000;
  console.log('PAUSE Start: ' + seconds.toString() + ' seconds');
  return new Promise(resolve => setTimeout(resolve, time));
};


// Generates a URL that is off-IPFS for an IPFS image
//useEffect(() => {
async function setIPFSimageURL() {
  if (!user_avatar_URL) {
    try {
      if (!user_address) {
        await handleConnectClick();
      }
      const response = await axios.get(user_avatar_URI, {
        responseType: "arraybuffer",
        headers: {
          'Accept': 'text/plain'
        }
      });
      const buffer = Buffer.from(response.data, "binary");
      const base64 = buffer.toString("base64");
      const image_data_URL = "data:image/jpeg;base64," + base64;
      user_avatar_URL = image_data_URL;
      console.log('URL: ', user_avatar_URL);
    } catch (error) {
      console.error(error);
    };
  };
};
//}, []);


async function handleConnectClick() {
  if (!user_address) {
    //network_name = 'goerli';
    const user_wallet_info = await connectWallet(network_name);
    user_address = user_wallet_info['address'];
    await setAddress_Context(user_address);
    user_balance = user_wallet_info['balance'];
    await setBalance_Context(user_balance);
    network_name = user_wallet_info['network_name'];
    await setNetwork_Context(network_name);
    contract_name = 'LMNTL';
    await setContractName_Context(contract_name);
    user_token_ID = await setUserTokenID(contract_name, user_address);
    await setTokenID_Context(user_token_ID);
    user_metadata = await setUserMetadata(contract_name, user_address);
    await setMetadata_Context(user_metadata);
    user_avatar_URI = await setUserAvatarURI(user_metadata);
    await setAvatarURI_Context(user_avatar_URI);
  };
  if (user_token_ID) {
    user_stats = await updateUserStats();
    await updateConnectButton();
    const image = document.querySelector('img');
    if (!(image.complete && image.naturalHeight !== 0)) {
      console.log('Image FAILED to load from IPFS. Converting to URL.');
      await setIPFSimageURL();
    };
  };
};


async function updateConnectButton() {
  var opensea_link_element = document.getElementById('avatarInfoOpenSeaLink');
  if (user_token_ID) {
    opensea_link_element.style.boxShadow = '0 0 15px 5px #8cbaff';
    opensea_link_element.style.backgroundColor = 'var(--color-opensea)';
    opensea_link_element.textContent = 'VIEW ON OPENSEA';
    opensea_link = await getOpenSeaLink('LMNTL');
    opensea_link_element.href = opensea_link;
    opensea_link_element.target = '_blank';
  } else if (user_address) {
    opensea_link_element.style.boxShadow = '0 0 15px 5px #ffa411;';
    opensea_link_element.style.backgroundColor = '#F8700C';
    opensea_link_element.textContent = 'NO LMNTL FOUND';
  } else {
    opensea_link_element.style.boxShadow = '0 0 15px 5px #ffa411;';
    opensea_link_element.style.backgroundColor = '#F8700C';
    opensea_link_element.textContent = 'CONNECT WALLET';
  }
}


async function updateUserStats() {
  const user_stats_dict = await getUserStats();
  if (user_stats_dict) {
    console.log('user_stats_dict: ', user_stats_dict);
    user_token_ID = user_stats_dict.user_token_ID;
    setTokenID_Context(user_token_ID);
    user_primary_stats = user_stats_dict.user_primary_stats;
    user_stats_list = user_stats_dict.user_stats_list;
    
    user_stats['ID'] = parseInt(user_token_ID, 10);
    user_stats['Element'] = capitalize(user_primary_stats[0]);
    user_stats['Level'] = parseInt(user_primary_stats[1], 10);
    user_stats['EXP'] = parseInt(user_primary_stats[2], 10);
    user_stats['Metadata URI'] = capitalize(user_primary_stats[3]);
    
    user_stats['Fire'] = parseInt(user_stats_list[0], 10);
    user_stats['Water'] = parseInt(user_stats_list[1], 10);
    user_stats['Air'] = parseInt(user_stats_list[2], 10);
    user_stats['Earth'] = parseInt(user_stats_list[3], 10);
    user_stats['Charisma'] = parseInt(user_stats_list[4], 10);
    user_stats['Creativity'] = parseInt(user_stats_list[5], 10);
    user_stats['Cunning'] = parseInt(user_stats_list[6], 10);
    user_stats['Patience'] = parseInt(user_stats_list[7], 10);

    document.getElementById('IDText').textContent = 'ID: ' + user_stats['ID'];
    document.getElementById('levelText').textContent = 'Level: ' + user_stats['Level'];
    document.getElementById('EXPText').textContent = 'EXP: ' + user_stats['EXP'];
    document.getElementById('elementText').textContent = 'Element: ' + user_stats['Element'];
    document.getElementById('fireText').textContent = 'Fire: ' + user_stats['Fire'];
    document.getElementById('waterText').textContent = 'Water: ' + user_stats['Water'];
    document.getElementById('airText').textContent = 'Air: ' + user_stats['Air'];
    document.getElementById('earthText').textContent = 'Earth: ' + user_stats['Earth'];
    document.getElementById('charismaText').textContent = 'Charisma: ' + user_stats['Charisma'];
    document.getElementById('creativityText').textContent = 'Creativity: ' + user_stats['Creativity'];
    document.getElementById('cunningText').textContent = 'Cunning: ' + user_stats['Cunning'];
    document.getElementById('patienceText').textContent = 'Patience: ' + user_stats['Patience'];

    console.log('User Stats: ', user_stats);
    return user_stats;
  } else {
    console.log('Address: ', user_address);
  }
}










//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='avatarInfo'>
    <div className='avatarInfoContainer SlideRightAnimation'>
      <img id="avatarInfoBackground" className="avatarInfoBackground" src={background} alt="" />
      <div className='avatarInfoLeft'>
        <div id="avatarImage" className="avatarImage">
          <img id="userAvatar" className="userAvatar" src={user_avatar_URI} alt="LMNTL"></img>
        </div>
      </div>
      <div className='avatarInfoRight'>
        <div id="avatarInfoStats" className="avatarInfoStats">
          <div id="IDText">ID: {user_stats['ID']}</div>
          <div id="levelText">Level: {user_stats['Level']}</div>
          <div id="EXPText">EXP: {user_stats['EXP']}</div>
          <div id="elementText">Element: {user_stats['Element']}</div>
          <div id="fireText">Fire: {user_stats['Fire']}</div>
          <div id="waterText">Water: {user_stats['Water']}</div>
          <div id="airText">Air: {user_stats['Air']}</div>
          <div id="earthText">Earth: {user_stats['Earth']}</div>
          <div id="charismaText">Charisma: {user_stats['Charisma']}</div>
          <div id="creativityText">Creativity: {user_stats['Creativity']}</div>
          <div id="cunningText">Cunning: {user_stats['Cunning']}</div>
          <div id="patienceText">Patience: {user_stats['Patience']}</div>
        </div>
        <div id="avatarInfoLinkBox" className="avatarInfoLinkBox">
          <div id="avatarInfoOpenSeaButton" className="avatarInfoOpenSeaButton">
            <a 
              href={(user_address) ? opensea_link : '#'}
              id="avatarInfoOpenSeaLink"
              className='avatarInfoOpenSeaLink'
              rel="noreferrer"
              onClick={handleConnectClick}
              >{(user_address) ? 'VIEW ON OPENSEA' : 'CONNECT WALLET'}
            </a>
          </div>
        </div>
      </div>
    </div>
    
  </div>
)
}
//AppEnd

export default AvatarInfo