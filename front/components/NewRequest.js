import React, { useState, useEffect } from 'react'
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import GpsFixedIcon from '@material-ui/icons/GpsFixed';
import CheckIcon from '@material-ui/icons/Check';
import { Button } from '@material-ui/core';
import { loadModules } from 'esri-loader';


const DropdownField = ({ list, obj, setFunction, desc }) => {
    return (
        <>
            <Select
                // className={classes.selectEmpty}
                name={desc}
                label={desc}
                onChange={e => setFunction(e.target.value)}
            // inputProps={{ 'aria-label': 'age' }}
            >
                <option value="" disabled>
                    Placeholder
                </option>
                {list.map(el => <option value={el}>{el}</option>)}
            </Select>
            <FormHelperText>{desc}</FormHelperText>
        </>
    )
}


export default function NewRequest({ formVisability, dropdown }) {
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
    const [geocode, setGeocode] = useState('')

    // Photo Attachment
    // const [photo, setPhoto] = useState('')

    let key = process.env.NEXT_PUBLIC_ESRI_API_KEY

    

    // inititial load
    useEffect(() => {
        const list = async () => {
            const l = await Object.keys(await dropdown)
            setProbList(await l)
        }
        list()
    }, [dropdown])

    // dropdown change
    useEffect(() => {
        prob ? setDescList(Object.keys(dropdown[prob])) : ''
    }, [prob, desc])

    useEffect(()=>{
        reverseGeo(loc)
    }, [loc])

    const reverseGeo = (coor) =>{
        loadModules([
            "esri/config",
            "esri/tasks/locator"
            ])
        .then(function ([Locator]){
            esriConfig.apiKey = key
            const geocodeurl = 'https://maps6.stlouis-mo.gov/arcgis/rest/services/GEOCODERS/COMPOSITE_GEOCODE/GeocodeServer'
            const locator = new Locator(geocodeurl);
            locator.locationToAddress({location: coor})
        })
        .then(address =>{
            setGeocode(address)
        }).catch(error=>console.log(error))
        
    }

    const getCoord = (e) => {

        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setLoc(`${latitude},${longitude}`)
        }

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }

        navigator.geolocation.getCurrentPosition(success, error)

    }

    const clickHandle = () => {
        if (prob == '' ||
            desc == '' ||
            locDesc == '' ||
            longDesc == '' ||
            loc == '') {
            return;
        }
        let twitterUrl = `https://twitter.com/intent/tweet?screen_name=stscb&ref_src=twsrc%5Etfw&text=%0AProblem:${prob}%0ADesc:${desc}%0ALoc Desc:${locDesc}%0ALongDesc:${longDesc}%0Address:${geocode}`
        window.open(twitterUrl, '_blank');
    }


    return (
        <div>
            {formVisability ?
                <div className='new-request-form'>
                    <h1 >New Request Form</h1>
                    <form className='form'>
                        <DropdownField list={probList} obj={dropdown} setFunction={setProb} desc='Problem Category' />
                        {descList.length > 1 ? <DropdownField list={descList} obj={dropdown[prob]} setFunction={setDesc} desc='Problem Description' /> : ''}
                        <TextField
                            id="standard-basic"
                            label="Location Description"
                            required={true}
                            onChange={e => setLocDesc(e.target.value)} />
                        <TextField
                            id="standard-multiline-flexible"
                            label="Long Description"
                            multiline
                            rows={4}
                            required={true}
                            onChange={e => setLongDesc(e.target.value)}
                        />
                        {/* <input type="file" style={{ paddingTop: '20px' }} /> */}
                        <div className='row' style={{ padding: '20px' }}>
                            <GpsFixedIcon
                                color="primary" style={{ fontSize: 50, paddingRight: '20px' }}
                                onClick={e => getCoord(e)}
                            />
                            <p style={{ paddingRight: '20px' }}>Share your location </p>
                            {loc ? <CheckIcon style={{ fontSize: 50, paddingRight: '20px', color: '#F78243' }} /> : ''}
                        </div>
                        <Button
                            type='submit'
                            style={{ width: '100%', height: '30px', backgroundColor: 'red' }}
                            onClick={() => clickHandle()}>
                            Tweet it
                    </Button>
                    </form>
                </div> :
                ''

            }
        </div>
    )
}
