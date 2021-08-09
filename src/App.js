import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import TextField from '@material-ui/core/TextField';
import './App.css'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Aos from "aos";
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

function App() {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [country, setCountry] = useState([]);
  const [country2, setCountry2] = useState([]);
  const getWeather = (e) => {
    setOpen(true);
    e.preventDefault();
    Axios.get(`https://restcountries.eu/rest/v2/name/${country}`)
      .then(
        (response) => {
          console.log("response", response);
          setCountry2(response.data)
        }
      );
  }
  const [capital, setCapital] = useState([]);

  const getCapital = (e) => {
    setOpen1(true);
    e.preventDefault();
    Axios.get(`http://api.weatherstack.com/current?access_key=c32a8da7595e983d915cc727a55dd8f7&query=${country}`).then
      ((response) => {
        console.log("response", response);
        setCapital(response.data);
      }
      );
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handleClose1 = (event, reason) => {
    if (reason === 'clickaway') {
    }

    setOpen1(false);
  };
  return (<>
    <div>
      <div className="weatherBody">
        <div className="inputBody">
          <form style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
            <TextField className="textField" name="Country" id="outlined-basic" onChange={(e) => { setCountry(e.target.value) }} label="Enter Country Name" variant="outlined" />
            <button className="hvr-rectangle-in" onClick={getWeather} type="submit">Get Country Details</button>
          </form>
        </div>
      </div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <div>
          <h4 className="h4-font">Country Details</h4>
          <div className="snackbar" style={{ display: "flex", height: "50vh", width: "100%", justifyContent: "space-around", alignItems: "center", borderRadius: "200px", padding: "0 40px 0 80px", transform: "translateX(-55px)", marginBottom: "100px" }}>
            {country2.map((item) => (
              <div className="item-body" >
                <div style={{ display: "flex", alignItems: "center", }}>
                  <div >
                    <img src={item.flag} style={{ width: "150px", marginRight: "20px" }} />
                    <div className="data-item"><span style={{ color: "skyblue" }}>Name</span> : {item.name}</div>
                    <div className="data-item"><span style={{ color: "skyblue" }}>Capital</span> : {item.capital}</div>
                    <div className="data-item"><span style={{ color: "skyblue" }}>Population</span> : {item.population}</div>
                    <div className="data-item"><span style={{ color: "skyblue" }}>Region</span> : {item.region}</div>
                    <button className="item-btn" onClick={getCapital}>{item.capital}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </Modal>

      <Snackbar className="snackbar" open={open1} autoHideDuration={6000} onClose={handleClose1}>
        <div style={{ padding: "0 150px 0 150px", width: "auto", height: "10vh", display: "flex", justifyContent: "space-around", alignItems: "center", borderRadius: "90px" }}>
          {[capital].map((data) => (
            <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center" }}>
              <div className="items-type"><span className="span-type">Temperature:</span> {data.current?.temperature}</div>
              <div className="items-type"><span className="span-type">Humidity:</span> {data.current?.humidity}</div>
              <div className="items-type"><span className="span-type">Pressure:</span> {data.current?.pressure}</div>
              <div className="items-type"><span className="span-type">visibility:</span>{data.current?.visibility}</div>
              <div className="items-type"><span className="span-type">Weather Description:</span>{data.current?.weather_descriptions}</div>
            </div>
          ))}
        </div>
      </Snackbar>
    </div>
  </>)
}
export default App;
