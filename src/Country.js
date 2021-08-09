import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import TextField from '@material-ui/core/TextField';


function Country() {
    const [capital, SetCapital] = useState([]);

    const getCapital = (e) => {
        e.preventDefault();
        axios.get(`http://api.weatherstack.com/current?access_key=c32a8da7595e983d915cc727a55dd8f7&query=${item.capital}`).then
            ((response) => {
                console.log("response", response);
            }
            );
    }
    return (
        <div>
            <form style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
                <TextField className="textField" name="Country" id="outlined-basic" onChange={(e) => { SetCapital(e.target.value) }} label="Enter Country Name" variant="outlined" />
                <button className="hvr-rectangle-in" onClick={getCapital} type="submit">Get Capital</button>
            </form>
        </div>
    )
}

export default Country;
