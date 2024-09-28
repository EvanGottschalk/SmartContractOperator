//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useContext } from 'react';
import SmartContractContext from '../../scripts/SmartContractContext';

import logo from '../../image/logo.png'

import walletButton from '../../image/play-button.png'

import './navbar.css'

import connectWallet from '../../scripts/SmartContractOperator';

import fire_1_icon from '../../image/LMNTLfire1.png';
import fire_2_icon from '../../image/LMNTLfire2-icon.png';
import water_1_icon from '../../image/LMNTLwater1.png';
import water_2_icon from '../../image/LMNTLwater2-icon.png';
import air_1_icon from '../../image/LMNTLair1.png';
import air_2_icon from '../../image/LMNTLair2-icon.png';
import earth_1_icon from '../../image/LMNTLearth1.png';
import earth_2_icon from '../../image/LMNTLearth2-icon.png';









//--------------------------------------------------------------------------------------------------
//# Variables

const connect_on_load = false;

var mobile = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile = true;
};

const icon_dict = {'fire1.png': fire_1_icon, 
                    'fire2.png': fire_2_icon,
                    'water1.png': water_1_icon,
                    'water2.png': water_2_icon,
                    'air1.png': air_1_icon,
                    'air2.png': air_2_icon,
                    'earth1.png': earth_1_icon,
                    'earth2.png': earth_2_icon};



//AppStart
const Navbar = () => {

let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
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


async function handleConnectClick() {
  console.log('Wallet connection is temporarily disabled. Code for wallet connection is present, but inactive.');
  window.location.href = window.location['origin'] + '/game';
  /*
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
  };*/
};


const handleMint = () => {}

const handleAbout = () => {}

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








//--------------------------------------------------------------------------------------------------
//# HTML

if (connect_on_load && !user_address) {
  handleConnectClick();
};
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
      <div className='navbarLeft'>
        <div id="navbarLogo" className='navbarLogo'>
          <a href={window.location['origin']}>
            <img className="navbarLogoImage" id="navbarLogoImage" src={logo} alt='Home' />
          </a>
        </div>
      </div>
      <div className='navbarCenter'>
        {/*<div className='navbarLogo'>
          <img src={logo} alt='' className='navbarBoxImage' />
        </div>*/}
        <div className='navbarButton' onClick={handleMint}>
          <a href={window.location['origin'] + '/module0'}>
            <div className='navbarButton1'>
              
            </div>
          </a>
        </div>
        <div className='navbarButton' onClick={handleAbout}>
          <a href={window.location['origin'] + '/avatar'}>
            <div className='navbarButton2'>
              
            </div>
          </a>
        </div>
        <div className='navbarButton' onClick={handleRoadmap}>
          <div className='navbarButton3'>
            
          </div>
        </div>
        <div className='navbarButton' onClick={handleTeam}>
          <div className='navbarButton4'>
            
          </div>
        </div>
        <div className='navbarButton' onClick={handleFaq}>
          <div className='navbarButton5'>
            
          </div>
        </div>
      </div>
      <div className='navbarRight'>
        <div id="navbarWalletButton" className='navbarWalletButton' onClick={handleConnectClick}>
          <img id="navbarWalletButtonImage" className='navbarWalletButtonImage'
               src={(user_avatar_URI) ? icon_dict[user_avatar_URI.split('LMNTL')[1]] : walletButton} alt='Wallet Connect'
               style={(user_avatar_URI) ? {
                width: "12.5%",
                color: "var(--color-nfzorange)",
                border: "solid",
                borderWidth: "5px 5px 5px 5px",
                borderRadius: "10px"} :
                {}} />
          <div id="navbarWalletButtonText" className='navbarWalletButtonText'>{(user_avatar_URI) ? '' : (user_address) ? '' : ''}</div>
        </div>
      </div>
    </div>
  </div>
)
}
//AppEnd

export default Navbar