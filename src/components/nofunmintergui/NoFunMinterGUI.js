//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

import { connectWallet, runContractFunction, getFunctionParams } from '../../scripts/SmartContractOperator';
import {mintNFT, getOpenSeaLink, getJSONfromIPFS, setUserTokenID, setUserMetadata, setUserAvatarURI} from '../../scripts/SmartContractOperator';

import fireLMNTL from '../../image/LMNTLfire1.png'
import waterLMNTL from '../../image/LMNTLwater1.png'
import earthLMNTL from '../../image/LMNTLearth1.png'
import airLMNTL from '../../image/LMNTLair1.png'
import mintButtonBottomImage from '../../image/button_4x1.png'

//import PAC_list_file from "../../pacs/pac_list.json";

import './nofunmintergui.css'

const fs = require('fs');






//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;
let manual_contract_input = false;


//NFZ Variables

var element_selected = false;


//PAC Variables

let array_of_PACs, array_of_scenes, array_of_backgrounds;
let current_PAC_dict, current_scene_dict;
let current_PAC_number = 0;
let current_scene_number = 0;
var PAC_list = [];
var scene_list = [];


//NoFun Minter Variables

var default_input_display = true;
var metadata_input, function_name;
let opensea_link = '#';
var number_of_inputs = 1;
var number_of_signers = 0;


//AppStart
const NoFunMinterGUI = () => {

const [user_minted_NFT, toggleMinted] = useState(0);


let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { network_name, setNetwork_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);
let { contract_name, setContractName_Context } = useContext(SmartContractContext);








//--------------------------------------------------------------------------------------------------
//# Functions


// On Load
document.addEventListener('DOMContentLoaded', function() {
  updateAllLists();
  if (connect_on_load && !user_address) {
    handleConnectClick();
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

async function setUserWalletInfo() {
  // Most connect buttons have a predefined network
  //network_name = 'goerli';
  network_name = document.getElementById('networkSelect').value;
  await setNetwork_Context(network_name);
  const user_wallet_info = await connectWallet(network_name);
  user_address = user_wallet_info['address'];
  await setAddress_Context(user_address);
  user_balance = user_wallet_info['balance'];
  await setBalance_Context(user_balance);
  // Most connect buttons have a predefined contract name 
  //contract_name = 'LMNTL';
  contract_name = document.getElementById('smartContractSelect').value;
  await setContractName_Context(contract_name);
  if (contract_name === 'LMNTL' || contract_name === 'Signatures') {
    user_token_ID = await setUserTokenID(contract_name, user_address);
    await setTokenID_Context(user_token_ID);
  };
  if (user_token_ID > 0) {
    user_metadata = await setUserMetadata(contract_name, user_address);
    await setMetadata_Context(user_metadata);
    user_avatar_URI = await setUserAvatarURI(user_metadata);
    await setAvatarURI_Context(user_avatar_URI);
  };
};


async function handleConnectClick(event) {
  if (!user_minted_NFT) {
    if (!user_address) {
      await setUserWalletInfo();
      if (contract_name === 'LMNTL' || contract_name === 'Signatures') {
        await updateSignerList();
      };
    } else {
      if (event.target.id === 'mintButtonBottom') {
        const mint_params = await generateMintParams();
        const mint_button = document.getElementById('mintButtonBottom');
        const mint_button_text = document.getElementById("mintButtonBottomText");
        user_token_ID = await mintNFT(contract_name, mint_button_text, mint_params);
        await setTokenID_Context(user_token_ID);
        toggleMinted( !user_minted_NFT );
        if (contract_name === 'LMNTL') {
          mint_button_text.textContent = "View LMNTL";
          mint_button.href = window.location['origin'] + '/avatar';
        } else {
          mint_button_text.textContent = 'View on OpenSea';
          opensea_link = await getOpenSeaLink(contract_name);
          mint_button.href = opensea_link;
          mint_button.target = '_blank';
        }
      } else if (event.target.id === 'executeSelectedButton' || event.target.id === 'executeEntryButton') {
        console.log('Number of Inputs: ', number_of_inputs);
        if (event.target.id === 'executeSelectedButton') {
          function_name = document.getElementById('functionSelect').value;
        } else if (event.target.id === 'executeEntryButton') {
          function_name = document.getElementById('functionNameInput').value;
        }
        const function_params = await generateFunctionParams();
        const execute_button = document.getElementById("executeSelectedButton");
        const transaction_info = await runContractFunction(contract_name, function_name, function_params, execute_button);
        document.getElementById('outputText').textContent = transaction_info;
        if (transaction_info) {
          try {
            if (transaction_info[0]) {
              if (transaction_info[0].includes('https')) {
                console.log(await getJSONfromIPFS(transaction_info[0]));
              }
            } else {
              if (transaction_info.includes('https')) {
                console.log(await getJSONfromIPFS(transaction_info));
              }
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      await setUserWalletInfo();
    }
  } else {
    if (contract_name === 'LMNTL') {
      window.location.href = window.location['origin'] + '/avatar';
    } else {
      window.location.href = opensea_link;
    };
  };
};


async function generateFunctionParams() {
  var function_params = [];

  if (number_of_inputs > 0) {
    function_params.push(document.getElementById('functionInputField1').value);
  }
  if (number_of_inputs > 1) {
    function_params.push(document.getElementById('functionInputField2').value);
  }
  if (number_of_inputs > 2) {
    function_params.push(document.getElementById('functionInputField3').value);
  }
  if (number_of_inputs > 3) {
    function_params.push(document.getElementById('functionInputField4').value);
  }
  if (number_of_inputs > 4) {
    function_params.push(document.getElementById('functionInputField5').value);
  }

  return(function_params);
}


async function updateSignerList() {
  number_of_signers = await runContractFunction(contract_name, 'getPrimaryHolderCount');
  number_of_signers = parseInt(number_of_signers['_hex'], 16);
  document.getElementById('primaryHolderListTitle').textContent = 'Manifesto Signers: ' + number_of_signers.toString();

  var primary_holder_list = '';
  var new_primary_holder;
  for (let index = 1; index <= number_of_signers; index++) {
    new_primary_holder = await runContractFunction(contract_name, 'getPrimaryHolderByIndex', [index]);
    primary_holder_list += index.toString();
    primary_holder_list += ') ';
    primary_holder_list += new_primary_holder;
    primary_holder_list += '\n';
  }
  
  document.getElementById('primaryHolderList').textContent = primary_holder_list;
};


async function generateMintParams() {
  var mint_params = [];

  if (!contract_name) {
    contract_name = document.getElementById('smartContractSelect').value;
    await setContractName_Context(contract_name);
  };

  // Smart Contract Address Input
  if (contract_name.split('0x')[1]) {
    if (contract_name.split('0x')[1].length === 40) {
      mint_params.push('contract');
    };
  } else


  // Default Collection
  if (contract_name === 'default') {
    mint_params.push(document.getElementById('URIinput').value);
  } else


  // LMNTL Guardian Collection
  if (contract_name === 'LMNTL') {
    const LMNTL_URI_dict = {'Fire':'https://nftstorage.link/ipfs/bafybeiglxxim4fc4jxl53kxoxjsnrf7efcabx4jikrgrz2ralmgqlj6yai/LMNTLfire1.json',
                       'Water':'https://nftstorage.link/ipfs/bafybeiglxxim4fc4jxl53kxoxjsnrf7efcabx4jikrgrz2ralmgqlj6yai/LMNTLwater1.json',
                       'Air':'https://nftstorage.link/ipfs/bafybeiglxxim4fc4jxl53kxoxjsnrf7efcabx4jikrgrz2ralmgqlj6yai/LMNTLair1.json',
                       'Earth':'https://nftstorage.link/ipfs/bafybeiglxxim4fc4jxl53kxoxjsnrf7efcabx4jikrgrz2ralmgqlj6yai/LMNTLearth1.json'};
    const metadata_URI = LMNTL_URI_dict[element_selected];
    mint_params.push(metadata_URI);
    
    
    const elements_dict = {'Fire': 0,
                           'Water': 1,
                           'Air': 2,
                           'Earth': 3};
    const element_ID = elements_dict[element_selected];
    mint_params.push(element_ID);
  }

  //const metadata_URL = await getMetadataURI(element_ID);
  /*var metadata_info = document.getElementById('URIinput').value;
  if (document.getElementById('fileNameInput').value) {
    metadata_info += '/' + document.getElementById('fileNameInput').value;
  }
  const metadata_URL = await getMetadataURI(metadata_info);*/


  

  console.log('Mint Params: ', mint_params);
  return mint_params;
}

/*async function generateMintParams(contract_name_input, mint_input) {
  var mint_params = [];

  //const metadata_URL = await getMetadataURI(element_ID);
  var metadata_info = document.getElementById('URIinput').value;
  if (document.getElementById('fileNameInput').value) {
    metadata_info += '/' + document.getElementById('fileNameInput').value;
  }
  const metadata_URL = await getMetadataURI(metadata_info);
  mint_params.push(metadata_URL);


  // Smart Contract Address Input
  if (contract_name_input.split('0x')[1]) {
    if (contract_name_input.split('0x')[1].length === 40) {
      mint_params = mint_input;
    };
  } else


  // LMNTL Guardian Collection
  if (contract_name_input === 'LMNTL') {
    const elements_dict = {'Fire': 0,
                           'Water': 1,
                           'Air': 2,
                           'Earth': 3};
    //const element_ID = elements_dict[element_selected];
    //mint_params.push(element_ID);
    mint_params.push(0);    
  }*/



async function handleFieldChange(event) {
  console.log('[fn] handleFieldChange');
  console.log('event.target.className: ', event.target.className);
  console.log('event.target.id: ', event.target.id);
  console.log('event.target.value: ', event.target.value);

  // Smart Contract Selection
  if (event.target.id === 'smartContractSelect') {
    contract_name = event.target.value;
    await setContractName_Context(contract_name);
    if (contract_name === 'default') {
      default_input_display = 'visible';
      document.getElementById('nofunminterCenter').style.display = 'block';
      document.getElementById('contractAddressInput').style.display = 'none';
    } else if (contract_name === 'LMNTL') {
      document.getElementById('LMNTLselect').style.display = 'block';
      default_input_display = 'none';
      document.getElementById('nofunminterCenter').style.display = 'none';
      document.getElementById('contractAddressInput').style.display = 'none';
    } else if (contract_name === 'otherCollection') {
      manual_contract_input = true;
      document.getElementById('contractAddressInput').style.display = 'inline';
      default_input_display = 'visible';
      document.getElementById('nofunminterCenter').style.display = 'block';
    }
  } else

  // Metadata Input Selection
  if (event.target.id === 'metadataInputSelect') {
    metadata_input = event.target.value;
    if (metadata_input === 'inputURI') {
      document.getElementById('URIinput').style.display = 'inline';
      document.getElementById('uploadButtonContainer').style.display = 'none';
    } else if (metadata_input === 'inputTraits') {
      document.getElementById('URIinput').style.display = 'none';
      document.getElementById('uploadButtonContainer').style.display = 'none';
    } else if (metadata_input === 'uploadJSON') {
      document.getElementById('URIinput').style.display = 'none';
      document.getElementById('uploadButtonContainer').style.display = 'inline';
    }
  } else

  // Function Selection
  if (event.target.id === 'functionSelect' || event.target.id === 'functionNameInput') {
    function_name = event.target.value;
    var function_input_list = await getFunctionParams(contract_name, function_name);
    console.log('function_input_list:', function_input_list);
    if (Array.isArray(function_input_list)) {
      console.log('NoFunMinterGUI used the NEW way!');
      number_of_inputs = function_input_list.length;
    } else {
      if (function_name === '__mintFree') {
        number_of_inputs = 1;
        document.getElementById('modifyMetadataSource').style.display = 'inline';
      } else if (function_name === 'mint') {
        if (contract_name === 'MelioraComicV1') {
          number_of_inputs = 0;
        } else {
          number_of_inputs = 1;
          document.getElementById('modifyMetadataSource').style.display = 'inline';
        }
      } else {
        document.getElementById('modifyMetadataSource').style.display = 'none';
        if (function_name === 'contractURI') {
          number_of_inputs = 0;
        } else if (function_name === '__setContractURI') {
          number_of_inputs = 1;
        } else if (function_name === 'getMintPrice') {
          number_of_inputs = 1;
        } else if (function_name === '__setMintPrice') {
          number_of_inputs = 2;
        } else if (function_name === 'getMaxSupply') {
          number_of_inputs = 0;
        } else if (function_name === '__setMaxSupply') {
          number_of_inputs = 1;
        } else if (function_name === 'tokenURI') {
          number_of_inputs = 1;
        } else if (function_name === '__setTokenURI') {
          number_of_inputs = 2;
        } else if (function_name === 'getPrimaryTokenID') {
          number_of_inputs = 1;
        } else if (function_name === 'setPrimaryTokenID') {
          number_of_inputs = 1;
        } else if (function_name === 'getPrimaryTokenURI') {
          number_of_inputs = 1;
        } else if (function_name === 'getPrimaryHolderByIndex') {
          number_of_inputs = 1;
        } else if (function_name === 'getPrimaryHolderCount') {
          number_of_inputs = 0;
        } else if (function_name === 'getAllPrimaryHolders') {
          number_of_inputs = 0;
        } else if (function_name === '__createTask') {
          number_of_inputs = 3;
        } else if (function_name === 'getTaskHash') {
          number_of_inputs = 2;
        } else if (function_name === 'getTask') {
          number_of_inputs = 2;
        } else if (function_name === 'getCharacter') {
          number_of_inputs = 1;
        } else if (function_name === 'completeTask') {
          number_of_inputs = 2;
        } else if (function_name === 'completeTaskBatch') {
          number_of_inputs = 2;
        } else if (function_name === 'setApprovalForAll') {
          number_of_inputs = 2;
        };
      };
    };
    await updateFunctionInputFields();
  } else
  // Metadata Source Checkbox
  if (event.target.id ==='checkbox_MetadataSource') {
    if (document.getElementById('checkbox_MetadataSource').checked) {
      document.getElementById('metadataSourceInputContainer').style.display = 'block';
    } else {
      document.getElementById('metadataSourceInputContainer').style.display = 'none';
    }
  }

}

async function updateFunctionInputFields() {
  if (number_of_inputs > 4) {
    document.getElementById('functionInput5').style.display = 'block';
  } else {
    document.getElementById('functionInput5').style.display = 'none';
  }

  if (number_of_inputs > 3) {
    document.getElementById('functionInput4').style.display = 'block';
  } else {
    document.getElementById('functionInput4').style.display = 'none';
  }
  
  if (number_of_inputs > 2) {
    document.getElementById('functionInput3').style.display = 'block';
  } else {
    document.getElementById('functionInput3').style.display = 'none';
  }
  
  if (number_of_inputs > 1) {
    document.getElementById('functionInput2').style.display = 'block';
  } else {
    document.getElementById('functionInput2').style.display = 'none';
  }
  
  if (number_of_inputs > 0) {
    document.getElementById('functionInput1').style.display = 'block';
  } else {
    document.getElementById('functionInput1').style.display = 'none';
  }
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
  <div className='nofunminter'>
    <div className='nofunminterPageTitle'>
      <span className='nofunminterPageTitle'>NoFun Minter</span>
    </div>
    <div className='nofunminterBoxSubTitle'></div>
    <div className='nofunminterContainer SlideRightAnimation'>
      <div className='nofunminterLeftContainer' id='nofunminterLeftContainer'>
        <div className='nofunminterInputContainer' id='nofunminterInputContainer'>
          <span className='nofunminterLabel' id='nofunminterLabel_Network'>Network: </span>
          <select className='nofunminterSelectList' id='networkSelect' onChange={handleFieldChange}>
            <option value="default">Default</option>
            <option value="goerli">Goerli</option>
            <option value="sepolia">Sepolia</option>
            <option value="mainnet">Ethereum Mainnet</option>
            <option value="polygon">Polygon</option>
            <option value="mumbai">Mumbai</option>
            <option value="optimism">Optimism</option>
            <option value="optimism_sepolia">Optimism Sepolia Testnet</option>
            <option value="base">Base</option>
            <option value="base_sepolia">Base Sepolia Testnet</option>
            <option value="arbitrum">Arbitrum</option>
          </select>
          <input placeholder="Contract Address..." className='nofunminterTextInput' id='contractAddressInput' onChange={handleFieldChange}
          style={(manual_contract_input) ? {display: ""} : {display: "none"}}/>
        </div>
        <div className='nofunminterInputContainer' id='nofunminterInputContainer'>
          <span className='nofunminterLabel' id='nofunminterLabel_SmartContract'>Smart Contract: </span>
          <select className='nofunminterSelectList' id='smartContractSelect' onChange={handleFieldChange}>
            <option value="default">Default Collection</option>
            <option value="LMNTL">LMNTL Guardians</option>
            <option value="Signatures">Manifesto Signatures</option>
            <option value="MelioraComicV1">The Genesis of Meliora</option>
            <option value="FundSplitter">FundSplitter</option>
            <option value="premium">Premium Collection</option>   
            <option value="otherCollection">Other Collection</option>
          </select>
          <input placeholder="Contract Address..." className='nofunminterTextInput' id='contractAddressInput' onChange={handleFieldChange}
          style={(manual_contract_input) ? {display: ""} : {display: "none"}}/>
        </div>
        <div className='nofunminterInputContainer' id='nofunminterInputContainer'>
          <span className='nofunminterLabel' id='nofunminterLabel_RunFunction'>Select Function: </span>                  
          <select className='nofunminterSelectList' id='functionSelect' onChange={handleFieldChange}>
            <option value="mint">mint</option>
            <option value="mintBatch">mintBatch</option>
            <option value="__mintFree">__mintFree</option>
            <option value="__toggleMintLocked"> __toggleMintLocked</option>
            <option value="contractURI">contractURI</option>
            <option value="__setContractURI">__setContractURI</option>
            <option value="getWhitelistTier">getWhitelistTier</option>
            <option value="__setWhitelistTier">__setWhitelistTier</option>
            <option value="getWhitelistMinimumRequirement">getWhitelistMinimumRequirement</option>
            <option value="__setWhitelistMinimumRequirement">__setWhitelistMinimumRequirement</option>
            <option value="getMintPrice">getMintPrice</option>
            <option value="getUserMintPrice">getUserMintPrice</option>
            <option value="getMyMintPrice">getMyMintPrice</option>
            <option value="__setMintPrice">__setMintPrice</option>
            <option value="getMintLimit">getMintLimit</option>
            <option value="getUserMintLimit">getUserMintLimit</option>
            <option value="getMyMintLimit">getMyMintLimit</option>
            <option value="__setMintLimit">__setMintLimit</option>
            <option value="getCurrentSupply">getCurrentSupply</option>
            <option value="getMaxSupply">getMaxSupply</option>
            <option value="__setMaxSupply">__setMaxSupply</option>
            <option value="getUniqueTokenSupply">getUniqueTokenSupply</option>
            <option value="getUniqueTokenMaxSupply">getUniqueTokenMaxSupply</option>
            <option value="__setUniqueTokenMaxSupply">__setUniqueTokenMaxSupply</option>
            <option value="tokenURI">tokenURI</option>
            <option value="__setTokenURI">__setTokenURI</option>
            <option value="getDefaultTokenURI">getDefaultTokenURI</option>
            <option value="__setDefaultTokenURI">__setDefaultTokenURI</option>
            <option value="getUniqueTokenBaseURI">getUniqueTokenBaseURI</option>
            <option value="__setUniqueTokenBaseURI">__setUniqueTokenBaseURI</option>
            <option value="__updateAllDefaultTokenURIs">__updateAllDefaultTokenURIs</option>
            <option value="__updateAllUniqueTokenURIs">__updateAllUniqueTokenURIs</option>
            <option value="getFundRecipientWeight">getFundRecipientWeight</option>
            <option value="getFundRecipientCount">getFundRecipientCount</option>
            <option value="getTotalFundWeight">getTotalFundWeight</option>
            <option value="__setFundRecipientWeight">__setFundRecipientWeight</option>
            <option value="getPrimaryTokenID">getPrimaryTokenID</option>
            <option value="getPrimaryTokenURI">getPrimaryTokenURI</option>
            <option value="getPrimaryHolderByIndex">getPrimaryHolderByIndex</option>
            <option value="getPrimaryHolderCount">getPrimaryHolderCount</option>
            <option value="getAllPrimaryHolders">getAllPrimaryHolders</option>
            <option value="__createTask">__createTask</option>
            <option value="getTaskHash">getTaskHash</option>
            <option value="getTask">getTask</option>
            <option value="getCharacter">getCharacter</option>
            <option value="completeTask">completeTask</option>
            <option value="completeTaskBatch">completeTaskBatch</option>
            <option value="royaltyInfo">royaltyInfo</option>
            <option value="__setDefaultRoyalty">__setDefaultRoyalty</option>
            <option value="setRoyaltyRecipient">setRoyaltyRecipient</option>
            <option value="setRoyaltyFee">setRoyaltyFee</option>
            <option value="__setRoyaltyReceiver">__setRoyaltyReceiver</option>
            <option value="setApprovalForAll">setApprovalForAll</option>
          </select>
          <div className='uploadButtonContainer' id='uploadButtonContainer'
          style={{display: "inline"}}>
            <span className='newButton' id='executeSelectedButton' onClick={handleConnectClick}>Execute</span>
          </div>
          <span id="modifyMetadataSource"
          style={(function_name === 'mint') ? {display: "inline"} : {display: "inline"}}>
            <input type="checkbox" id="checkbox_MetadataSource" onChange={handleFieldChange}/>
            <span className='helperText' id='nofunminterLabel_MetadataSource'>Show Trait Input</span>
          </span>
        </div>
        <div className='nofunminterInputContainer' id='nofunminterInputContainer'>
          <span className='nofunminterLabel' id='nofunminterLabel_RunFunction'>Enter Function: </span>                  
          <div className='nofunminterInputContainer' id='functionNameInputContainer' style={{display: "inline"}}>
            <input placeholder="" className='nofunminterTextInput' id='functionNameInput' onChange={handleFieldChange}/>
          </div>
          <div className='uploadButtonContainer' id='uploadButtonContainer'
          style={{display: "inline"}}>
            <span className='newButton' id='executeEntryButton' onClick={handleConnectClick}>Execute</span>
          </div>
          <span id="modifyMetadataSource"
          style={(function_name === 'mint') ? {display: "inline"} : {display: "inline"}}>
            <input type="checkbox" id="checkbox_MetadataSource" onChange={handleFieldChange}/>
            <span className='helperText' id='nofunminterLabel_MetadataSource'>Show Trait Input</span>
          </span>
        </div>
        <div className='nofunminterInputContainer' id='metadataSourceInputContainer'
        style={{display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel_MetadataSource'>Metadata Source: </span>                  
          <select className='nofunminterSelectList' id='metadataInputSelect' onChange={handleFieldChange}>
            <option value="inputURI">Input JSON URI</option>
            <option value="inputTraits">Manual Trait Input</option>
            <option value="uploadJSON">Upload JSON File</option>
          </select>
          <input placeholder="Metadata IPFS URI..." className='hashInput' id='URIinput' onChange={handleFieldChange}/>
          <div className='uploadButtonContainer' id='uploadButtonContainer'
          style={(metadata_input === 'URIinput') ? {display: "block"} : {display: "none"}}>
            <span className='newButton' id='uploadButton' onClick={handleNewClick}>Upload *</span>
            <br></br>
            <span className='helperText premiumText' id='helperText premiumText'>*Premium - </span>
            <u><a href="" className='helperText getPremiumText' id='helperText getPremiumText'>Get Premium</a></u>
          </div>
        </div>
        <div className='nofunminterInputContainer' id='functionInput1'
        style={(number_of_inputs > 0) ? {display: "inline"} : {display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel'>Input #1: </span>
            <input placeholder="" className='nofunminterTextInput' id='functionInputField1' onChange={handleFieldChange}/>
        </div>
        <div className='nofunminterInputContainer' id='functionInput2'
        style={(number_of_inputs > 1) ? {display: "inline"} : {display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel'>Input #2: </span>
            <input placeholder="" className='nofunminterTextInput' id='functionInputField2' onChange={handleFieldChange}/>
        </div>
        <div className='nofunminterInputContainer' id='functionInput3'
        style={(number_of_inputs > 2) ? {display: "inline"} : {display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel'>Input #3: </span>
            <input placeholder="" className='nofunminterTextInput' id='functionInputField3' onChange={handleFieldChange}/>
        </div>
        <div className='nofunminterInputContainer' id='functionInput4'
        style={(number_of_inputs > 3) ? {display: "inline"} : {display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel'>Input #4: </span>
            <input placeholder="" className='nofunminterTextInput' id='functionInputField4' onChange={handleFieldChange}/>
        </div>
        <div className='nofunminterInputContainer' id='functionInput5'
        style={(number_of_inputs > 4) ? {display: "inline"} : {display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel'>Input #5: </span>
            <input placeholder="" className='nofunminterTextInput' id='functionInputField5' onChange={handleFieldChange}/>
        </div>
        <div className='nofunminterInputContainer' id='filenameInputContainer'
        style={(contract_name === 'Custom') ? {display: "block"} : {display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel'>File Name: </span>
          <input placeholder="" className='nofunminterTextInput' id='fileNameInput' onChange={handleFieldChange}/>
        </div>
        <div className='nofunminterInputContainer' id='IPFSinputContainer'
        style={(contract_name === 'Custom') ? {display: "block"} : {display: "none"}}>
          <span className='nofunminterLabel' id='nofunminterLabel_IPFSprovider'>IPFS Provider: </span>
          <select className='nofunminterSelectList' id='IPFSselect' onChange={handleFieldChange}>
            <option value="selectIPFS">Select IPFS...</option>
            <option value="NFT_Storage">NFT.Storage</option>
            <option value="Pinata">Pinata</option>
            <option value="Infura">Infura</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className='nofunminterRightContainer' id='nofunminterRightContainer'>
        <div className='outputSection' id='outputSection'>
          <span className='nofunminterLabel' id='outputTitle'>Output: </span>
          <span className='outputText' id='outputText'>_______</span>
        </div>
        <br></br>
        <div id="nofunminterUserAvatar" className="nofunminterUserAvatar">
          <p className='nofunminterLabel' id='outputTitle'>Avatar Image: </p>
          <img id="nofunminterAvatarImage" className="nofunminterAvatarImage" src={user_avatar_URI} alt="LMNTL"></img>
        </div>
      </div>
      
    </div>
    <br></br>
    <div className='mintButtonBottom' id='primaryHolderListContainer'>
      <u><span className='nofunminterLabel' id='primaryHolderListTitle'>Manifesto Signers: </span></u>
      <div id='primaryHolderList'>Connect Wallet to Load</div>
    </div>
    <div className='LMNTLbox' id='LMNTLselect'
    style={(contract_name === 'LMNTL') ? {display: "block"} : {display: "none"}}>
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
    <div className='mintButtonBottom' id='mintButtonBottom' onClick={handleConnectClick}
    style={{display:'none'}}>
      <img className='mintButtonBottomImage' id='mintButtonBottomImage' src={mintButtonBottomImage} alt='Mint NFT' />
      <div id="mintButtonBottomText" className='mintButtonBottomText'>{(user_address) ? 'Mint NFT' : 'Connect Wallet'}</div>
    </div>
    <div className="unitapLinkContainer" id="unitapLinkContainer">
      <span className='helperText' id='helperText'>Visit </span>
      <u><a href="https://nofunz.one/unitap" className='helperText' id='helperText' target="_blank" rel="noopener noreferrer">Unitap</a></u>
      <span className='helperText' id='helperText'> for free gas tokens!</span>
    </div>
  </div>
)
}
//AppEnd

export default NoFunMinterGUI