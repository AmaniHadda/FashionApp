import React from 'react'
import GIF from './gif'
import Description from './Description'

export default function GD() {
  return (
    <div style={{display: "flex" }}>
        <GIF/>       
        <Description/>     
    </div>
  )
}
