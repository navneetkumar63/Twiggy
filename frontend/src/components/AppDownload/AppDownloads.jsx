import React from 'react'
import "./AppDownload.css"
import { assets } from '../../assets/assets'

const AppDownloads = () => {
  return (
    <div className='app-download' id='app-download'>
      <p>For Better Experience Download <br /> Tomato App</p>
      <div className='app-download-platforms' >
        <img src={assets.play_store} id=''/>
        <img src={assets.app_store} alt=''/>

      </div>

      
    </div>
  )
}

export default AppDownloads