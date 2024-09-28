import React, { useState } from 'react'

import { ReactComponent as PlusSVG } from '../../icons/Plus.svg'
import { ReactComponent as MinusSVG } from '../../icons/Minus.svg'

import './faq.css'

const FAQ = () => {
  const [one, setOne] = useState(false)
  const [two, setTwo] = useState(false)
  const [three, setThree] = useState(false)
  const [four, setFour] = useState(false)
  return (
    <div className='componentFirst faqScroll'>
      <div className='componentSecond'>
        <div className='faq'>
          <div className='faqTitle textHighlight'>FAQ</div>
          <div className='roadmapSubTitle'></div>
          <div className='faqContainer'>
            <div className='faqItem' onClick={() => setOne(!one)}>
              <div className='faqItemLeft'>
                <div className='faqItemTitle'>What is Alchm?</div>
              </div>
              <div className='faqItemRight'>{one ? <MinusSVG /> : <PlusSVG />}</div>
            </div>
            {one && (
              <div className='faqItemAnswer'>
                <div className='faqItemAnswerText'>
                  Alchm is a cutting-edge NFT campaign with a model unlike any other. Rather than relying on
                  random algorithms to generate outfits and expressions, Alchm uses generative machine learning
                  AI to create custom avatars specific to you and unique to your personal astrology. By holding
                  an Alchm NFT, you gain access to an ever-increasing array of premium tools for better understanding
                  the way the universe affects your present, future and past. Know your Alchemy.
                </div>
              </div>
            )}
            <div className='faqItem' onClick={() => setTwo(!two)}>
              <div className='faqItemLeft'>
                <div className='faqItemTitle'>How do I mint my custom NFT?</div>
              </div>
              <div className='faqItemRight'>{two ? <MinusSVG /> : <PlusSVG />}</div>
            </div>
            {two && (
              <div className='faqItemAnswer'>
                <div className='faqItemAnswerText'>
                  Simply scroll to the top of this page (alchm.xyz) and fill in your birthday, birth time and
                  birth city and state. While only the birthday is mandatory, adding more information increases
                  the accuracy of the generative AI. Then, connect your web wallet (such as MetaMask),
                  and click "Mint". Own your Alchemy.
                </div>
              </div>
            )}
            <div className='faqItem' onClick={() => setThree(!three)}>
              <div className='faqItemLeft'>
                <div className='faqItemTitle'>How are Alchm Avatars generated?</div>
              </div>
              <div className='faqItemRight'>{three ? <MinusSVG /> : <PlusSVG />}</div>
            </div>
            {three && (
              <div className='faqItemAnswer'>
                <div className='faqItemAnswerText'>
                  By entering your birth time and birth location, the positions and angles of the planets and stars
                  relative to you at the exact moment of your birth can be calculated using basic astrophysics. Then,
                  that information is used to determine your unique elemental dignities, tarot card affinities,
                  decan-specific effects, and spirit, matter, essence and substance effect multipliers. Finally,
                  these values are fed to our generative machine learning AI, which weighs all of this information
                  to create your Alchm Avatar. Be your Alchemy.
                </div>
              </div>
            )}

            <div className='faqItem' onClick={() => setFour(!four)}>
              <div className='faqItemLeft'>
                <div className='faqItemTitle'>What do I unlock with my Alchm NFT?</div>
              </div>
              <div className='faqItemRight'>{four ? <MinusSVG /> : <PlusSVG />}</div>
            </div>
            {four && (
              <div className='faqItemAnswer'>
                <div className='faqItemAnswerText'>
                  By minting your personal Alchm Avatar NFT, you gain access to all of the alchemical information
                  calculated by our alchemy analysis algorithm ("The Alchmizer"). On top of that, you can visit our
                  site every day to see even more information about how your specific alchemy is modified by that
                  day's arrangement of the planets, stars, constellations, and Moon phase. Advance your Alchemy.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
