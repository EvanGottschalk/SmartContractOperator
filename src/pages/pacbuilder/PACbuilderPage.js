import React from 'react'
import GameGUI from '../../components/gamegui/GameGUI'
import PACbuilderGUI from '../../components/pacbuildergui/PACbuilderGUI'


import './pacbuilderpage.css'

const PACbuilderPage = () => {
  return (
    <div className='pacbuilderpage'>
      <PACbuilderGUI />
      <GameGUI />
    </div>
  )
}

export default PACbuilderPage
