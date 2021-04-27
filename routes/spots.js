var express = require("express");
var formidable =require ("express-formidable");

const router = express.Router();

// middleware
var { requireSignin } = require("../middlewares");
// controllers
var { create,spots ,sellerSpots,searchListings,image,update} =require("../controllers/spot");

router.post("/create-spot",requireSignin, formidable(), create);
router.get('/spots', spots);
router.get('/spot/image/:spotId',image)
router.get("/seller-spots", requireSignin, sellerSpots);
router.post("/search-listings", searchListings);
// router.get("/user-spot-bookings", requireSignin, userSpotBookings);
router.put("/update-spot/:spotId",update);
module.exports = router;
