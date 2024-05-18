import L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import 'leaflet-draw/dist/leaflet.draw.css';

const DrawTools = () => {
  return (
    <FeatureGroup>
      <EditControl
        position="topright"
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
