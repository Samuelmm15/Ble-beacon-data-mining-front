import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "src/components/NavBar";
import React, { useEffect, useState } from "react";
import useBeacons from "./hooks/useBeacons";
import L from "leaflet";
import iconoPeaton from "../../img/beacon.png";
import IconoDron from "../../img/drone.png";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import DrawTools from "./components/DrawTools";
import moment from "moment";
import { Col, DatePicker, Row, Slider, Spin, message } from "antd";

interface Beacon {
  beaconId: number;
  time: string;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
    bearing: number;
    speed: number;
  };
  rssi: number;
}

interface Drone {
  droneId: number;
  time: string;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
    bearing: number;
    speed: number;
  };
}

interface MapProps {
  userName: string;
}

const Map: React.FC<MapProps> = ({ userName }) => {
  const { getBeacons, getDrones } = useBeacons();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [allBeacons, setAllBeacons] = useState<Beacon[] | undefined>(undefined);
  const [allDrones, setAllDrones] = useState<Drone[] | undefined>(undefined);
  const [time, setTime] = useState<string>("2024-05-12T10:15:00");
  const [sliderValue, setSliderValue] = useState<number>(0);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    getBeacons()
      .then((data) => {
        setAllBeacons(data);
      })
      .catch((error) => {
        message.error(error.message);
      });

    getDrones()
      .then((data) => {
        setAllDrones(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  useEffect(() => {
    const newTime = moment("2024-05-12T11:00:00")
      .add(sliderValue * 1, "minutes")
      .format("YYYY-MM-DDTHH:mm:ss");
    setTime(newTime);
  }, [sliderValue]);

  const onChange = (value: number | null) => {
    if (value !== null) {
      setSliderValue(value);
    }
  };

  const onDateChange = (date: moment.Moment | null) => {
    if (date !== null) {
      setSliderValue(0);
      setTime(date.format("YYYY-MM-DDTHH:mm:ss"));
    }
  };

  const customIcon = L.icon({
    iconUrl: iconoPeaton,
    iconSize: [38 / 2, 95 / 3], // Icon size
    iconAnchor: [22 / 3, 94 / 3], // point of the icon that will correspond to the marker's location
    popupAnchor: [0, -76 + 40], // point of the render of the popup
  });

  const droneIcon = L.icon({
    iconUrl: IconoDron,
    iconSize: [38 / 2, 95 / 3], // Icon size
    iconAnchor: [22 / 3, 94 / 3], // point of the icon that will correspond to the marker's location
    popupAnchor: [0, -76 + 40], // point of the render of the popup
  });

  if (allBeacons !== undefined) {
    let beaconId: any[] = [];
    let positionVector: any[] = [];
    let positionDrone: any[] = [];
    let droneId: any[] = [];

    const initialTime = time;
    // eslint-disable-next-line array-callback-return
    //? Se recorren todos los beacons para mostrarlos en el mapa
    allBeacons.map((beacon: any) => {
      if (beacon.time === initialTime) {
        beaconId.push(beacon._id);
        positionVector.push([
          beacon.location.latitude,
          beacon.location.longitude,
        ]);
      }
    });

    //? Se recorren todos los drones para mostrarlos en el mapa
    allDrones?.map((drone: any) => {
      if (drone.time === initialTime) {
        droneId.push(drone._id);
        positionDrone.push([drone.location.latitude, drone.location.longitude]);
      }
    });

    const initialPosition: LatLngTuple = [
      allBeacons.at(0)?.location.latitude ?? 28.4916,
      allBeacons.at(0)?.location.longitude ?? -15.6291,
    ]; // To center the map into Canary Islands

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <NavBar isLoggedIn={isLoggedIn} userName={userName} />
        <div style={{ width: "70%", height: "70%" }}>
          <MapContainer
            center={initialPosition}
            zoom={30}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <FullscreenControl position="topleft" />
            <DrawTools time={time} />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positionVector.map((position: any, index: number) => {
              const beacon = allBeacons.find(
                (b: any) => b._id === beaconId[index]
              );
              return (
                <Marker position={position} icon={customIcon}>
                  <Popup>
                    <p>
                      Time: {moment(beacon?.time).format("DD/MM/YYYY HH:mm:ss")}
                    </p>
                    <p>Latitude: {beacon?.location?.latitude}</p>
                    <p>Longitude: {beacon?.location?.longitude}</p>
                    <p>Altitude: {beacon?.location?.altitude}</p>
                    <p>Bearing: {beacon?.location?.bearing}</p>
                    <p>Speed: {beacon?.location?.speed}</p>
                    <p>RSSI: {beacon?.rssi}</p>
                  </Popup>
                </Marker>
              );
            })}
            {positionDrone.map((position: any, index: number) => {
              const drone = allDrones?.find(
                (b: any) => b._id === droneId[index]
              );
              return (
                <Marker position={position} icon={droneIcon}>
                  <Popup>
                    <p>
                      Time: {moment(drone?.time).format("DD/MM/YYYY HH:mm:ss")}
                    </p>
                    <p>Latitude: {drone?.location?.latitude}</p>
                    <p>Longitude: {drone?.location?.longitude}</p>
                    <p>Altitude: {drone?.location?.altitude}</p>
                    <p>Bearing: {drone?.location?.bearing}</p>
                    <p>Speed: {drone?.location?.speed}</p>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          <div style={{ width: "100%", marginTop: "20px" }}>
            <Row>
              <Col span={18}>
                <Slider
                  min={0}
                  max={60}
                  onChange={onChange}
                  value={sliderValue}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col span={5}>
                <DatePicker
                  showTime={{ format: "HH:mm:ss" }}
                  format="YYYY-MM-DD HH:mm:ss"
                  value={
                    typeof time === "string"
                      ? moment(time, "YYYY-MM-DD HH:mm:ss")
                      : null
                  }
                  onChange={onDateChange}
                  style={{ margin: "0 40px", width: "100%" }}
                />
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div role="status">
          <Spin size="large" fullscreen />
        </div>
      </div>
    );
  }
};

export default Map;
