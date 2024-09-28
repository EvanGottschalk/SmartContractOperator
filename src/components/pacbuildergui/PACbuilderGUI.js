//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import { connectWallet } from '../../scripts/SmartContractOperator';
import {mintNFT, getMetadataURI, getJSONfromIPFS} from '../../scripts/SmartContractOperator';

import fireLMNTL from '../../image/LMNTLfire1.png'
import waterLMNTL from '../../image/LMNTLwater1.png'
import earthLMNTL from '../../image/LMNTLearth1.png'
import airLMNTL from '../../image/LMNTLair1.png'
import mintButtonBottomImage from '../../image/button_4x1.png'

//import PAC_list_file from "../../pacs/pac_list.json";

import './pacbuildergui.css'

const fs = require('fs');






//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;


//NFZ Variables

var element_selected = false;
const elements_dict = {'Fire': 0,
                       'Water': 1,
                       'Air': 2,
                       'Earth': 3};


//PAC Variables

let array_of_PACs, array_of_scenes, array_of_backgrounds;
let current_PAC_dict, current_scene_dict;
let current_PAC_number = 0;
let current_scene_number = 0;
var PAC_list = [];
var scene_list = [];


//AppStart
const PACbuilderGUI = () => {

const [user_minted_NFT, toggleMinted] = useState(0);


let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);









//--------------------------------------------------------------------------------------------------
//# Functions


// On Load
document.addEventListener('DOMContentLoaded', function() {
  updateAllLists();
  if (connect_on_load && !user_address) {
    handleMintClick();
  }
});


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
      const user_wallet_info = await connectWallet('goerli');
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
    } else if (element_selected) {
      const mint_params = await generateMintParams(element_selected);
      const mint_button_text = document.getElementById("mintButtonBottomText");
      user_token_ID = await mintNFT(mint_button_text, mint_params);
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



function handleFieldChange(event) {
  console.log('[fn] handleFieldChange');
  console.log('event.target.className: ', event.target.className);
  console.log('event.target.value: ', event.target.value);
}

/*
async function fetchSceneList() {
  fs.readFile('settings.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    // Parse the JSON data
    const settings = JSON.parse(data);

    // Make changes to the settings object
    // ...

    // Convert the updated settings back to JSON
    const updatedJson = JSON.stringify(settings, null, 2);

    // Write the updated JSON to the file
    fs.writeFile('settings.json', updatedJson, 'utf8', (err) => {
      if (err) {
        console.error(err);
        return;
      }

      console.log('Settings saved successfully');
    });
  });
};
*/

/*
async function fetchFileList (folder_path) {
  var file_list = [];
  fs.readdir(folder_path, (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    files.forEach((file) => {
      console.log(file);
      file_list.push(file);
    });
  });
  return(file_list);
};*/



/*function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

const images = importAll(require.context('./images', false, /\.(png|jpe?g|svg)$/));

<img src={images['doggy.png']} />*/


async function updateAllLists() {
  await updatePAClist();
  await loadPAC();
  await updateSceneList();
};

async function updatePAClist() {
  array_of_PACs = await getJSONfromIPFS("NFT_Storage", "bafybeigmgu2k25bxwjmwxwrr2kwiwzzjpuy3mzew2yochngedqof5zgmu4/pac_list.json");
  var PAC_list_element = document.getElementById('PAClist');
  if (PAC_list_element) {
    if (PAC_list_element.options.length === 0) {
      for (let item in array_of_PACs) {
        let option = document.createElement('option');
        option.value = array_of_PACs[item]['name'];
        PAC_list.push(array_of_PACs[item]['name'])
        PAC_list_element.appendChild(option);
      };
    };
  };
};

async function updateSceneList() {
  if (!current_PAC_dict) {
    current_PAC_dict = loadPAC(current_PAC_number);
  }
  array_of_scenes = current_PAC_dict['scenes'];
  var scene_list_element = document.getElementById('sceneList');
  if (scene_list_element) {
    if (scene_list_element.options.length === 0) {
      for (let item in array_of_scenes) {
        let option = document.createElement('option');
        option.value = array_of_scenes[item]['name'];
        scene_list.push(array_of_scenes[item]['name'])
        scene_list_element.appendChild(option);
      };
    };
  };
}

async function loadPAC(PAC_number) {
  if (!PAC_number) {
    PAC_number = current_PAC_number;
  };
  current_PAC_dict = await getJSONfromIPFS("NFT_Storage", array_of_PACs[PAC_number]['URI']["NFT_Storage"]);
  current_scene_number = 0;
  await loadScene(0);
  return(current_PAC_dict);
};

async function loadScene(scene_number) {
  // Each scene is a numbered array, like pac_list and the array of scenes themselves.
  // The 0th item is the bottom-most element, and therefore is always the background
  // Items 1 through x are the text, objects and characters that appear in the scene
  // Each has its own coordinates, rules, and other parameters
  if (!scene_number) {
    scene_number = current_scene_number;
  };
  const shit = 'balls';
}




function handleSaveClick() {
  console.log('"Save" clicked');
}

function handleNewClick() {
  console.log('"New" clicked');
}










//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='pacbuilder'>
    <div className='pacbuilderBoxTitle'>
      <span className='pacbuilderBoxTitle'>Point-and-Click Builder</span>
    </div>
    <div className='pacbuilderBoxSubTitle'></div>
    <div className='pacbuilderContainer SlideRightAnimation'>
      <div className='pacbuilderCenter'>
        <div className='birthInfoForm' id='birthInfoForm'>
          <div className='birthdayInputContainer' id='birthdayInputContainer'>
            <span className='birthdayTitle' id='birthdayTitle'>Adventure: </span>                  
              <input placeholder="Select file..." list="PAClist" className='PACselect' id='PACselect' onChange={handleFieldChange}/>
                <datalist id="PAClist"></datalist>
            <span className='newButton' id='newButton' onClick={handleNewClick}>New</span>
            <span className='saveButton' id='saveButton' onClick={handleSaveClick}>Save</span>
          </div>
          <div className='birthTimeInputContainer' id='birthTimeInputContainer'>
            <span className='birthTimeTitle' id='birthTimeTitle'>Scene: </span>
              <input placeholder="Select scene..." list="sceneList" className='sceneSelect' id='sceneSelect' onChange={handleFieldChange}/>
                <datalist id="sceneList"></datalist>
            <span className='newButton' id='newButton' onClick={handleNewClick}>New</span>
          </div>
          <div className='birthLocationInputContainer' id='birthLocationInputContainer'>
            <span className='birthLocationTitle' id='birthLocationTitle'>Background: </span>
              <input placeholder="Select..." list="backgroundList" className='backgroundSelect' id='backgroundSelect' onChange={handleFieldChange}/>
                <datalist id="backgroundList"></datalist>
            <span className='newButton' id='newButton' onClick={handleNewClick}>Upload</span>
          </div>
        </div>
      </div>
      <div className='insertOptions' id='insertOptions'>
        <span className='birthLocationTitle' id='birthLocationTitle'>Character: </span>
          <input placeholder="Select..." list="characterList" className='characterSelect' id='characterSelect' onChange={handleFieldChange}/>
            <datalist id="characterList"></datalist>
        <span className='newButton' id='newButton' onClick={handleNewClick}>Upload</span>
      </div>
      <div className='pacbuilderBox'>
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
)
}
//AppEnd

export default PACbuilderGUI