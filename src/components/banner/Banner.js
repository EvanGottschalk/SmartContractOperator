import React from 'react'

import homeBanner from '../../image/banner-home.png'

import module0SyllabusBanner from '../../image/banner-module0-syllabus.png'
import module0TestBanner from '../../image/banner-module0-test.png'

import playButton from '../../image/play-button.png'

import './banner.css'

const game_page_URL = window.location['origin'] + '/game';

var banner = homeBanner;
if (window.location['pathname'].includes('/module0')) {
  if (window.location['pathname'].includes('/test')) {
    banner = module0TestBanner;
  } else {
    banner = module0SyllabusBanner;
  }
}

const Banner = () => {
  return (
    <div className='bannerContainer'>
      <div className='banner'>
        <img src={banner} alt='' className='banner' />
        <div className='playButtonContainer'>
          <a href={game_page_URL}>
            <img src={playButton} alt='' className='playButton'/>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Banner