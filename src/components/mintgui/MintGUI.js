//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import { connectWallet } from '../../scripts/SmartContractOperator';
import {mintNFT, getMetadataURI} from '../../scripts/SmartContractOperator';

import fireLMNTL from '../../image/LMNTLfire1.png'
import waterLMNTL from '../../image/LMNTLwater1.png'
import earthLMNTL from '../../image/LMNTLearth1.png'
import airLMNTL from '../../image/LMNTLair1.png'
import mintButtonBottomImage from '../../image/button_4x1.png'

import './mintgui.css'








//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;

//NFZ Variables

var element_selected = false;
const elements_dict = {'Fire': 0,
                       'Water': 1,
                       'Air': 2,
                       'Earth': 3};

//Network and IPFS Variables

const network_IPFS_dict = {'mainnet': 'Pinata',
                           'goerli': 'Pinata',
                           'hyperspace': 'Filecoin'};

const IPFS_prefixes = {
  Pinata: 'https://gateway.pinata.cloud/ipfs/',
  Infura: '',
  Filecoin: 'https://ipfs.io/ipfs/'
}

const folder_URIs = {
  Filecoin: '',
  Pinata: 'QmPF4nrDbTnGk2UWduZDw2FCHZcF6HJicYDdsDAkEqJgH7'};


const image_URIs = {
  Filecoin: {'Fire': {1:'bafybeid2oy2tbsig674eh7n4kp4gqribvpr6ajodxokfhyzftl3il7troy/LMNTLfire1.png', 
                      2:'bafybeiaejbgk6zlz43r4fgubbxv5m3nveb23wt2mtywwqhaoj627vpf7xi/LMNTLfire2.png'},
              'Water': {1:'bafybeihrxhmnywfxxv6jfe2adfbe22m4r56dfkpgksdn2fdbkdardxcjhu/LMNTLwater1.png',
                        2:'bafybeidmkzry7ycmrii5iaibbycocptpbm5x6xo7m5y3yvln3qzdw53xwi/LMNTLwater2.png'},
              'Air':{1:'bafybeifxei46fbqxdcriqls6bb4bkvehqhs7ibbsx62mena3fisf73tk3a/LMNTLair1.png',
                      2:'bafybeihp5xj3ynypjsl2si2ve47bs4uydm6tvyxvljnbllyrobxom67hxa/LMNTLair2.png'},
              'Earth': {1:'bafybeibh7cukho5d2i7gjtuophcw455wnzk5rvy5cp7dwva74izhwst46a/LMNTLearth1.png',
                        2:'bafybeicnog62bhxyinwq6f43pkalkr26ahcj3fjpl3nizg5deaaz7cruxm/LMNTLearth2.png'}},
  Pinata: {'Fire': {1:'/LMNTLfire1.png', 
                    2:'/LMNTLfire2.png'},
            'Water': {1:'/LMNTLwater1.png',
                      2:'/LMNTLwater2.png'},
            'Air':{1:'/LMNTLair1.png',
                    2:'/LMNTLair2.png'},
            'Earth': {1:'/LMNTLearth1.png',
                      2:'/LMNTLearth2.png'}}};




//AppStart
const MintGUI = () => {

const [user_minted_NFT, toggleMinted] = useState(0);


let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);
let { contract_name, setContractName_Context } = useContext(SmartContractContext);








//--------------------------------------------------------------------------------------------------
//# Functions

if (connect_on_load && !user_address) {
  handleMintClick();
}


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function pause(time) {
  const seconds = time/1000;
  console.log('PAUSE Start: ' + seconds.toString() + ' seconds');
  return new Promise(resolve => setTimeout(resolve, time));
};


function handleLMNTLClick(event) {
  document.getElementById('Fire').style.border = 'none';
  document.getElementById('Water').style.border = 'none';
  document.getElementById('Earth').style.border = 'none';
  document.getElementById('Air').style.border = 'none';
  element_selected = event.target['alt'];
  var clickedButton = document.getElementById(element_selected);
  clickedButton.style.border = 'solid';
  clickedButton.style.color = 'var(--color-nfzorange)';
  clickedButton.style.borderWidth = '18px';
  document.getElementById('mintButtonBottomText').textContent = 'Mint ' + element_selected;
}


async function handleMintClick(event) {
  if (!user_minted_NFT) {
    if (!user_address) {
      const user_wallet_info = await connectWallet('LMNTL', 'goerli');
      user_address = user_wallet_info['address'];
      await setAddress_Context(user_address);
      user_token_ID = user_wallet_info['token_ID'];
      await setTokenID_Context(user_token_ID);
      user_balance = user_wallet_info['balance'];
      await setBalance_Context(user_balance);
      user_metadata = user_wallet_info['metadata'];
      await setMetadata_Context(user_metadata);
      user_avatar_URI = user_wallet_info['avatar_URI'];
      await setAvatarURI_Context(user_avatar_URI);
      contract_name = user_wallet_info['contract_name'];
    await setContractName_Context(contract_name);
    } else if (element_selected) {
      const mint_params = await generateMintParams(element_selected);
      const mint_button_text = document.getElementById("mintButtonBottomText");
      user_token_ID = await mintNFT('LMNTL', mint_button_text, mint_params);
      await setTokenID_Context(user_token_ID);
      toggleMinted( !user_minted_NFT );
      mint_button_text.textContent = "View LMNTL";
      //mint_button.href = window.location['origin'] + '/avatar';
    }
  } else {
    window.location.href = window.location['origin'] + '/avatar';
  }
}


async function generateMintParams(element_selected) {
  var mint_params = [];

  const element_ID = elements_dict[element_selected];
  mint_params.push(element_ID);

  const mint_image_URL = await getMetadataURI(element_ID);
  mint_params.push(mint_image_URL);

  console.log('Mint Params: ', mint_params);
  return mint_params;
}








//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='mintgui'>
    <div className='mintGUIBoxTitle'>
      <span className='mintGUIBoxTitle'>Pick Your Starter</span>
    </div>
    <div className='mintGUIBoxSubTitle'></div>
    <div className='mintGUIContainer SlideRightAnimation'>
      <div className='mintGUICenter'>
        <div className='mintGUIBox'>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={fireLMNTL} alt='Fire' id='Fire' className='mintButtonImage' />
          </div>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={waterLMNTL} alt='Water' id='Water' className='mintButtonImage' />
          </div>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={earthLMNTL} alt='Earth' id='Earth' className='mintButtonImage' />
          </div>
          <div className='LMNTLButton' onClick={handleLMNTLClick}>
            <img src={airLMNTL} alt='Air' id='Air' className='mintButtonImage' />
          </div>
        </div>
        <div className='mintButtonBottom' id='mintButtonBottom' onClick={handleMintClick}>
          <img className='mintButtonBottomImage' id='mintButtonBottomImage' src={mintButtonBottomImage} alt='Mint LMNTL' />
          <div id="mintButtonBottomText" className='mintButtonBottomText'>{(user_address) ? 'Select LMNTL' : 'Connect Wallet'}</div>
        </div>
      </div>
    </div>
  </div>
)
}
//AppEnd

export default MintGUI