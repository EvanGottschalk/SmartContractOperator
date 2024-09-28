import React from 'react'
import Syllabus from '../../components/syllabus/Syllabus'
import Banner from '../../components/banner/Banner'

import './modulepage.css'

const ModulePage = () => {
  return (
    <div className='modulepage'>
      <Banner />
      <Syllabus />
    </div>
  )
}

export default ModulePage
