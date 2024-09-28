import React from 'react'
import ModuleTest from '../../components/moduletest/ModuleTest'
import Banner from '../../components/banner/Banner'

import './moduletestpage.css'

const ModuleTestPage = () => {
  return (
    <div className='moduletest'>
      <Banner />
      <ModuleTest />
    </div>
  )
}

export default ModuleTestPage
