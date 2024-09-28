import React from 'react'
import Dev from '../../components/dev/Dev'
import AvatarInfo from '../../components/avatarinfo/AvatarInfo'


import './devpage.css'

const DevPage = () => {
  return (
    <div className='devPage'>
      <Dev />
      <AvatarInfo />
    </div>
  )
}

export default DevPage
