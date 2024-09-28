//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext } from 'react';
import SmartContractContext from '../../scripts/SmartContractContext';

import moduleTestEvolveButton from '../../image/button_4x1.png'
import moduleTestVideo from '../../image/nfz-video.mp4'

import './moduletest.css'

import { connectWallet } from '../../scripts/SmartContractOperator';
import {levelUp} from '../../scripts/SmartContractOperator';










//--------------------------------------------------------------------------------------------------
//# Variables

const ModuleTest = () => {

const connect_on_load = false;

let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);

const [user_evolved, toggleEvolved] = useState(0);










//--------------------------------------------------------------------------------------------------
//# Functions

if (connect_on_load && !user_address) {
  handleEvolveClick();
};


function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function pause(time) {
  const seconds = time/1000;
  console.log('PAUSE Start: ' + seconds.toString() + ' seconds');
  return new Promise(resolve => setTimeout(resolve, time));
};


async function handleEvolveClick() {
  if (!user_evolved) {
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
    } else if (user_token_ID) {
      const evolve_button_text = document.getElementById('moduleTestEvolveButtonText');
      const evolve_info = await levelUp(evolve_button_text);
      toggleEvolved( !user_evolved );
      user_metadata = evolve_info['metadata'];
      await setMetadata_Context(user_metadata);
      user_avatar_URI = evolve_info['avatar_URI'];
      await setAvatarURI_Context(user_avatar_URI);
      evolve_button_text.textContent = "View LMNTL";
    };
  } else {
    window.location.href = window.location['origin'] + '/avatar';
  };
};









//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='moduletest'>
    <div className='moduleTestContainer SlideRightAnimation'>
      <div className='moduleTestCenter' id='moduleTestCenter'>
        <div className='moduleTestBox' id='moduleTestBox'>
          <div className='moduleTestVideo' id='moduleTestVideo'>
            <video width="80%" height="80%" controls>
              <source src={moduleTestVideo} type="video/mp4"></source>
            </video>
          </div>
          <div className='moduleTestText' id='moduleTestText'>
          Now that you have watched the first module you can now evolve you guardian. Make sure you read the syllabus and completed the lessons to pass the test before.
          </div>
          <div className='moduleTestBottom' id='moduleTestBottom'>
            <div className='moduleTestEvolveButton' id='moduleTestEvolveButton' onClick={handleEvolveClick}>
              <img className='moduleTestEvolveButtonImage' id='moduleTestEvolveButtonImage' src={moduleTestEvolveButton} alt='Evolve' />
              <div className='moduleTestEvolveButtonText' id='moduleTestEvolveButtonText'>{(user_address) ? 'Evolve' : 'Connect Wallet'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)
}
//AppEnd

export default ModuleTest