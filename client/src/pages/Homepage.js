import React, { useRef, useEffect, useState } from 'react';
import {Button,Row, Col, Form, InputGroup, FormControl} from 'react-bootstrap';
import Header from '../components/Header.js';
import './homepage.css'
import ParkingLotImg from '../assets/images/parkingLot.jpg';
import searchImg from '../assets/images/searchImg.png';
import listImg from '../assets/images/listImg.png';
import onlinePayImg from '../assets/images/onlinePayImg.jpg';
import bookingImg from '../assets/images/bookingImg.png';
import Footer from '../components/Footer.js';
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useHistory } from 'react-router-dom';
import  SmoothRender  from  'react-smooth-render';

const { RangePicker } = DatePicker;

function Homepage() {
     const history = useHistory(); 
    const [date, setDate] = useState("");
      const handleSubmit = () => {
      history.push(`/search-result?date=${date}`)
    console.log("clicked");
  }

    return (
        <>
            <div className="LandingBanner">
                <div className="searchForm">
                <Form>
                    <h1 style={{color:'white',fontSize:'3rem'}}>
                                Book Your Parking
                        </h1>
                            <div className="d-flex pb-4">
                        <RangePicker
                            onChange={(value, dateString) => setDate(dateString)}
                            disabledDate={(current) =>
                            current && current.valueOf() < moment().subtract(1, "days")
                            }
                            style={{marginLeft:540}}
                            className="w-40"
                            />
                            {<><Button id="BookBtn"
                            onClick={handleSubmit}
                            style={{marginRight:540,marginTop:360}}
                                >Search</Button></>}
                                </div>
                </Form>
                </div>
            </div>
            <Row className="rowReactBoot">
                <h1 className="headingStep1">
                    How To Book A Parking
                </h1>
            </Row>
            <Row className="rowReactBoot">
                <Col lg={6} md={6} sm={6} style={{paddingTop:'9%',textAlign:'left',paddingLeft:'4%'}}>
                    <span style={{fontSize:'1.5rem',fontWeight:'500'}}>STEP 1</span>
                    <br/>
                    <span style={{fontSize:'1.5rem',fontWeight:'400'}}>Search for a location where you want a parking location and You will get all parking 
                    spots within 10 kms range of the destination location.</span>
                </Col>
                <Col lg={6} md={6} sm={6}>
                    <img style={{height:'100%',width:'100%'}} src={searchImg} />
                </Col>
            </Row>
            <Row className="rowReactBoot">
                <Col lg={6} md={6} sm={6}>
                    <img style={{height:'90%',width:'85%'}} src={listImg} />
                </Col>
                <Col lg={6} md={6} sm={6} style={{paddingTop:'9%',textAlign:'right',paddingRight:'4%'}}>
                    <span style={{fontSize:'1.5rem',fontWeight:'500'}}>STEP 2</span>
                    <br/>
                    <span style={{fontSize:'1.5rem',fontWeight:'400'}}>Select a suitable parking location
                    fulfilling your needs and select it to know its details</span>
                </Col>
            </Row>
            <Row className="rowReactBoot">
                <Col lg={6} md={6} sm={6} style={{paddingTop:'9%',textAlign:'left',paddingLeft:'4%'}}>
                    <span style={{fontSize:'1.5rem',fontWeight:'500'}}>STEP 3</span>
                    <br/>
                    <span style={{fontSize:'1.5rem',fontWeight:'400'}}>After seeing the details of the parking
                    space and its reviews by other users, if u wish to go ahead with it, select your 
                    mode of payment and go ahead to confirm the booking</span>
                </Col>
                <Col lg={6} md={6} sm={6}>
                    <img style={{height:'100%',width:'100%'}} src={bookingImg} />
                </Col>
            </Row>
            <Row className="rowReactBoot">
                <Col lg={6} md={6} sm={6}>
                    <img style={{height:'91%',width:'85%'}} src={onlinePayImg} />
                </Col>
                <Col lg={6} md={6} sm={6} style={{paddingTop:'9%',textAlign:'right',paddingRight:'4%'}}>
                    <span style={{fontSize:'1.5rem',fontWeight:'500'}}>STEP 4</span>
                    <br/>
                    <span style={{fontSize:'1.5rem',fontWeight:'400'}}>Use the before-mentioned mode of
                    payment, pay the booking cost and voila, your parking is booked right 
                    from your home.</span>
                </Col>
            </Row>
            <Row className="rowReactBoot">
                <h1 className="headingStep1">
                    Aimed at Cities -
                </h1>
            </Row>
            <Row className="rowReactBoot" style={{marginTop:'3rem'}}>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg1">
                        <div className="textCityImg">
                            Delhi
                        </div>
                    </div>
                </Col>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg2">
                        <div className="textCityImg">
                            Mumbai
                        </div>
                    </div>
                </Col>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg3">
                        <div className="textCityImg">
                            Kolkata
                        </div>
                    </div>
                </Col>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg4">
                        <div className="textCityImg">
                            Chennai
                        </div>
                    </div>
                </Col>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg5">
                        <div className="textCityImg">
                            Hyderabad
                        </div>
                    </div>
                </Col>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg6">
                        <div className="textCityImg">
                            Bengaluru
                        </div>
                    </div>
                </Col>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg7">
                        <div className="textCityImg">
                            Lucknow
                        </div>
                    </div>
                </Col>
                <Col lg={3} sm={3} className="ImgDiv">
                    <div className="CityImg8">
                        <div className="textCityImg">
                            Chandigarh
                        </div>
                    </div>
                </Col>
            </Row>
            <Footer/>
        </>
    )
}

export default Homepage
