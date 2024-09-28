import React from 'react'

import starterElementals from '../../image/starter-elementals-1.png'

import storyGUIButton from '../../image/get-started-button.png'

import './storygui.css'

const StoryGUI = () => {
  return (
    <div className='componentFirst storyGUIBC'>
      <div className='componentSecond'>
        <div className='storyGUI'>
          <div className='storyGUILeft'>
            <div className='storyGUIBox'>
              <div className='storyGUITextContainer'>
                <div className='storyGUITitle textHighlight'>
                  
                </div>
                <div className='storyGUIText'>
                  21 million years ago, an ancient society of Blockchain Guardians
                </div>
              </div>
              <div className='storyGUIButtonContainer'>
                <a href={window.location['href'] + 'mint'} >
                  <img src={storyGUIButton} alt='Get Started' className='storyGUIButton' />
                </a>
              </div>
            </div>
          </div>
          <div className='storyGUIRight'>
            <div className='storyGUIBox'>
              <div className='storyGUIBoxIMG'>
                <img src={starterElementals} alt='' className='starterElementals' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StoryGUI
