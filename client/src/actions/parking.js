import axios from "axios";

export const createSpots = async (token, data) =>
  await axios.post(`${process.env.REACT_APP_API}/create-spot`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  export const allSpots = () =>
  axios.get(`${process.env.REACT_APP_API}/spots`);

export const sellerSpots = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/seller-spots`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  export const searchListings = async (query) =>
  await axios.post(`${process.env.REACT_APP_API}/search-listings`, query);

  export const updateSpot = async (data, spotId) =>
  await axios.put(
    `${process.env.REACT_APP_API}/update-spot/${spotId}`,
    data
  );

  export const userSpotBookings = async (token) =>
  await axios.get(`${process.env.REACT_APP_API}/user-spot-bookings`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }); 