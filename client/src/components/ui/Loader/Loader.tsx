import React from 'react'
import {StyledLoader} from './Loader.styled'
import yellow from 'assets/images/loading/yellow.png'
import brown from 'assets/images/loading/brown.png'
import red from 'assets/images/loading/red.png'
import blue from 'assets/images/loading/blue.png'

const Loader = () => {
    return (
        <StyledLoader>
            <div className="text-loading-wrapper">
                <div className="text-loading">
            <span className="yellow">
                <img className="yellow-image" src={yellow} alt="yellow"/>
            </span>
                    <span className="red">
                <img className="red-image" src={red} alt="red"/>
            </span>
                    <span className="brown">
                <img className="brown-image" src={brown} alt="brown"/>
            </span>
                    <span className="blue">
                <img className="blue-image" src={blue} alt="blue"/>
            </span>
                </div>
            </div>
        </StyledLoader>
    )
}

export default Loader
