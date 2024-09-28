import React from 'react'

//import description1 from '../../image/description1.png'
//import description2 from '../../image/description2.png'
//import description3 from '../../image/description3.png'
//import description4 from '../../image/description4.png'



import './pagedescription.css'

const PageDescription = () => {
  return (
      <div className='description'>
        <div className='descriptionImages'>
          <div className='descriptionLeft'>
            <div className='descriptionBox'>
              <img alt='' className='descriptionBoxIMG1' />
            </div>
          </div>
          <div className='descriptionRight'>
            <div className='descriptionRightTop'>
              <div className='descriptionBox'>
                <img alt='' className='descriptionBoxIMG2' />
              </div>
            </div>
            <div className='descriptionRightBottom'>
              <div className='descriptionRightBottomLeft'>
                <div className='descriptionBox'>
                  <img alt='' className='descriptionBoxIMG3' />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='descriptionTextContainer'>
          <div className='descriptionTitle textHighlight'></div>
          <div className='descriptionText descriptionAnchor'>
          The No Fun Zone is your launch pad for learning the essential elements of blockchain technology, Decentralized Autonomous Organizations (DAOs), NonFungible Tokens, and DeFi. The No Fun Zone will equip you with the fundamentals to empower you to co-create the future with people worldwide
          </div>
        </div>
      </div>
      
  )
}

export default PageDescription
