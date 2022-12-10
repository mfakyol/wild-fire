import Map from "../../components/Map";
import classes from "./style.module.scss";
import React, { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import InfoContainer from "../../components/InfoContainer";
import Loading from "../../components/Loading";

const NATURAL_EVENT_WILDFIRE = 8;
const NATURAL_EVENT_VOLCANO = 12;
const NATURAL_EVENT_ICE = 15;

const NATURAL_EVENT_FILTER = [NATURAL_EVENT_WILDFIRE, NATURAL_EVENT_VOLCANO, NATURAL_EVENT_ICE];

const selectIcon = (categoryId) => {
  if (categoryId === NATURAL_EVENT_WILDFIRE) return "fire.png";
  if (categoryId === NATURAL_EVENT_VOLCANO) return "volcanic.png";
  if (categoryId === NATURAL_EVENT_ICE) return "ice.png";
};

function WildFireView() {
  const markersRef = useRef([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      markersRef.current.forEach((m) => {
        m.setMap(null);
      });

      markersRef.current = [];

      const eventData = await fetch("https://eonet.gsfc.nasa.gov/api/v2.1/events?days=2000").then((res) => res.json());

      eventData.events
        .filter((e) => NATURAL_EVENT_FILTER.some((filter) => filter === e.categories[0].id))
        .forEach((event) => {
          console.log(event);
          var marker = new window.google.maps.Marker({
            position: { lat: event.geometries[0].coordinates[1], lng: event.geometries[0].coordinates[0] },
            title: "Hello World!",
            icon: selectIcon(event.categories[0].id),
          });
         

          const infowindow = new window.google.maps.InfoWindow({
            content:  renderToString( <InfoContainer title={event.title} category={event.categories[0].title}/>),
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
        setIsLoading(false)
    };
    fetchData();
  }, []);

  return (
    <div className={classes.wildFireView}>
      {isLoading && <Loading/>}
      <Map />
    </div>
  );
}

export default WildFireView;
