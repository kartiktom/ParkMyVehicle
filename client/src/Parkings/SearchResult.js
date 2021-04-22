import React, { useRef, useEffect, useState } from 'react';
import queryString from "query-string";
import { Link } from "react-router-dom";
import { searchListings } from "../actions/parking";
import ReactDOM from 'react-dom';
// import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
// import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import distance from '@turf/distance';
import '../pages/searchPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons'
import { functionTypeAnnotation } from '@babel/types';
import { allSpots } from '../actions/parking'
import { SearchOutlined } from "@ant-design/icons";
import axios from 'axios';
// import renderHTML from 'react-render-html';
import {Button} from 'react-bootstrap'
import { DatePicker, Select } from "antd";
import moment from "moment";
import { useHistory } from 'react-router-dom'

// mapboxgl.workerClass = MapboxWorker;
mapboxgl.accessToken = 'pk.eyJ1Ijoic2Fpa2VzaGFyaSIsImEiOiJja2swdDYyanYwM3IwMm5xZjZlYm1kZmlsIn0.1ha1QjW98gYknER_3JqN6w';

const SearchPage = () => {
  const history = useHistory();
  const mapContainer = useRef();
  const [lng, setLng] = useState(77.2177);
  const [lat, setLat] = useState(28.6304);
  const [date, setDate] = useState("");
  const [zoom, setZoom] = useState(12);
   const [loading, setLoading] = useState(false);
   const [parkingObj, setParkingObj] = useState();
    const [stores, setSpots] = useState([]);

     const loadAllspots = () => {
       const { date } = queryString.parse(window.location.search);
       setDate(date);
    // console.table({ location, date, bed });
    searchListings({ date}).then((res) => {
      console.log("SEARCH RESULTS ===>", res.data);
        setSpots(res.data);
         setLoading(true);
    });
  };

  const handleSubmit = (e) => {
    history.push(`/details?date=${date}`,{
      parkingObj:parkingObj,
      date:date
    });
    // history.push('/details',{
    //   parkingObj:parkingObj
    // })
  }

  // useEffect(() => {
  //   console.log(parkingObj);
  // })

  useEffect(() => {
    loadAllspots();
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });

    var geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
      marker: true,
      bbox: [-180, -90, 180, 90]
    });

    map.on('move', () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });


    /**
    * Assign a unique id to each store. You'll use this `id`
    * later to associate each point on the map with a listing
    * in the sidebar.
    */
    console.log(stores);
    // stores.forEach(function (store, i) {
    // store.id = i;
    // });

    /**
    * Wait until the map loads to make changes to the map.
    */
    map.on('load', function (e) {
      /**
      * This is where your '.addLayer()' used to be, instead
      * add only the source without styling a layer
      */
      map.addSource('places', {
        'type': 'geojson',
        'data': stores
      });

      /**
      * Add all the things to the page:
      * - The location listings on the side of the page
      * - The markers onto the map
      */
      if (stores) {
        buildLocationList(stores);
      }
      map.addControl(geocoder, 'top-left');
      map.addControl(new mapboxgl.NavigationControl());
      addMarkers();
    });

    /**
         * Listen for when a geocoder result is returned. When one is returned:
         * - Calculate distances
         * - Sort stores by distance
         * - Rebuild the listings
         * - Adjust the map camera
         * - Open a popup for the closest store
         * - Highlight the listing for the closest store.
         */
    geocoder.on('result', function (ev) {
      /* Get the coordinate of the search result */
      var searchResult = ev.result.geometry;
      /**
       * Calculate distances:
       * For each store, use turf.disance to calculate the distance
       * in kilometers between the searchResult and the store. Assign the
       * calculated value to a property called `distance`.
       */
      var options = { units: 'kilometers' };
      stores.forEach(function (store) {
        var coordinates = [store.longitude, store.latitude];
        Object.defineProperty(store, 'distance', {
          value: distance(searchResult, coordinates, options),
          writable: true,
          enumerable: true,
          configurable: true
        });
      });
      /**
       * Sort stores by distance from closest to the `searchResult`
       * to furthest.
       */
      stores.sort(function (a, b) {
        if (a.distance > b.distance) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0; // a must be equal to b
      });
      /**
       * Rebuild the listings:
       * Remove the existing listings and build the location
       * list again using the newly sorted stores.
       */
      var listings = document.getElementById('listings');
      while (listings.firstChild) {
        listings.removeChild(listings.firstChild);
      }
      buildLocationList(stores);
      /* Open a popup for the closest store. */
      createPopUp(stores[0]);
      /** Highlight the listing for the closest store. */
      var activeListing = document.getElementById(
        'listing-' + stores[0].id
      );
      activeListing.classList.add('active');
      /**
       * Adjust the map camera:
       * Get a bbox that contains both the geocoder result and
       * the closest store. Fit the bounds to that bbox.
       */
      var bbox = getBbox(stores, 0, searchResult);
      map.fitBounds(bbox, {
        padding: 100
      });
    });
    /**
     * Using the coordinates (lng, lat) for
     * (1) the search result and
     * (2) the closest store
     * construct a bbox that will contain both points
     */
    function getBbox(sortedStores, storeIdentifier, searchResult) {
      var lats = [
        sortedStores[storeIdentifier].latitude,
        searchResult.coordinates[1]
      ];
      var lons = [
        sortedStores[storeIdentifier].longitude,
        searchResult.coordinates[0]
      ];
      var sortedLons = lons.sort(function (a, b) {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
      var sortedLats = lats.sort(function (a, b) {
        if (a > b) {
          return 1;
        }
        if (a.distance < b.distance) {
          return -1;
        }
        return 0;
      });
      return [
        [sortedLons[0], sortedLats[0]],
        [sortedLons[1], sortedLats[1]]
      ];
    }


    /**
    * Add a marker to the map for every store listing.
    **/
  

    function addMarkers() {
      /* For each feature in the GeoJSON object above: */
      stores.forEach(function (marker) {
        var dist = marker.distance;
      // if(dist<10)
        {
          /* Create a div element for the marker. */
          var el = document.createElement('div');
          /* Assign a unique `id` to the marker. */
          el.id = 'marker-' + marker.id;
          /* Assign the `marker` class to each marker for styling. */
          el.className = 'marker';

          /**
          * Create a marker using the div element
          * defined above and add it to the map.
          **/
          new mapboxgl.Marker(el, { offset: [0, -23] })
            .setLngLat([marker.longitude, marker.latitude])
            .addTo(map);

          /**
          * Listen to the element and when it is clicked, do three things:
          * 1. Fly to the point
          * 2. Close all other popups and display popup for clicked store
          * 3. Highlight listing in sidebar (and remove highlight for all other listings)
          **/
          el.addEventListener('click', function (e) {
            /* Fly to the point */
            console.log(marker);
            flyToStore(marker);
            setParkingObj(marker);
            /* Close all other popups and display popup for clicked store */
            createPopUp(marker);
            /* Highlight listing in sidebar */
            var activeItem = document.getElementsByClassName('active');
            e.stopPropagation();
            if (activeItem[0]) {
              activeItem[0].classList.remove('active');
            }
            var listing = document.getElementById(
              'listing-' + marker.id
            );
            listing.classList.add('active');
          });
        }
        });
      }
    /**
    * Add a listing for each store to the sidebar.
    **/
    function buildLocationList(data) {
    data.forEach(function (store, i) {
    /**
    * Create a shortcut for `store.properties`,
    * which will be used several times below.
    **/
    var prop = store;

    /* Add a new listing section to the sidebar. */
    var listings = document.getElementById('listings');
    var listing = listings.appendChild(document.createElement('div'));
    /* Assign a unique `id` to the listing. */
    listing.id = 'listing-' + prop.id;
    /* Assign the `item` class to each listing for styling. */
    listing.className = 'item';



    /* Add the link to the individual listing created above. */
    var link = listing.appendChild(document.createElement('a'));
    link.href = '#';
    link.className = 'title';
    link.id = 'link-' + i;

    var roundedDistance = Math.round(prop.distance * 100) / 100;
    if(roundedDistance < 10){
      
    link.innerHTML = prop.title;

    /* Add details to the individual listing. */
    var details = listing.appendChild(document.createElement('div'));

    // if(roundedDistance < 20){
    details.innerHTML = prop.city;
    if (prop.content) {
    details.innerHTML = ' &middot; ' + prop.content;
    }

    if (prop.distance) {
      // var roundedDistance = Math.round(prop.distance * 100) / 100;
      details.innerHTML +=
        '<p><strong>' + roundedDistance + ' kilometers away</strong></p>' + 'Rs. ' + prop.price;

    }
  }
      // details.innerHTML = prop.price;


    /**
    * Listen to the element and when it is clicked, do four things:
    * 1. Update the `currentFeature` to the store associated with the clicked link
    * 2. Fly to the point
    * 3. Close all other popups and display popup for clicked store
    * 4. Highlight listing in sidebar (and remove highlight for all other listings)
    **/
    link.addEventListener('click', function (e) {
      console.log(data);
    for (var i = 0; i < data.length; i++) {
    if (this.id === 'link-' + i) {
    var clickedListing = data[i];
    flyToStore(clickedListing);
    createPopUp(clickedListing);
    setParkingObj(clickedListing);
    }
    }
    var activeItem = document.getElementsByClassName('active');
    if (activeItem[0]) {
    activeItem[0].classList.remove('active');
    }
    this.parentNode.classList.add('active');
    });
    });
    }

    /**
    * Use Mapbox GL JS's `flyTo` to move the camera smoothly
    * a given center point.
    **/
    function flyToStore(currentFeature) {
      var coordinates = [currentFeature.longitude, currentFeature.latitude];
    map.flyTo({
    center: coordinates,
    zoom: 12
    });
    }

    /**
    * Create a Mapbox GL JS `Popup`.
    **/
    function createPopUp(currentFeature) {
    if(currentFeature.distance<10)
      {
      var popUps = document.getElementsByClassName('mapboxgl-popup');
      if (popUps[0]) popUps[0].remove();
      var popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([currentFeature.longitude, currentFeature.latitude])
        .setHTML(
          // <>
          //   <h3>sai</h3>
          // </>
          '<h3>' + currentFeature.location + '</h3>' +
          '<h4>' +
          currentFeature.content +
          '</h4>' +
          '<h4><strong>' + 'Rs. ' +
          currentFeature.price +
          '</strong></h4>'
        )
        .addTo(map);
    }
    }

    // function resetCenter()
    // {
    //   map.setCenter([lng,lat]);
    // }



  return () => map.remove();
  },[loading]);

  // const resetCenter = (e) =>
  //   {
  //     e.preventDefault();
  //     map.flyTo()
  //   }


  return (
  <div>
    <div className="sidebar">
     <div className="heading">
        <a href="/">HOME</a>
        <h1>Our locations</h1>
        </div>
          <div id="listings" className="listings"></div>
        </div>
      <div id="map" ref={mapContainer} className="map"></div>
      {parkingObj ? <Button id="BookBtn"
          onClick={handleSubmit}
        >Book</Button>:<></>}
  </div>
  );
  };

export default SearchPage;
