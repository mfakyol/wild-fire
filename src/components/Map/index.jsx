import React, { useEffect } from "react";
import classes from "./style.module.scss";

function Map() {
  useEffect(() => {
    function initMap() {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7413549, lng: -73.9980244 },
        zoom: 14,
        // styles:styles,
        streetViewControl: false,
        mapTypeControl: false,
      });
      //console.log(map)
      window.map = map;
    }

    initMap();

    var marker = new window.google.maps.Marker({
      position: { lat: 40.7413549, lng: -73.9980244 },
      title: "Hello World!",
    });

    marker.setMap(window.map);
  }, []);

  return <div id="map" className={classes.map} />;
}

export default Map;
