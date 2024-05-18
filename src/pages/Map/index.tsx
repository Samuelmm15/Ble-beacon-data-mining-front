import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import NavBar from "src/components/NavBar";
import { useEffect, useState } from "react";
import useBeacons from "./hooks/useBeacons";
import L from "leaflet";
import iconoPeaton from "../../img/hombre-peatonal.png";
import { FullscreenControl } from "react-leaflet-fullscreen";
import "leaflet.fullscreen/Control.FullScreen.css";
import DrawTools from "./components/DrawTools.tsx";

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
}

const Map = () => {
  const { getBeacons } = useBeacons();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [allBeacons, setAllBeacons] = useState<Beacon[] | undefined>(undefined);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }

    getBeacons()
      .then((data) => {
        console.log(data);
        setAllBeacons(data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const customIcon = L.icon({
    iconUrl: iconoPeaton,
    iconSize: [38 / 2, 95 / 3], // Icon size
    iconAnchor: [22 / 3, 94 / 3], // point of the icon that will correspond to the marker's location
    popupAnchor: [0, -76 + 40], // point of the render of the popup
  });

  if (allBeacons !== undefined) {
    let positionVector: any[] = [];

    // eslint-disable-next-line array-callback-return
    allBeacons.map((beacon: any) => {
      positionVector.push([
        beacon.location.latitude,
        beacon.location.longitude,
      ]);
    });

    const initialPosition: LatLngTuple = [28.4916, -15.6291]; // To center the map into Canary Islands

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
        <NavBar isLoggedIn={isLoggedIn} />
        <div style={{ width: "70%", height: "70%" }}>
          <MapContainer
            center={initialPosition}
            zoom={8}
            scrollWheelZoom={true}
            style={{ height: "100%", width: "100%" }}
          >
            <FullscreenControl position="topleft" />
            <DrawTools />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {positionVector.map((position: any, index: number) => (
              <Marker position={position} icon={customIcon}>
                <Popup>
                  <p>Latitude: {allBeacons?.[index]?.location?.latitude}</p>
                  <p>Longitude: {allBeacons?.[index]?.location?.longitude}</p>
                  <p>Altitude: {allBeacons?.[index]?.location?.altitude}</p>
                  <p>Bearing: {allBeacons?.[index]?.location?.bearing}</p>
                  <p>Speed: {allBeacons?.[index]?.location?.speed}</p>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    );
  } else {
    //! Cambiar esto por un spinner de carga
    return <h1>Loading...</h1>;
  }
};

export default Map;
