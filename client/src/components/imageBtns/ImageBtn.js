import "./ImageBtn.css"

import React from 'react'

const ImageBtn = ({image,datakey,slideImage}) => {

  return (
    <div className="img-item" key={datakey} onClick={()=>slideImage(datakey)}>
   
     <img src={image} alt="shoe image" id="mainImg" />
    
     </div>
  )
}

export default ImageBtn