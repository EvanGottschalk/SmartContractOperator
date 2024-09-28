//--------------------------------------------------------------------------------------------------
//# Imports

import React, { useState, useContext, useEffect } from 'react'
import SmartContractContext from '../../scripts/SmartContractContext';

//import connectWallet from '../../scripts/SmartContractOperator';
//import {mintNFT, getMetadataURI} from '../../scripts/SmartContractOperator';


//import reset_icon from '../../image/reset-arrow.jpg'

/*import scene_image_0 from '../../image/demo1/0.png'
import scene_image_1 from '../../image/demo1/1.png'
import scene_image_2 from '../../image/demo1/2.png'
import scene_image_3 from '../../image/demo1/3.png'
import scene_image_4 from '../../image/demo1/4.png'
import scene_image_5 from '../../image/demo1/5.png'
import scene_image_6 from '../../image/demo1/6.png'
import scene_image_7 from '../../image/demo1/7.png'
import scene_image_8 from '../../image/demo1/8.png'
import scene_image_9_fire from '../../image/demo1/9_fire.png'
import scene_image_9_water from '../../image/demo1/9_water.png'
import scene_image_9_air from '../../image/demo1/9_air.png'
import scene_image_9_earth from '../../image/demo1/9_earth.png'*/

import scene_image_0 from '../../image/demo2/0.png'
import scene_image_1 from '../../image/demo2/1.png'
import scene_image_2 from '../../image/demo2/2.png'
import scene_image_3 from '../../image/demo2/3.png'
import scene_image_4 from '../../image/demo2/4.png'
import scene_image_5 from '../../image/demo2/5.png'
import scene_image_6 from '../../image/demo2/6.png'
import scene_image_7 from '../../image/demo2/7.png'
import scene_image_8 from '../../image/demo2/8.png'
import scene_image_9 from '../../image/demo2/9.png'
import scene_image_10 from '../../image/demo2/10.png'
import scene_image_11 from '../../image/demo2/11.png'
import scene_image_12 from '../../image/demo2/12.png'
import scene_image_13 from '../../image/demo2/13.png'
import scene_image_14 from '../../image/demo2/14.png'
import scene_image_15 from '../../image/demo2/15.png'
import scene_image_16 from '../../image/demo2/16.png'
import scene_image_17 from '../../image/demo2/17.png'
import scene_image_18 from '../../image/demo2/18.png'
import scene_image_19 from '../../image/demo2/19.png'
import scene_image_20 from '../../image/demo2/20.png'
import scene_image_21 from '../../image/demo2/21.png'
import scene_image_22 from '../../image/demo2/22.png'
import scene_image_23 from '../../image/demo2/23.png'
import scene_image_24 from '../../image/demo2/24.png'
import scene_image_25 from '../../image/demo2/25.png'
import scene_image_26 from '../../image/demo2/26.png'
import scene_image_27 from '../../image/demo2/27.png'
import scene_image_28 from '../../image/demo2/28.png'
import scene_image_29 from '../../image/demo2/29.png'
import scene_image_30 from '../../image/demo2/30.png'
import scene_image_31 from '../../image/demo2/31.png'
import scene_image_32 from '../../image/demo2/32.png'
import scene_image_33 from '../../image/demo2/33.png'
import scene_image_34 from '../../image/demo2/34.png'
import scene_image_35 from '../../image/demo2/35.png'
import scene_image_36 from '../../image/demo2/36.png'
import scene_image_37 from '../../image/demo2/37.png'
import scene_image_38 from '../../image/demo2/38.png'
import scene_image_39 from '../../image/demo2/39.png'
import scene_image_40 from '../../image/demo2/40.png'

import cursor_image_Next from '../../image/cursors/cursor-next.png'
import cursor_image_Medium from '../../image/cursors/cursor-medium.png'
import cursor_image_Large from '../../image/cursors/cursor-large.png'

import player_interface_1 from '../../image/player_interfaces/ipad-banner-1.png'
import player_interface_2 from '../../image/player_interfaces/ipad-banner-2.png'
import player_interface_3 from '../../image/player_interfaces/ipad-banner-3.png'
import player_interface_next from '../../image/player_interfaces/ipad-banner-next.png'


import EXP_plus_5 from '../../image/animations/exp/EXP_plus_5.gif'
import EXP_plus_10 from '../../image/animations/exp/EXP_plus_10.gif'

import TAP_plus_3 from '../../image/animations/TAP_plus_3.gif'

import './gamegui.css'








//--------------------------------------------------------------------------------------------------
//# Variables

const game_page_URL = window.location['origin'] + '/game';
const blockchain_page_URL = window.location['origin'] + '/blockchain';
const story_page_URL = window.location['origin'] + '/story';

const connect_on_load = false;

const scene_dict = {0: {'background': scene_image_0,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': ''},
                    1: {'background': scene_image_1,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': ''},
                    2: {'background': scene_image_2,
                        'button_1': 'large',
                        'button_2': 'large',
                        'button_3': 'large',
                        'wallet_button': ''},
                    3: {'background': scene_image_3,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': ''},
                    4: {'background': scene_image_4,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': ''},
                    5: {'background': scene_image_5,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': ''},
                    6: {'background': scene_image_6,
                        'button_1': 'large',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': ''},
                    7: {'background': scene_image_7,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 5},
                    8: {'background': scene_image_8,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': ''},
                    9: {'background': scene_image_9,
                        'button_1': '',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': 'next'}, 
                    10: {'background': scene_image_10,
                        'button_1': '',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 10},
                    11: {'background': scene_image_11,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    12: {'background': scene_image_12,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    13: {'background': scene_image_13,
                        'button_1': 'large',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    14: {'background': scene_image_14,
                        'button_1': 'large',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    15: {'background': scene_image_15,
                        'button_1': 'large',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    16: {'background': scene_image_16,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    17: {'background': scene_image_17,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    18: {'background': scene_image_18,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    19: {'background': scene_image_19,
                        'button_1': 'large',
                        'button_2': 'grey',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    20: {'background': scene_image_20,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    21: {'background': scene_image_21,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    22: {'background': scene_image_22,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    23: {'background': scene_image_23,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    24: {'background': scene_image_24,
                        'button_1': 'large',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    25: {'background': scene_image_25,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 10},
                    26: {'background': scene_image_26,
                        'button_1': 'grey',
                        'button_2': 'large',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    27: {'background': scene_image_27,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    28: {'background': scene_image_28,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    29: {'background': scene_image_29,
                        'button_1': 'large',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    30: {'background': scene_image_30,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    31: {'background': scene_image_31,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    32: {'background': scene_image_32,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    33: {'background': scene_image_33,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    34: {'background': scene_image_34,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    35: {'background': scene_image_35,
                        'button_1': 'large',
                        'button_2': 'large',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0},
                    36: {'background': scene_image_36,
                        'button_1': '',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'claim_button': 'medium',
                        'exp': 0},
                    37: {'background': scene_image_37,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': 'next'},
                    38: {'background': scene_image_38,
                        'button_1': '',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 10},
                    39: {'background': scene_image_39,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0,
                        'tap': 3},
                    40: {'background': scene_image_40,
                        'button_1': 'next',
                        'button_2': '',
                        'button_3': '',
                        'wallet_button': '',
                        'exp': 0}};

const EXP_animation_dict = {5: EXP_plus_5,
                            10: EXP_plus_10};

const TAP_animation_dict = {3: TAP_plus_3};

const player_interface_dict = {1: player_interface_1,
                               2: player_interface_2,
                               3: player_interface_3};

var player_interface_image = player_interface_next;

var current_scene = 0;
var background_image = scene_dict[current_scene];
var button_cursor_1 = cursor_image_Next;
var button_cursor_2 = cursor_image_Next;
var button_cursor_3 = cursor_image_Next;
var button_cursor_4 = cursor_image_Next;
var button_cursor_5 = cursor_image_Next;


var mobile_device = false;
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  console.log("Mobile device detected");
  mobile_device = true;
};

var vertical_display = false;
if (window.screen.width < window.screen.height) {
  console.log("Vertical screen detected");
  vertical_display = true;
  console.log("window.screen.width: ", window.screen.width);
  console.log("window.screen.height: ", window.screen.height);
};

var rotate_game = false;


//AppStart
const GameGUI = () => {


let { user_address, setAddress_Context } = useContext(SmartContractContext);
let { user_token_ID, setTokenID_Context } = useContext(SmartContractContext);
let { user_balance, setBalance_Context } = useContext(SmartContractContext);
let { user_metadata, setMetadata_Context } = useContext(SmartContractContext);
let { user_avatar_URI, setAvatarURI_Context } = useContext(SmartContractContext);



onLoad();


//--------------------------------------------------------------------------------------------------
//# Functions

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
};


function pause(time) {
  const seconds = time/1000;
  console.log('PAUSE Start: ' + seconds.toString() + ' seconds');
  return new Promise(resolve => setTimeout(resolve, time));
};

async function onLoad() {
  await changeScene(0);
  if (mobile_device || vertical_display) {
    //rotate_game = true;
    document.getElementById('playerGameInterfaceImage').style.opacity = '1';
    document.getElementById('playerGameInterfaceContainer').style.top = '100%';
  }
}



async function handleSceneClick(event) {
  //await changeScene();
  console.log('Scene Background Clicked!');
}

async function handleButtonClick(event) {
  const button_ID = event.target.id.split('gameSceneCursorImage')[1];
  console.log('Button ID:', button_ID);
  await changeScene();
  if (button_ID === '4') {
    await changeScene();
  }
};

async function changeScene(new_scene_number = false) {
  console.log('Scene # Input:', new_scene_number);
  if (!new_scene_number && new_scene_number !== 0) {
    new_scene_number = current_scene += 1;
  };

  console.log('Scene Changed to:', current_scene);
  current_scene = new_scene_number;
  background_image = scene_dict[current_scene]['background'];

  const button_1 = document.getElementById('gameSceneCursorImage1');
  const button_2 = document.getElementById('gameSceneCursorImage2');
  const button_3 = document.getElementById('gameSceneCursorImage3');
  const button_4 = document.getElementById('gameSceneCursorImage4');
  const button_5 = document.getElementById('gameSceneCursorImage5');
  
  // Button 1
  if (scene_dict[current_scene]['button_1'] === 'next') {
    button_cursor_1 = cursor_image_Next;
  } else if (scene_dict[current_scene]['button_1'] === 'large' || scene_dict[current_scene]['button_1'] === 'grey') {
    button_cursor_1 = cursor_image_Large;
  } else {
    button_cursor_1 = '';
  };
  if (button_1) {
    if (scene_dict[current_scene]['button_1'] === 'grey') {
      button_1.style.filter = 'brightness(35%)';
    } else {
      button_1.style.filter = 'brightness(100%)';
    }
  }


  // Button 2
  if (scene_dict[current_scene]['button_2'] === 'large'|| scene_dict[current_scene]['button_2'] === 'grey') {
    button_cursor_2 = cursor_image_Large;
    if (scene_dict[current_scene]['button_2'] === 'grey') {
      button_2.style.filter = 'brightness(35%)';
    } else {
      button_2.style.filter = 'brightness(100%)';
    };
  } else {
    button_cursor_2 = '';
  };
  

  // Button 3
  if (scene_dict[current_scene]['button_3'] === 'large') {
    button_cursor_3 = cursor_image_Large;
  } else {
    button_cursor_3 = '';
  }


  // Wallet Button
  if (scene_dict[current_scene]['wallet_button'] === 'next') {
    button_cursor_4 = cursor_image_Next;
  } else if (scene_dict[current_scene]['wallet_button'] === 'large') {
    button_cursor_4 = cursor_image_Large;
  } else {
    button_cursor_4 = '';
  };


  // Claim Button
  if (scene_dict[current_scene]['claim_button'] === 'next') {
    button_cursor_5 = cursor_image_Next;
  } else if (scene_dict[current_scene]['claim_button'] === 'medium') {
    button_cursor_5 = cursor_image_Medium;
  } else if (scene_dict[current_scene]['claim_button'] === 'large') {
    button_cursor_5 = cursor_image_Large;
  } else {
    button_cursor_5 = '';
  };


  // EXP
  var EXP_gain = 0;
  if (scene_dict[current_scene]['exp']) {
    EXP_gain = scene_dict[current_scene]['exp'];
  };

  // TAP
  var TAP_gain = 0;
  if (scene_dict[current_scene]['tap']) {
    TAP_gain = scene_dict[current_scene]['tap'];
  };
  

  if (new_scene_number > 0) {
    document.getElementById('backgroundImage').src = background_image;
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
    button_1.src = button_cursor_1;
    button_2.src = button_cursor_2;
    button_3.src = button_cursor_3;
    button_4.src = button_cursor_4;
    button_5.src = button_cursor_5;
    if (EXP_gain) {
      gainEXP(EXP_gain);
      await pause(2000);
    };
    if (TAP_gain) {
      gainTAP(TAP_gain);
      await pause(2000);
    };
  };
};


async function gainEXP(EXP_gain) {
  if (EXP_gain > 0) {
    document.getElementById('expAnimation').src = EXP_animation_dict[EXP_gain];
    await pause(5000);
    document.getElementById('expAnimation').src = '';
  };
};

async function gainTAP(TAP_gain) {
  if (TAP_gain > 0) {
    document.getElementById('expAnimation').src = TAP_animation_dict[TAP_gain];
    await pause(5000);
    document.getElementById('expAnimation').src = '';
  };
};



function handleMouseOver(event) {
  const button_1 = document.getElementById('gameSceneCursorImage1');
  const button_2 = document.getElementById('gameSceneCursorImage2');
  const button_3 = document.getElementById('gameSceneCursorImage3');
  const button_4 = document.getElementById('gameSceneCursorImage4');
  const button_5 = document.getElementById('gameSceneCursorImage5');
  const button_moused_ID = event.target.id.split('gameSceneCursorImage')[1];
  console.log(button_moused_ID);
  if (button_moused_ID === '1') {
    button_1.style.opacity = '1';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '2') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '1';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '3') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '1';
    button_4.style.opacity = '0';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '4') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '1';
    button_5.style.opacity = '0';
  } else if (button_moused_ID === '5') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
    button_4.style.opacity = '0';
    button_5.style.opacity = '1';
  };
};




//--------------------------------------------------------------------------------------------------
//# HTML

return (
  <div className='gameGUI'>
    <div className='gameGUIContainer'
    style={(rotate_game) ? {
      transform: "rotate(90deg)",
      transformOrigin: "left right"} :
      {}}>
      <div className='gameSceneContainer' 
      style={(vertical_display) ? {
        width: "100vw",
        margin: "0% 0% 0% 0%"} :
        {}}>
        <img src={background_image} alt='' id='backgroundImage' className='backgroundImage'/>
        <img src='' alt='' id='expAnimation' className='expAnimation'
          style={{opacity:'1'}}/>
        <div className='gameSceneGUIContainer'>
          <div id='playerGameInterfaceContainer' className='playerGameInterfaceContainer'>
            <img src={player_interface_image} alt='' id='playerGameInterfaceImage' className='playerGameInterfaceImage'
            style={{opacity:'0'}}/>
            <div className='playerGameInterfaceCursorsContainer' id='playerGameInterfaceCursorsContainer'>
              <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_3} alt='' id='gameSceneCursorImage3' className='playerGameInterfaceCursorImage'
              style={{opacity:'0'}}/>
              <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_2} alt='' id='gameSceneCursorImage2' className='playerGameInterfaceCursorImage' 
              style={{opacity:'0'}}/>
              <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_1} alt='' id='gameSceneCursorImage1' className='playerGameInterfaceCursorImage'
              style={{opacity:'1'}}/>
            </div>
          </div>
          <div className='walletCursorContainer' id='gameSceneCursorContainer4'>
            <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_4} alt='' id='gameSceneCursorImage4' className='playerGameInterfaceCursorImage'
            style={{opacity:'0'}}/>
          </div>
          <div className='claimCursorContainer' id='gameSceneCursorContainer5'>
            <img onClick={handleButtonClick} onMouseOver={handleMouseOver} src={button_cursor_5} alt='' id='gameSceneCursorImage5' className='playerGameInterfaceCursorImage'
            style={{opacity:'0'}}/>
          </div>
        </div>  
      </div>
      
    </div>
  </div>
  
)
}
//AppEnd

export default GameGUI