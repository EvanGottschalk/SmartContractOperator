import React from 'react'

import about_banner from '../../image/about-banner.png'



import './about.css'

const About = () => {
  return (
    <div className='aboutContainer'>
      <div className='banner_FullWidth aboutBanner'>
        <img className="aboutBannerImage" id="aboutBannerImage" src={about_banner} alt='About' />
      </div>
    </div>
  )
}

export default About
