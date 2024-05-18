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
          polyline: {
            icon: new L.DivIcon({
              iconSize: new L.Point(8, 8),
              className: "leaflet-div-icon leaflet-editing-icon",
            }),
            shapeOptions: {
              guidelineDistance: 10,
              color: "red",
              weight: 3,
            },
          },
          rectangle: true, // Habilita la opción de dibujo de rectángulos
          circlemarker: false,
          circle: true, // Habilita la opción de dibujo de círculos
          polygon: true, // Habilita la opción de dibujo de polígonos
        }}
      />
    </FeatureGroup>
  );
};

export default DrawTools;
