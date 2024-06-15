import L from "leaflet";
import { FeatureGroup } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw.css";
import useBeaconsOperations from "./hooks/useBeaconsOperations";
import { useEffect, useRef, useState } from "react";
import { Button, Col, Modal, Row, Slider, Statistic, message } from "antd";
import { Radar } from "@ant-design/charts";
import CSVDownload from "./components/CSVDownload";
import moment from "moment";

type DrawToolsProps = {
  time: any;
};

type ModalData = {
  beacons: number;
  averageSpeed: number;
  radarChartData: any;
};

const DrawTools = ({ time }: DrawToolsProps) => {
  const [sliderTime, setSliderTime] = useState<string>(time);
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [southWest, setSouthWest] = useState<any>();
  const [northEast, setNorthEast] = useState<any>();
  const [previousSliderValue, setPreviousSliderValue] = useState(sliderValue);
  const timeRef = useRef(time);
  timeRef.current = time;

  const { getNumberOfBeacons } = useBeaconsOperations();

  const [visible, setVisible] = useState(false);
  const [modalData, setModalData] = useState<ModalData>();

  const handleBeaconsCounters = async (_southWest: any, _northEast: any) => {
    const data = await getNumberOfBeacons(
      _southWest,
      _northEast,
      timeRef.current
    );
    setModalData(data);
    setVisible(true);
  };

  const handleCreated = (e: any) => {
    const layer = e.layer;
    // limits of the rectangle
    const bounds = layer.getBounds();
    setSouthWest(bounds._southWest);
    setNorthEast(bounds._northEast);
    handleBeaconsCounters(bounds._southWest, bounds._northEast);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const updateRadarChartData = async (newTime: string) => {
    const data = await getNumberOfBeacons(southWest, northEast, newTime);
    setModalData(data);
  };

  useEffect(() => {
    if (previousSliderValue !== sliderValue) {
      let newTime: any = moment(sliderTime.toString());
      if (sliderValue > previousSliderValue) {
        newTime = newTime.add(5, "minutes").format("YYYY-MM-DDTHH:mm:ss");
      } else if (sliderValue < previousSliderValue) {
        newTime = newTime.subtract(5, "minutes").format("YYYY-MM-DDTHH:mm:ss");
      }
      setSliderTime(newTime);
      setPreviousSliderValue(sliderValue);
      updateRadarChartData(newTime);
    }
  }, [sliderValue]);

  const onChange = (value: number | null) => {
    if (value !== null) {
      setSliderValue(value);
    }
  };

  let config;
  let renderGraph = false;
  if (modalData) {
    // If a beacon has a star of 0, the graph will not be rendered
    renderGraph = modalData.radarChartData.some((d: any) => d.star !== 0);

    if (!renderGraph) { // If there is no data, show a message
      message.destroy();
      message.error(
        "No data at the selected time. Please select another time.",
        5
      );
    }

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
      line: {
        visible: true,
      },
      point: {
        visible: true,
        shape: "circle",
      },
      legend: {
        position: "top-right",
        itemName: {
          style: {
            fill: "#000",
          },
        },
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
        centered
        style={{ overflow: "hidden" }}
        footer={[
          <CSVDownload data={modalData} />,
          <Button key="submit" type="primary" onClick={handleClose}>
            OK
          </Button>,
        ]}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Statistic title="Number of beacons" value={modalData?.beacons} />
          </Col>
          <Col span={12}>
            <Statistic title="Average Speed" value={modalData?.averageSpeed} />
          </Col>
        </Row>
        <Col span={24}>{renderGraph && <Radar {...config} />}</Col>
        <Row gutter={24}>
          <Slider
            min={0}
            max={24}
            onChange={onChange}
            value={sliderValue}
            style={{ width: "100%" }}
          />
        </Row>
      </Modal>
    </>
  );
};

export default DrawTools;
