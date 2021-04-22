import { useState } from "react";
import { toast } from "react-toastify";
import AlgoliaPlaces from "algolia-places-react";
import { DatePicker } from "antd";
import moment from "moment";
import {createSpots} from '../actions/parking'
import { useSelector } from 'react-redux'

const config = {
  appId: process.env.REACT_APP_ALGOLIA_APP_ID,
  apiKey: process.env.REACT_APP_ALGOLIA_API_KEY,
  language: "en",
  countries: ["in"],
};

const NewParking = () => {
  // state
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  const [values, setValues] = useState({
    title: "",
    content: "",
    image: "",
    latitude: "",
    longitude:"",
    price: "",
    from: "",
    to: "",
    slots: "",
  });
  const [preview, setPreview] = useState(
    "https://via.placeholder.com/100x100.png?text=PREVIEW"
  );
  const [location, setLocation] = useState("");
  // destructuring variables from state
  const { title, content, image, price,latitude,longitude, from, to, slots } = values;

  const handleSubmit = async(e) => {
    e.preventDefault();
    let spotData = new FormData();
    spotData.append("title", title);
    spotData.append("content", content);
    spotData.append("location", location.name);
    spotData.append("price", price);
    spotData.append("longitude", location.latlng.lng);
    spotData.append("latitude", location.latlng.lat);
    image && spotData.append("image", image);
    spotData.append("from", from);
    spotData.append("to", to);
    spotData.append("slots", slots);

    console.log([...spotData]);

    try {
      let res = await createSpots(token, spotData);
      console.log("Spots CREATE RES", res);
      toast.success("New Spots is posted");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data);
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const ParkingForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="btn btn-outline-secondary btn-block m-2 text-left">
          Image
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            hidden
          />
        </label>

        <input
          type="text"
          name="title"
          onChange={handleChange}
          placeholder="Title"
          className="form-control m-2"
          value={title}
        />

        <textarea
          name="content"
          onChange={handleChange}
          placeholder="Detailed Address"
          className="form-control m-2"
          value={content}
        />
        <AlgoliaPlaces
          className="form-control m-2"
          placeholder="Location"
          defaultValue={location}
          options={config}
          onChange={({ suggestion }) => setLocation(suggestion)}
          style={{ height: "50px" }}
        />
        <input
          type="number"
          name="price"
          onChange={handleChange}
          placeholder="Price"
          className="form-control m-2"
          value={price}
        />

        <input
          type="number"
          name="slots"
          onChange={handleChange}
          placeholder="Number of Slots"
          className="form-control m-2"
          value={slots}
        />
          <DatePicker
        placeholder="From date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, from: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />

      <DatePicker
        placeholder="To date"
        className="form-control m-2"
        onChange={(date, dateString) =>
          setValues({ ...values, to: dateString })
        }
        disabledDate={(current) =>
          current && current.valueOf() < moment().subtract(1, "days")
        }
      />
      </div>

      <button className="btn btn-outline-primary m-2">Save</button>
    </form>
  );

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Parking</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            {ParkingForm()}
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            {/* <pre>{JSON.stringify(values, null, 4)}</pre>
            <pre>{JSON.stringify(location, null, 4)}</pre> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewParking;
