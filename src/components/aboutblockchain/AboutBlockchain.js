import React from 'react'

import starterElementals from '../../image/starter-elementals-1.png'

import aboutBlockchainButton from '../../image/get-started-button.png'

import './aboutblockchain.css'

const AboutBlockchain = () => {
  return (
    <div className='componentFirst aboutBlockchainBC'>
      <div className='componentSecond'>
        <div className='aboutBlockchain'>
          <div className='aboutBlockchainLeft'>
            <div className='aboutBlockchainBox'>
              <div className='aboutBlockchainTextContainer'>
                <div className='aboutBlockchainTitle textHighlight'>
                  Start by selecting your element!
                </div>
                <div className='aboutBlockchainText'>
                  Pick an elemental warrior. You can choose between Fire, Earth, Air and Water!
                </div>
              </div>
              <div className='aboutBlockchainButtonContainer'>
                <a href={window.location['href'] + 'mint'} >
                  <img src={aboutBlockchainButton} alt='Get Started' className='aboutBlockchainButton' />
                </a>
              </div>
            </div>
          </div>
          <div className='aboutBlockchainRight'>
            <div className='aboutBlockchainBox'>
              <div className='aboutBlockchainBoxIMG'>
                <img src={starterElementals} alt='' className='starterElementals' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutBlockchain
