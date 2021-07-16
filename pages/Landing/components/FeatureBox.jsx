import React from 'react'

function FeatureBox(props) {
    return (
        <div className="a-box">
            <div className='a-b-img'>
                <img src={props.image} />
            </div>
            <div className="s-b-text">
                <h1>{props.title}</h1>
                <p>
               {props.des}
                </p>
                
            </div>
        </div>
    )
}

export default FeatureBox
