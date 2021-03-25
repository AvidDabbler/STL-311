import React, {useState} from 'react'
import {Button} from '@material-ui/core'
import AddCircleIcon from '@material-ui/icons/AddCircle';

export default function Add({setFormVisability, formVisability}) {

    const clickHandle = (e) => {
        setFormVisability(!formVisability)

    }

    return (
        <div className='bottom-right-button'>
            <AddCircleIcon 
                color="primary" style={{ fontSize: 60 }}
                onClick={ e=> clickHandle(e) } />
        </div>
    )
}
