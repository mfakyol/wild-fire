import React, { useEffect } from "react";
import classes from "./style.module.scss";

function Map() {
  useEffect(() => {
    function initMap() {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 20, lng: 0 },
        zoom: 3,
        streetViewControl: false,
        mapTypeControl: false,
      });

      window.map = map;
    }

    initMap();
  }, []);

  return <div id="map" className={classes.map} />;
}

export default Map;
