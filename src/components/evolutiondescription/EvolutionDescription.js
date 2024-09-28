import React from 'react'

import evolutionImage1 from '../../image/evolution1.png'
import evolutionImage2 from '../../image/evolution2.png'
import evolutionImage3 from '../../image/evolution3.png'

import './evolutiondescription.css'

const EvolutionDescription = () => {
  return (
    <div className='componentFirst evolutionDescriptionAnchor'>
      <div className='componentSecond'>
        <div className='evolutionDescription'>
          <div className='evolutionDescriptionTitle'>Evolve as you advance!</div>
          <div className='evolutionDescriptionText'>Everyone has access to the fundamentals. As you dive deeper into your learning journey you will earn items along the way, while also showing you in real time how to make use of the native technology on the blockchain. The NFT you earn here will be a representation of you in the metaverse. As you grow, and develop your skills in the No Fun Zone your NFT character will also power up and evolve with you.</div>
          <div className='evolutionDescriptionItemContainer'>
            <div className='evolutionDescriptionItem'>
              <div className='evolutionDescriptionItemImage'>
                <img src={evolutionImage1} alt='' style={{ width: '100%' }} />
              </div>
            </div>
            <div className='evolutionDescriptionItem'>
              <div className='evolutionDescriptionItemImage'>
                <img src={evolutionImage2} alt='' style={{ width: '100%' }} />
              </div>
            </div>
            <div className='evolutionDescriptionItem'>
              <div className='evolutionDescriptionItemImage'>
                <img src={evolutionImage3} alt='' style={{ width: '100%' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvolutionDescription
