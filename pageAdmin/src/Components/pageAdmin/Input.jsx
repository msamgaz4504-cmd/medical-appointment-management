import React from 'react'

function Input({ description, number, src, alt }) {
    return (
        <div className='inputAdmin'>
            <img src={src} alt={alt} width="50px" />
            <div className='inputAdmin'>
                <p className='description'>{description}</p>
                <p className='number'>{number}</p>
            </div>
        </div>
    )
}

export default Input
