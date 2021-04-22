//Child component - Display the data
import React from 'react';
import Header from '../components/Header.js';
import { useState ,useEffect } from "react";
import DashboardNav from "../components/DashboardNav";
import ConnectNav from "../components/ConnectNav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { HomeOutlined } from "@ant-design/icons";
import { createConnectAccount } from "../actions/stripe";
import { toast } from "react-toastify";
import queryString from "query-string";
import { sellerSpots } from '../actions/parking'
import { Card, Button } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
// import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '90vh',
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Details = (props) => {
   const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;

  const classes = useStyles();

  const history = useHistory(); 
  const [parkingObj, setParkingObj] = useState(props.location.state.parkingObj);
  const [date, setDate] = useState("");
  useEffect(() => {
    const { date } = queryString.parse(window.location.search);
    // useState(date);
    const dates = date.split(",");
    setDate(dates);
    console.log("PArking obj=====", parkingObj);
    console.log(props.location.state.parkingObj)
  }, []);
  const handleSubmit = () => {
      // toast.success("Booked Successfully");
      setTimeout(() => {
        history.push(`/payment`,{
          parkingObj:parkingObj,
          date:date
        });
      }, 1000);
    
    
    // axios.post(`${process.env.REACT_APP_API}/details`, parkingObj, {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={6} className={classes.image} >
        <img src={`${process.env.REACT_APP_API}/spot/image/${parkingObj._id}`} style={{height:'90vh'}}/>
        </Grid>
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
      <Card style={{border:'none',marginTop:'4rem' }}>
        <Card.Body>

        <Card.Title style={{fontSize:'3rem'}}>
            {parkingObj.title}
        </Card.Title>
        <Card.Text style={{fontSize:'1.5rem'}}>
                Location : {parkingObj.location}
                <br/>
                {parkingObj.content}
                <br/>
                Price : {parkingObj.price}
                <br/>
                From : {date[0]}
                <br/>
                To : {date[1]}
                <br/>
                Slots : {parkingObj.slots}
        </Card.Text>
          <Button variant="primary" onClick={handleSubmit}>
            Confirm Booking and Pay now</Button>
        </Card.Body>
      </Card>
      </Grid>
    </Grid>
  );
    // return (
      // <Card style={{border:'none',marginTop:'4rem' }}>
      //   <Card.Body>
      //     <img src={`${process.env.REACT_APP_API}/spot/image/${parkingObj._id}`} />

      //   <Card.Title style={{fontSize:'3rem'}}>
      //       {parkingObj.title}
      //   </Card.Title>
      //   <Card.Text style={{fontSize:'1.5rem'}}>
      //           Location : {parkingObj.location}
      //           <br/>
      //           {parkingObj.content}
      //           <br/>
      //           Price : {parkingObj.price}
      //           <br/>
      //           From : {date[0]}
      //           <br/>
      //           To : {date[1]}
      //           <br/>
      //           Slots : {parkingObj.slots}
      //   </Card.Text>
      //     <Button variant="primary" onClick={handleSubmit}>
      //       Confirm Booking and Pay now</Button>
      //   </Card.Body>
      // </Card>
    // );

}


 export default Details;
