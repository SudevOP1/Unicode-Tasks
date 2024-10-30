import React from 'react'

const CheckBoxComponent = ({completed, width, height}) => {
  return (
    <div style={{
        display: "inline-block",
        marginLeft: "10px",
        marginTop: "5px",
        height: height,
        width: width,
        borderRadius: "1000px",
        backgroundColor: completed? "green" : "red",
        cursor: "pointer",
    }}></div>
  )
}

export default CheckBoxComponent