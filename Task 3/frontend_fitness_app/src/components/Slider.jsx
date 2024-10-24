import React from 'react'

const Slider = ({percent}) => {
  return (
    <div style={{
        width: "100%",
        height: "100%",
        border: "3px solid black",
        borderRadius: "1000px",
        overflow: "hidden"
    }}>
        <div style={{
            width: `${percent}%`,
            height: "100%",
            background: "black",
            borderRadius: "1000px"
        }}>
        </div>
    </div>
  )
}

export default Slider
