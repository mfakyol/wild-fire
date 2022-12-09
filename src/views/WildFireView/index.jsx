import React, { useEffect, useRef, useState } from "react";
import Map from "../../components/Map";
import classes from "./style.module.scss";

const NATURAL_EVENT_WILDFIRE = 9;

function WildFireView() {
  const markersRef = useRef([]);
  const [events, setEvents] = useState([]);


  useEffect(() => {
    const fetchData = async () => {

      markersRef.current.forEach(m => {
        m.setMap(null);

      })

      markersRef.current = []

      const eventData = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events?days=2000&limit=5").then((res) => res.json());
      console.log(eventData)
      const filteredEvents = eventData.events.filter((event) => event.categories[0].id === NATURAL_EVENT_WILDFIRE);
      console.log(filteredEvents)
      setEvents(filteredEvents);
      filteredEvents.forEach((event) => {
        console.log(event)
        var marker = new window.google.maps.Marker({
          position: { lat: event.geometries[0].coordinates[1], lng: event.geometries[0].coordinates[0] },
          title: "Hello World!",
        });
 

        const infowindow = new window.google.maps.InfoWindow({
          content: event.title,
        });

        marker.addListener("click", () => {
          infowindow.open({
            anchor: marker,
            map: window.map,
          });
        });

        
        marker.setMap(window.map);
        markersRef.current.push(marker);
      });
    };
    fetchData();
 
  }, []);

  return (
    <div className={classes.wildFireView}>
      <Map />
    </div>
  );
}

export default WildFireView;
