import React from 'react'

const BentoBox = ({
    width,
    height,
    color,
    children,
    martop,
}) => {
    return (
        <div
            style={{
                width: width,
                height: height,
                background: color,
                borderRadius: "20px",
                margin: "2vh",
                marginTop: martop ? martop: "2vh",

            }}
        >
            {children}
        </div>
    )
}

export default BentoBox