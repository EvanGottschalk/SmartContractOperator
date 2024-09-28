import React from 'react'

import andrea_intro_banner from '../../image/andrea-intro-banner.png'
import button_select_rectangle from '../../image/cursors/cursor-OG.png'

import './andreaintro.css'

const game_page_URL = window.location['origin'] + '/game';
const blockchain_page_URL = window.location['origin'] + '/blockchain';
const story_page_URL = window.location['origin'] + '/story';

function handleMouseOver(event) {
  const button_1 = document.getElementById('andreaIntroButtonImage1');
  const button_2 = document.getElementById('andreaIntroButtonImage2');
  const button_3 = document.getElementById('andreaIntroButtonImage3');
  const button_moused_ID = event.target.id.split('andreaIntroButtonImage')[1];
  if (button_moused_ID === '1') {
    button_1.style.opacity = '1';
    button_2.style.opacity = '0';
    button_3.style.opacity = '0';
  } else if (button_moused_ID === '2') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '1';
    button_3.style.opacity = '0';
  } else if (button_moused_ID === '3') {
    button_1.style.opacity = '0';
    button_2.style.opacity = '0';
    button_3.style.opacity = '1';
  };
};

const AndreaIntro = () => {
  return (
    <div className='andreaIntro'>
      <div className='andreaIntroBannerContainer'>
        <img src={andrea_intro_banner} alt='' className='andreaIntroBannerImage' />
        <div className='andreaIntroButtonContainer' id='andreaIntroButtonContainer1'>
          <a href={game_page_URL}>
            <img onMouseOver={handleMouseOver} src={button_select_rectangle} alt='' id='andreaIntroButtonImage1' className='andreaIntroButtonImage' />
          </a>
        </div>
        <div className='andreaIntroButtonContainer' id='andreaIntroButtonContainer2'>
          <a href={blockchain_page_URL}>
            <img onMouseOver={handleMouseOver} src={button_select_rectangle} alt='' id='andreaIntroButtonImage2' className='andreaIntroButtonImage' 
            style={{opacity:'0'}}/>
          </a>
        </div>
        <div className='andreaIntroButtonContainer' id='andreaIntroButtonContainer3'>
          <a href={story_page_URL}>
            <img onMouseOver={handleMouseOver} src={button_select_rectangle} alt='' id='andreaIntroButtonImage3' className='andreaIntroButtonImage'
            style={{opacity:'0'}}/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default AndreaIntro