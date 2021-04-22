import React, {useEffect} from 'react';
import './paymentPage.css';
import $, {onClick} from 'jquery';
import { updateSpot } from '../actions/parking'
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

function PaymentPage(props) {
     const history = useHistory(); 
     const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
    console.log("PAYMENT PAGE PROPS",props);
    useEffect(() => {
        console.log("PAYMENT PAGE+++++",props.location)
        $(document).ready(function(){
            //Menu Toggle Script
            $("#menu-toggle").click(function(e) {
            e.preventDefault();
            $("#wrapper").toggleClass("toggled");
            });
            
            // For highlighting activated tabs
            $("#tab1").click(function () {
            $(".tabs").removeClass("active1");
            $(".tabs").addClass("bg-light");
            $("#tab1").addClass("active1");
            $("#tab1").removeClass("bg-light");
            });
            $("#tab2").click(function () {
            $(".tabs").removeClass("active1");
            $(".tabs").addClass("bg-light");
            $("#tab2").addClass("active1");
            $("#tab2").removeClass("bg-light");
            });
            $("#tab3").click(function () {
            $(".tabs").removeClass("active1");
            $(".tabs").addClass("bg-light");
            $("#tab3").addClass("active1");
            $("#tab3").removeClass("bg-light");
            });
            })
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            console.log(token, props.location.state.parkingObj, props.location.state.parkingObj._id);
            let res = updateSpot(props.location.state.parkingObj, props.location.state.parkingObj._id);
            console.log("Spot UPDATE RES", res);
    //   toast.success(`${res.data.title} is updated`);
    } catch (err) {
      console.log(err);
    //   toast.error(err.response.data.err);
        }
         toast.success("BOOKING SUCCESSFUL");
            history.push('/');
    };
    
    return (
        <>
            <div className="container-fluid px-0" id="bg-div">
    <div className="row justify-content-center">
        <div className="col-lg-9 col-12">
            <div className="card card0">
                <div className="d-flex" id="wrapper">
                    <div className="bg-light border-right" id="sidebar-wrapper">
                        <div className="sidebar-heading pt-5 pb-4"><strong>PAY WITH</strong></div>
                        <div className="list-group list-group-flush"> <a data-toggle="tab" href="" id="tab1" className="tabs list-group-item bg-light">
                                <div className="list-div my-2">
                                    <div className="fa fa-home"></div> &nbsp;&nbsp; Bank
                                </div>
                            </a> <a data-toggle="tab" href="" id="tab2" className="tabs list-group-item active1">
                                <div className="list-div my-2">
                                    <div className="fa fa-credit-card"></div> &nbsp;&nbsp; Card
                                </div>
                            </a> <a data-toggle="tab" href="" id="tab3" className="tabs list-group-item bg-light">
                                <div className="list-div my-2">
                                    <div className="fa fa-qrcode"></div> &nbsp;&nbsp;&nbsp; Visa QR <span id="new-label">NEW</span>
                                </div>
                            </a> </div>
                    </div>
                    <div id="page-content-wrapper">
                        <div className="row pt-3" id="border-btm">
                            <div className="col-4"> <button className="btn btn-success mt-4 ml-3 mb-3" id="menu-toggle">
                                    <div className="bar4"></div>
                                    <div className="bar4"></div>
                                    <div className="bar4"></div>
                                </button> </div>
                            <div className="col-8">
                                <div className="row justify-content-right">
                                    <div className="col-12">
                                        <p className="mb-0 mr-4 mt-4 text-right">customer@email.com</p>
                                    </div>
                                </div>
                                <div className="row justify-content-right">
                                    <div className="col-12">
                                                    <p className="mb-0 mr-4 text-right">Pay <span className="top-highlight">
                                                         Rs 100</span> </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row justify-content-center">
                            <div className="text-center" id="test">Pay</div>
                        </div>
                        <div className="tab-content">
                            <div id="menu1" className="tab-pane">
                                <div className="row justify-content-center">
                                    <div className="col-11">
                                        <div className="form-card">
                                            <h3 className="mt-0 mb-4 text-center">Enter bank details to pay</h3>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="input-group"> <input type="text" id="bk_nm" placeholder="BBB Bank"/> <label>BANK NAME</label> </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="input-group"> <input type="text" name="ben_nm" id="ben-nm" placeholder="John Smith"/> <label>BENEFICIARY NAME</label> </div>
                                                    </div>
                                                    <div className="col-12">
                                                        <div className="input-group"> <input type="text" name="scode" placeholder="ABCDAB1S" className="placeicon" minLength="8" maxLength="11"/> <label>SWIFT CODE</label> </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12"> <input type="submit" value="Pay $ 100" className="btn btn-success placeicon"/> </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <p className="text-center mb-5" id="below-btn"><a href="">Use a test card</a></p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="menu2" className="tab-pane in active">
                                <div className="row justify-content-center">
                                    <div className="col-11">
                                        <div className="form-card">
                                            <h3 className="mt-0 mb-4 text-center">Enter your card details to pay</h3>
                                            <form onSubmit={handleSubmit}>
                                                <div className="row">
                                                    <div className="col-12">
                                                        <div className="input-group"> <input type="text" id="cr_no" placeholder="0000 0000 0000 0000" minLength="19" maxLength="19"/> <label>CARD NUMBER</label> </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-6">
                                                        <div className="input-group"> <input type="text" name="exp" id="exp" placeholder="MM/YY" minLength="5" maxlength="5"/> <label>CARD EXPIRY</label> </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="input-group"> <input type="password" name="cvcpwd" placeholder="&#9679;&#9679;&#9679;" className="placeicon" minLength="3" maxLength="3"/> <label>CVV</label> </div>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                                <div className="col-md-12">
                                                                    <input type="submit"
                                                                        value="Pay Rs 100" className="btn btn-success placeicon" />
                                                                         </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-md-12">
                                                        <p className="text-center mb-5" id="below-btn"><a href="">Use a test card</a></p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="menu3" className="tab-pane">
                                <div className="row justify-content-center">
                                    <div className="col-11">
                                        <h3 className="mt-0 mb-4 text-center">Scan the QR code to pay</h3>
                                        <div className="row justify-content-center">
                                            <div id="qr"> <img src="https://i.imgur.com/DD4Npfw.jpg" width="200px" height="200px"/> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
        </>
    )
}

export default PaymentPage

