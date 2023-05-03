import React, { useState, useEffect, useRef } from "react";
import "./Geo.css";
import { AsyncTypeahead } from "react-bootstrap-typeahead";

let map;
let bounds = new window.google.maps.LatLngBounds();
let sub_area;
let coordinates = [];
let color = [
  "#FF0000",
  "#4286f4",
  "#ffff00",
  "#ff00b2",
  "#bb00ff",
  "#00ffff",
  "#26ff00",
  "#00ff87",
];

const Geo = () => {
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const timeoutRef = useRef(null);

   useEffect(() => {
     _initMap();
   }, []);

  const _initMap = () => {
    map = new window.google.maps.Map(document.getElementById("map"), {
      center: { lat: 19.2183, lng: 72.9781 },
      zoom: 12,
      zoomControl: true,
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER,
      },
      scrollwheel: true,
      streetViewControl: true,
      mapTypeControl: false,
      mapTypeId: "roadmap",
    });
  };

  const _handleSearch = (query) => {
    if (!query) {
      return;
    }
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${query}&polygon_geojson=1&format=json`
      )
        .then((resp) => resp.json())
        .then((data) => {
          let filterGeoJsonType = data.filter(function (data) {
            return (
              data.geojson.type === "MultiPolygon" ||
              data.geojson.type === "Polygon"
            );
          });
          setOptions(filterGeoJsonType);
        });
    }, 1000);
  };

  const renderCoordinate = (paths) => {
    coordinates = [];
    let position = 0;
    paths.map((location) => {
      if (position % 1 === 0) {
        coordinates.push({ lat: location[1], lng: location[0] });
        bounds.extend({ lat: location[1], lng: location[0] });
      }
      position++;
      return true;
    });
  };

  const renderToMaps = (selectedOptions) => {
    selectedOptions.forEach((option) => {
      if (option.geojson.type === "MultiPolygon") {
        renderCoordinate(option.geojson.coordinates[0][0]);
      } else if (option.geojson.type === "Polygon") {
        renderCoordinate(option.geojson.coordinates[0]);
      } else {
        alert("option.geojson.type: MultiPolygon & Polygon");
      }

      if (coordinates.length > 1) {
        sub_area = new window.google.maps.Polygon({
          paths: coordinates,
          strokeColor: color[1],
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: color[1],
          fillOpacity: 0.35,
          editable: false,
        });

        sub_area.setMap(map);
        map.setOptions({ maxZoom: 20 });
        map.fitBounds(bounds);

        coordinates = [];
      }
    });
  };

  const _handleChange = (option) => {
    _initMap();
    renderToMaps(option);
    setSelectedOptions(option);
  };

  return (
    <div className="container" style={{ height: `100%` }}>
    <div className="page-header">
    <h1 style={{ marginBottom: "30px", color: "white" }}>
      <span style={{ color: "crimson" }}>Area Geo-Fencing</span>
    </h1>
  </div>
  <AsyncTypeahead
    style={{ marginBottom: "30px" }}
    align="justify"
    multiple
    labelKey="display_name"
    onSearch={_handleSearch}
    onChange={_handleChange}
    options={options}
    placeholder="Search city Eg:- VIVIANA mall, Majiwada"
    renderMenuItemChildren={(option, props, index) => (
      <div>
        <span>{option.display_name}</span>
      </div>
    )}
  />


  <div style={{ marginTop: "30px" }} className="maps" id="map"></div>
    </div>
  );
}

export default Geo;