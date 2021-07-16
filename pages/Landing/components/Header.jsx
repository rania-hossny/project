import React from 'react'
import Navbar from './Navbar'
import image from '../images/image.jpg'
function Header() {
    return (
        <div id="main">
            <Navbar/>
            <div className="name">
                
                <h1>
                    
                   <p><span>
                        Mates </span>for Teamwork
                        </p>
                    
                    <>
                    How To Make Dynamic Website Using 
                     How To Make Dynamic Website Using 
                    </>
                </h1>
                
                <img src={image}/>

            </div>
    
        </div>
    )
}

export default Header
