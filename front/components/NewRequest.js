import React, {useState} from 'react'

export default function NewRequest({formVisability}) {
    const [desc, setDesc] = useState('')
    const [loc, setLoc] = useState('')
    const [photo, setPhoto] = useState('')
    const [locDesc, setLocDesc] = useState('')
    // const [desc, setDesc] = useState('')

    return (
        <div>
            {formVisability?
                <div className='new-request-form'>
                    <form>
                        <input type='text' />
                        <input type='text' />
                        <input type='text' />
                        <input type='text' />
                    </form>
                </div> :
                ''

            }        
        </div>
    )
}
