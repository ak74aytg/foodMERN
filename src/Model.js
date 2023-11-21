import React from 'react'
import { createPortal } from 'react-dom'
import "./model.css";


function Model({isOpen, onClose, children}) {
    if(!isOpen)return null;
  return createPortal(
    <div className='modal'>
       <div className='modal-container'>
           <button className='close' onClick={onClose}>×</button>
           { children }
       </div>
    
   </div>
    ,
    document.getElementById("root-model")
  )
}

export default Model