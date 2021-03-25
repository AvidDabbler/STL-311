import React, { useState, useEffect } from 'react'
import NativeSelect from '@material-ui/core/NativeSelect';

import dropdown from '../data/dropdown.json'

const DropdownField = ({list, obj}) => {
    return(
        <>
            <NativeSelect
                // className={classes.selectEmpty}
                // value={state.age}
                // name="age"
                // onChange={handleChange}
                // inputProps={{ 'aria-label': 'age' }}
                >
                <option value="" disabled>
                    Placeholder
                </option>
                {list.map(el=> <option value={el}>{el}</option>)}
            </NativeSelect>
        </>
    )
}


export default function NewRequest({ formVisability }) {
    const [desc, setDesc] = useState('')
    const [loc, setLoc] = useState('')
    const [photo, setPhoto] = useState('')
    const [locDesc, setLocDesc] = useState('')

    // dropdown lists
    const [probList, setProbList] = useState([])
    const [descList, setDescList] = useState([])

    useEffect(() => {
        const list = async () => {
            const l = await Object.keys(await dropdown)
            console.log(l)
            setProbList(await l)
        }
        list()
    }, [dropdown])


    return (
        <div>
            {formVisability ?
                <div className='new-request-form'>
                    <h1 >New Request Form</h1>
                    <form className='form'>
                        <DropdownField list={probList} obj={dropdown} />
                        <input type='text' className='input' />
                        <input type='text' className='input' />
                        <input type='text' className='input' />
                    </form>
                </div> :
                ''

            }
        </div>
    )
}
