import L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import useBeaconsOperations from "./hooks/useBeaconsOperations";
import { useEffect } from "react";

type DrawToolsProps = {
  time: any;
};

const DrawTools = ({ time }: DrawToolsProps) => {
  const { getNumberOfBeacons } = useBeaconsOperations();

  const handleBeaconsCounters = async (
    _southWest: any,
    _northEast: any,
    time: any
  ) => {
    const data = await getNumberOfBeacons(_southWest, _northEast, time);
    console.log("data", data);
  };

  const handleCreated = (e: any) => {
    const layer = e.layer;
    // Obtención de los límites
    const bounds = layer.getBounds();
    handleBeaconsCounters(bounds._southWest, bounds._northEast, time);
  };

  return (
    <FeatureGroup>
      <EditControl
        position="topright"
        onCreated={handleCreated}
        draw={{
          polyline: false,
          rectangle: {
            shapeOptions: {
              color: "red",
              weight: 3,
            },
          },
          circlemarker: false,
          circle: {
            shapeOptions: {
              color: "red",
              weight: 3,
            },
          },
          polygon: {
            shapeOptions: {
              color: "red",
              weight: 3,
            },
          },
          marker: false,
        }}
      />
    </FeatureGroup>
  );
};

export default DrawTools;
