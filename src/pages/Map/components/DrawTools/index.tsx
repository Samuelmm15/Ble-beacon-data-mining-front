import L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import useBeaconsOperations from "./hooks/useBeaconsOperations";
import { useState } from "react";
import { Button, Col, Modal, Row, Statistic } from "antd";
import { Radar } from "@ant-design/charts";

type DrawToolsProps = {
  time: any;
};

type ModalData = {
  count: number;
  averageSpeed: number;
  radarChartData: any;
};

const DrawTools = ({ time }: DrawToolsProps) => {
  const { getNumberOfBeacons } = useBeaconsOperations();

  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const handleBeaconsCounters = async (
    _southWest: any,
    _northEast: any,
    time: any
  ) => {
    const data = await getNumberOfBeacons(_southWest, _northEast, time);
    setModalData(data);
    setVisible(true);
  };

  const handleCreated = (e: any) => {
    const layer = e.layer;
    // Obtención de los límites
    const bounds = layer.getBounds();
    handleBeaconsCounters(bounds._southWest, bounds._northEast, time);
  };

  const handleClose = () => {
    setVisible(false);
  };

  let config;
  let renderGraph = false;
  if (modalData) {
    // Comprueba si hay al menos un valor distinto de cero
    renderGraph = modalData.radarChartData.some((d: any) => d.star !== 0);

    config = {
      data: modalData?.radarChartData.map((d: any) => ({
        ...d,
        star: Math.sqrt(d.star),
      })),
      xField: "name",
      yField: "star",
      area: {
        style: {
          fillOpacity: 0.2,
        },
      },
      scale: {
        x: {
          padding: 0.5,
          align: 0,
        },
        y: {
          nice: true,
        },
      },
      axis: {
        x: {
          title: false,
          grid: true,
        },
        y: {
          gridAreaFill: "rgba(0, 0, 0, 0.04)",
          label: false,
          title: false,
        },
      },
      radiusAxis: {
        min: 0,
        max: 1,
      },
    };
  }

  return (
    <>
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
      <Modal
        title="New area data"
        open={visible}
        onOk={handleClose}
        onCancel={handleClose}
        destroyOnClose
        footer={[
          <Button key="submit" type="primary" onClick={handleClose}>
            OK
          </Button>,
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Number of beacons" value={modalData?.count} />
          </Col>
          <Col span={12}>
            <Statistic title="Average Speed" value={modalData?.averageSpeed} />
          </Col>
        </Row>
        <Col span={24}>{renderGraph && <Radar {...config} />}</Col>
      </Modal>
    </>
  );
};

export default DrawTools;
