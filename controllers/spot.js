var Spot = require( "../models/parking");
var fs = require("fs");

// index.js

"use strict";
const create = async (req, res) => {
    // console.log("req.fields", req.fields);
  //   console.log("req.files", req.files);
  try {
    let fields = req.fields;
    let files = req.files;

    let spot = new Spot(fields);
    console.log("USER++++++", req.user);
    spot.postedBy = req.user._id;
    // handle image
    if (files.image) {
      spot.image.data = fs.readFileSync(files.image.path);
      spot.image.contentType = files.image.type;
    }

    spot.save((err, result) => {
      if (err) {
        console.log("saving spot err => ", err);
        res.status(400).send("Error saving");
      }
      res.json(result);
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      err: err.message,
    });
  }
};
const spots = async (req, res) => {
  let all = await Spot.find({})
    .select("-image.data")
    .populate("postedBy", "_id name")
    .exec();
  // console.log(all);
  res.json(all);
};

const sellerSpots = async (req, res) => {
  let all = await Spot.find({ postedBy: req.user._id })
    .select("-image.data")
  .populate("postedBy", "_id name")
    .exec();
  console.log("HELLO_____",all);
    res.send(all);
}

const image = async (req, res) => {
  let spot = await Spot.findById(req.params.spotId).exec();
  if (spot && spot.image && spot.image.data !== null) {
    res.set("Content-Type", spot.image.contentType);
    return res.send(spot.image.data);
  }
};


const searchListings = async (req, res) => {
  const { date} = req.body;
  // console.log(location, date, bed);
  console.log(date);
  const fromDate = date.split(",");
  console.log(fromDate[0],fromDate[1]);
  let result = await Spot.find({
    from: { $lte: new Date(fromDate[0]) },
    to: { $gte: new Date(fromDate[1]) },
    slots:{$gte:1}
  })
    .select("-image.data")
    .exec();
  // console.log("SEARCH LISTINGS", result);
  res.json(result);
};

const update = async (req, res) => {
  // console.log("UPDATE FUNC++++");
  try {
  // console.log("HELLO___");
  let data = req.body;
  data.slots--;
    console.log("UPDATE+++", data.slots, data._id);
    
    // Spot.findByIdAndUpdate(data._id, data, {
    //   new: true,
    // }).select("-image.data");
    Spot.findByIdAndUpdate(data._id, data,
                            function (err, docs) {
    if (err){
        console.log(err)
    }
    else {
      console.log("User Updated");
        // console.log("Updated User : ", docs,docs.slots);
    }
});
  } catch (err) {
    console.log(err);
    res.status(400).send("Spot update failed. Try again.");
  }
};

exports.create = create, exports.spots = spots, exports.sellerSpots = sellerSpots, exports.image = image, exports.searchListings = searchListings, exports.update = update;

//# sourceMappingURL=index.js.map

