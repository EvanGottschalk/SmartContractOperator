import React from 'react'

//import syllabus1 from '../../image/syllabus1.png'
//import syllabus2 from '../../image/syllabus2.png'
//import syllabus3 from '../../image/syllabus3.png'
//import syllabus4 from '../../image/syllabus4.png'

import syllabusEvolveButton from '../../image/button-evolve.png'

import './syllabus.css'

console.log(window.location)


const Syllabus = () => {
  return (
      <div className='syllabus'>
        <div className='syllabusTextContainer'>
          <div className='syllabusTitle textHighlight syllabusAnchor'></div>
          <div className='syllabusText'>
          This module aims to give you the tools necessary to kick off your blockchain journey, no matter your level of understanding of the current crypto landscape or trends. The No Fun Zone is here to guide you every step of the way. We will start with a fully accessible module — like this one. As we advance, future modules are locked until you have confirmed your understanding of the curriculum scope.
          </div>
          <div className='syllabusText'>
          It is important you pay close attention because you will be able to find easter eggs along the way. There are opportunities for you to test your skills along the way, and through that incentives.
          </div>
          <div className='syllabusText'>
          We gather weekly on Wednesdays at 7 PM EST / 4PM PST, and Friday mornings at 11AM EST / 8 AM PST. Join the telegram group to get up to date information.
          </div>
          <div className='syllabusText'>
          ___________________________________________________________________________<br></br><br></br>
          START<br></br>
          To begin you will learn about the following topics.<br></br><br></br>
          <u>What is Blockchain?</u><br></br>
          - Explain it like I am 5<br></br>
          - How does it work?<br></br>
          - Why should we care about blockchain?<br></br>
          - Why is there a need for blockchain?<br></br><br></br>
          <u>Terminology of Web3</u><br></br>
          - What is self sovereignty<br></br>
          - Centralization & Decentralization<br></br><br></br>
          <u>Hot and Cold Wallets</u><br></br>
          1. Create a wallet<br></br>
          2. Add funds to your crypto wallet<br></br>
          3. Set up cold wallet storage<br></br>
          4. About DEX’s vs. CEX’s<br></br><br></br>
          Identity On Chain<br></br>
          - Decentralized IDs (ZK proof ID)<br></br>
          - Set up your wallet and KYC the person to the No Fun Zone to eliminate bots from joining<br></br>
          - Create a decentralized identity.<br></br><br></br>
          NFTS (¿Qué son los NFTs?)<br></br>
          a. Fundamentals<br></br>
          b. Basic, and how they can be a part of your identity on the blockchain<br></br>
          c. Mint your first NFT, which will be your access pass to the rest of the modules<br></br><br></br>
          IMPORTANT TO KNOW:<br></br>
          Safety and Security<br></br>
          What is Cryptocurrency?<br></br>
          - History of Currency<br></br>
          - What is a token<br></br>
          - What are they used for?<br></br>
          - How to get them.<br></br>
          - Financial literacy statement.<br></br><br></br>
          WHAT WILL I GET OUT OF THIS MODULE?<br></br>
          When you complete this module you will have created a wallet, added funds to it, learned about NFTs, and minted my own Guardian Pass NFT!
          </div>
        </div>
        <div className='syllabusEvolveButton'>
          <a href={window.location['href'] + '/test'}>
            <img className='syllabusEvolveButtonImage' src={syllabusEvolveButton} alt='Evolve' />
          </a>
        </div>
      </div>
      
  )
}

export default Syllabus
