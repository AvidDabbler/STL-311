import React, { useState, useEffect } from 'react'
import Select from '@material-ui/core/Select';


const DropdownField = ({list, obj, setFunction}) => {
    return(
        <>
            <Select
                // className={classes.selectEmpty}
                // value={state.age}
                // name="age"
                onChange={e=>setFunction(e.target.value)}
                // inputProps={{ 'aria-label': 'age' }}
                >
                <option value="" disabled>
                    Placeholder
                </option>
                {list.map(el=> <option value={el}>{el}</option>)}
            </Select>
        </>
    )
}


export default function NewRequest({ formVisability, dropdown}) {
    const [prob, setProb] = useState('')
    const [desc, setDesc] = useState('')
    const [loc, setLoc] = useState('')
    const [photo, setPhoto] = useState('')
    const [locDesc, setLocDesc] = useState('')

    // dropdown lists
    const [probList, setProbList] = useState([])
    const [descList, setDescList] = useState([])

    // inititial load
    useEffect(() => {
        const list = async () => {
            const l = await Object.keys(await dropdown)
            console.log(l)
            setProbList(await l)
        }
        list()
    }, [dropdown])

    // dropdown change
    useEffect(()=>{
        prob ? setDescList(Object.keys(dropdown[prob])) : ''
    }, [prob, desc])


    return (
        <div>
            {formVisability ?
                <div className='new-request-form'>
                    <h1 >New Request Form</h1>
                    <form className='form'>
                        <DropdownField list={probList} obj={dropdown} setFunction={setProb} />
                        {descList.length > 1 ? <DropdownField list={descList} obj={dropdown[prob]} setFunction={setDesc} /> : ''}
                        <input type='text' className='input' />
                        <input type='text' className='input' />
                    </form>
                </div> :
                ''

            }
        </div>
    )
}
