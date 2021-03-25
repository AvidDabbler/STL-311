import React, { useState, useEffect } from 'react'
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';


const DropdownField = ({list, obj, setFunction, desc}) => {
    return(
        <>
            <Select
                // className={classes.selectEmpty}
                name={desc}
                label={desc}
                onChange={e=>setFunction(e.target.value)}
                // inputProps={{ 'aria-label': 'age' }}
                >
                <option value="" disabled>
                    Placeholder
                </option>
                {list.map(el=> <option value={el}>{el}</option>)}
            </Select>
            <FormHelperText>{desc}</FormHelperText>
        </>
    )
}


export default function NewRequest({ formVisability, dropdown}) {
    // Problem Dropdown
    const [probList, setProbList] = useState([])
    const [prob, setProb] = useState('')

    // Description Dropdown
    const [descList, setDescList] = useState([])
    const [desc, setDesc] = useState('')

    // Location Description
    const [locDesc, setLocDesc] = useState('')
    
    // Long Description
    const [longDesc, setLongDesc] = useState('')

    // GPS Coordinates
    const [loc, setLoc] = useState('')

    // Photo Attachment
    const [photo, setPhoto] = useState('')


    // inititial load
    useEffect(() => {
        const list = async () => {
            const l = await Object.keys(await dropdown)
            setProbList(await l)
        }
        list()
    }, [dropdown])

    // dropdown change
    useEffect(()=>{
        prob ? setDescList(Object.keys(dropdown[prob])) : ''
    }, [prob, desc])

    const getCoord = (e) => {        

        function success(position) {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLoc(`${latitude},${longitude}`)
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        navigator.geolocation.getCurrentPosition(success, error);
    }


    return (
        <div>
            {formVisability ?
                <div className='new-request-form'>
                    <h1 >New Request Form</h1>
                    <form className='form'>
                        <DropdownField list={probList} obj={dropdown} setFunction={setProb} desc='Problem Category' />
                        {descList.length > 1 ? <DropdownField list={descList} obj={dropdown[prob]} setFunction={setDesc} desc='Problem Description' /> : ''}
                        <TextField id="standard-basic" label="Location Description" onChange={e=>setLocDesc(e.target.value)} />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Long Description"
                            multiline
                            rows={4}
                            onChange={e=>setLongDesc(e.target.value)}
                            />
                        <div className='row' style={{ padding: '20px' }}>
                            <GpsFixedIcon
                                color="primary" style={{ fontSize: 50, paddingRight: '20px' }}
                                onClick={ e=> getCoord(e) }
                                />
                            <p>Share your location</p>
                        </div>
                    </form>
                </div> :
                ''

            }
        </div>
    )
}
