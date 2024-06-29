import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "src/components/NavBar";
import useTableData from "./hooks/useTableData";
import { Spin, message, ConfigProvider, Menu, Typography, Tooltip } from "antd";
import enUS from "antd/lib/locale/en_US";
import BeaconFirstOptionModal from "./components/BeaconFirstOptionModal";
import BeaconSecondOptionModal from "./components/BeaconSecondOptionModal";
import useBeaconSecondOptionalModal from "./components/BeaconSecondOptionModal/hooks/useBeaconSecondOptionalModal";
import TrackerFirstOptionModal from "./components/TrackerFirstOptionModal";
import TrackerSecondOptionModal from "./components/TrackerSecondOptionModal";
import BeaconThirdOptionModal from "./components/BeaconThirdOptionModal";
import BeaconFourthOptionModal from "./components/BeaconFourthOptionModal";
import BeaconFifthOptionModal from "./components/BeaconFifthOptionModal";
import TrackerThirdOptionModal from "./components/TrackerThirdOptionModal";
import TrackerFourthOptionModal from "./components/TrackerFourthOptionModal";
import TrackerFifthOptionModal from "./components/TrackerFifthOptionModal";
import Joyride from "react-joyride";

export interface Beacon {
  _id: string;
  beaconId: string;
  time: string;
  location: {
    latitude: string;
    longitude: string;
    altitude: string;
    bearing: string;
    speed: string;
  };
  rssi: number;
}

export interface Tracker {
  _id: string;
  droneId: string;
  time: string;
  location: {
    latitude: string;
    longitude: string;
    altitude: string;
    bearing: string;
    speed: string;
  };
}

interface TableDataProps {
  userName: string;
}

const TableData: React.FC<TableDataProps> = ({ userName }) => {
  const actionRef = useRef<ActionType>();
  const trackerMenuactionRef = useRef<ActionType>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [beaconId, setBeaconId] = useState<string>("1");
  const [beaconData, setBeaconData] = useState<Beacon[]>([]);
  const [beacons, setBeacons] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("option0");
  const [trackerId, setTrackerId] = useState<string>("1");
  const [trackerData, setTrackerData] = useState<Tracker[]>([]);
  const [trackerSelectedOption, setTrackerSelectedOption] =
    useState<string>("trackerOption0");
  const [trackers, setTrackers] = useState<string[]>([]);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string[]>([""]);
  const [specificDate, setSpecificDate] = useState<string>("");
  const [hourRange, setHourRange] = useState<string[]>([""]);
  const [runTour, setRunTour] = useState(false);

  const steps = [
    {
      target: "#beaconTable",
      content:
        "This table contains the different registers of the beacon data at the data base",
    },
    {
      target: "#beaconMenu",
      content:
        "This menu contains the different filters to aply to the beacon data",
    },
    {
      target: "#trackerTable",
      content:
        "This table contains the different registers of the tracker data at the data base",
    },
    {
      target: "#trackerMenu",
      content:
        "This menu contains the different filters to aply to the tracker data",
    },
  ];

  const {
    getBeaconById,
    getAllBeaconIds,
    getTrackerById,
    getAllTrackerIds,
    getTrackerByFiltered,
    getBeaconByHourRange,
    getAllBeaconByDateRange,
    getAllBeaconByHourRange,
    getTrackerByHourRange,
    getAllTrackersByDateRange,
    getAllTrackersByHourRange,
  } = useTableData();
  const { getBeaconByIdFiltered } = useBeaconSecondOptionalModal();

  useEffect(() => {
    setRunTour(true);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (selectedOption === "option1" || selectedOption === "option0") {
      getBeaconById(beaconId)
        .then((data) => {
          setBeaconData(data);
          actionRef.current?.reload();
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [beaconId]);

  useEffect(() => {
    if (
      trackerSelectedOption === "trackerOption1" ||
      trackerSelectedOption === "trackerOption0"
    ) {
      getTrackerById(trackerId)
        .then((data) => {
          setTrackerData(data);
          trackerMenuactionRef.current?.reload();
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [trackerId]);

  useEffect(() => {
    getAllBeaconIds()
      .then((data) => {
        setBeacons(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  useEffect(() => {
    getAllTrackerIds()
      .then((data) => {
        setTrackers(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, []);

  useEffect(() => {
    if (selectedOption === "option2") {
      getBeaconByIdFiltered(beaconId, timeRange[0], timeRange[1])
        .then((data) => {
          if (data.length > 0) {
            setBeaconData(data);
            actionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [beaconId, timeRange]);

  useEffect(() => {
    if (selectedOption === "option3") {
      getBeaconByHourRange(beaconId, specificDate, hourRange[0], hourRange[1])
        .then((data) => {
          if (data.length > 0) {
            setBeaconData(data);
            actionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [hourRange]);

  useEffect(() => {
    if (selectedOption === "option4") {
      getAllBeaconByDateRange(timeRange[0], timeRange[1])
        .then((data) => {
          if (data.length > 0) {
            setBeaconData(data);
            actionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [timeRange]);

  useEffect(() => {
    if (selectedOption === "option5") {
      getAllBeaconByHourRange(specificDate, hourRange[0], hourRange[1])
        .then((data) => {
          if (data.length > 0) {
            setBeaconData(data);
            actionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [hourRange]);

  useEffect(() => {
    if (trackerSelectedOption === "trackerOption2") {
      getTrackerByFiltered(trackerId, timeRange[0], timeRange[1])
        .then((data) => {
          console.log(data);
          if (data.length > 0) {
            setTrackerData(data);
            trackerMenuactionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [trackerId, timeRange]);

  useEffect(() => {
    if (trackerSelectedOption === "trackerOption3") {
      getTrackerByHourRange(trackerId, specificDate, hourRange[0], hourRange[1])
        .then((data) => {
          if (data.length > 0) {
            setTrackerData(data);
            trackerMenuactionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [hourRange]);

  useEffect(() => {
    if (trackerSelectedOption === "trackerOption4") {
      getAllTrackersByDateRange(timeRange[0], timeRange[1])
        .then((data) => {
          if (data.length > 0) {
            setTrackerData(data);
            trackerMenuactionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [timeRange]);

  useEffect(() => {
    if (trackerSelectedOption === "trackerOption5") {
      getAllTrackersByHourRange(specificDate, hourRange[0], hourRange[1])
        .then((data) => {
          if (data.length > 0) {
            setTrackerData(data);
            trackerMenuactionRef.current?.reload();
          } else {
            message.error("No data found for the selected range of time.");
          }
        })
        .catch((error) => {
          message.error(error.message);
        });
    }
  }, [hourRange]);

  const handleMenuClick = (e: any) => {
    setSelectedOption(e.key);
    setTrackerSelectedOption("beaconOption0");
    setIsVisible(true);
  };

  const handleTrackerMenuClick = (e: any) => {
    setSelectedOption("trackerOption0");
    setTrackerSelectedOption(e.key);
    setIsVisible(true);
  };

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const columns: ProColumns<Beacon>[] = [
    {
      title: "Id",
      dataIndex: "beaconId",
      key: "beaconId",
      valueType: "text",
    },
    {
      title: "TimeStamp",
      dataIndex: "time",
      key: "time",
      valueType: "dateTime",
      sorter: true,
    },
    {
      title: "Latitude",
      dataIndex: "location",
      key: "latitude",
      valueType: "text",
      render: (_, record) => record.location?.latitude,
    },
    {
      title: "Longitude",
      dataIndex: "location",
      key: "longitude",
      valueType: "text",
      render: (_, record) => record.location?.longitude,
    },
    {
      title: "Altitude",
      dataIndex: "location",
      key: "altitude",
      valueType: "text",
      render: (_, record) => record.location?.altitude,
      sorter: true,
    },
    {
      title: "Bearing",
      dataIndex: "location",
      key: "bearing",
      valueType: "text",
      render: (_, record) => record.location?.bearing,
    },
    {
      title: "Speed",
      dataIndex: "location",
      key: "speed",
      valueType: "text",
      render: (_, record) => record.location?.speed,
      sorter: true,
    },
    {
      title: "rssi",
      dataIndex: "rssi",
      key: "rssi",
      valueType: "text",
      sorter: true,
    },
  ];

  const trackerColumns: ProColumns<Tracker>[] = [
    {
      title: "Id",
      dataIndex: "droneId",
      key: "droneId",
      valueType: "text",
    },
    {
      title: "TimeStamp",
      dataIndex: "time",
      key: "time",
      valueType: "dateTime",
      sorter: true,
    },
    {
      title: "Latitude",
      dataIndex: "location",
      key: "latitude",
      valueType: "text",
      render: (_, record) => record.location?.latitude,
    },
    {
      title: "Longitude",
      dataIndex: "location",
      key: "longitude",
      valueType: "text",
      render: (_, record) => record.location?.longitude,
    },
    {
      title: "Altitude",
      dataIndex: "location",
      key: "altitude",
      valueType: "text",
      render: (_, record) => record.location?.altitude,
      sorter: true,
    },
    {
      title: "Bearing",
      dataIndex: "location",
      key: "bearing",
      valueType: "text",
      render: (_, record) => record.location?.bearing,
    },
    {
      title: "Speed",
      dataIndex: "location",
      key: "speed",
      valueType: "text",
      render: (_, record) => record.location?.speed,
      sorter: true,
    },
  ];

  const menu = (
    <Menu
      id="beaconMenu"
      onClick={handleMenuClick}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography.Title
        level={5}
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        Beacon Menu
      </Typography.Title>
      <Menu.Item
        key="option1"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="1. Search by Id">1. Search by Id.</Tooltip>
      </Menu.Item>
      <Menu.Item
        key="option2"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="2. Search by time range.">
          2. Search by time range.
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="option3"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="3. Search by hours range.">
          3. Searh by hours range.
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="option4"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="4. Show all beacons within a time range.">
          4. Show all beacons within a time range.
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="option5"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="5. Show all beacons within a range of hours.">
          5. Show all beacons within a range of hours.
        </Tooltip>
      </Menu.Item>
    </Menu>
  );

  const trackerMenu = (
    <Menu
      id="trackerMenu"
      onClick={handleTrackerMenuClick}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography.Title
        level={5}
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        Tracker Menu
      </Typography.Title>
      <Menu.Item
        key="trackerOption1"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="1. Search by Id.">1. Search by Id.</Tooltip>
      </Menu.Item>
      <Menu.Item
        key="trackerOption2"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="2. Search by time range.">
          2. Search by time range.
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="trackerOption3"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="3. Search by hours range.">
          3. Search by hours range.
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="trackerOption4"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="4. Show all beacons within a time range.">
          4. Show all beacons within a time range.
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="trackerOption5"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="5. Show all beacons within a range of hours.">
          5. Show all beacons within a range of hours.
        </Tooltip>
      </Menu.Item>
    </Menu>
  );

  if (beaconData.length === 0) {
    return <Spin size="large" fullscreen />;
  } else {
    return (
      <>
        <div>
          <NavBar isLoggedIn={isLoggedIn} userName={userName} />
          <div style={{ marginTop: "70px", height: "100%", width: "100%" }}>
            <ConfigProvider locale={enUS}>
              <div
                id="beaconTable"
                style={{ display: "flex", width: "100%", height: "100%" }}
              >
                {menu}
                <ProTable<Beacon>
                  columns={columns}
                  actionRef={actionRef}
                  bordered
                  headerTitle="Beacon Data"
                  size="small"
                  request={async (params, sorter, filter) => {
                    let sortedData = [...beaconData];

                    if (sorter && sorter.location) {
                      sortedData.sort((a, b) => {
                        const aValue = parseFloat(a.location?.speed || "0");
                        const bValue = parseFloat(b.location?.speed || "0");
                        if (sorter.location === "ascend") {
                          return aValue - bValue;
                        } else {
                          return bValue - aValue;
                        }
                      });
                    } else if (sorter && sorter.time) {
                      sortedData.sort((a, b) => {
                        const aValue = new Date(a.time).getTime();
                        const bValue = new Date(b.time).getTime();
                        if (sorter.time === "ascend") {
                          return aValue - bValue;
                        } else {
                          return bValue - aValue;
                        }
                      });
                    } else if (sorter && sorter.speed) {
                      sortedData.sort((a, b) => {
                        const aValue = parseFloat(a.location?.speed || "0");
                        const bValue = parseFloat(b.location?.speed || "0");
                        if (sorter.speed === "ascend") {
                          return aValue - bValue;
                        } else {
                          return bValue - aValue;
                        }
                      });
                    } else if (sorter && sorter.rssi) {
                      sortedData.sort((a, b) => {
                        const aValue = a.rssi;
                        const bValue = b.rssi;
                        if (sorter.rssi === "ascend") {
                          return aValue - bValue;
                        } else {
                          return bValue - aValue;
                        }
                      });
                    }

                    return {
                      data: sortedData,
                      success: true,
                    };
                  }}
                  rowKey="_id"
                  pagination={{ pageSize: 5 }}
                  search={false}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </ConfigProvider>
          </div>
          <div style={{ height: "100%", width: "100%" }}>
            <ConfigProvider locale={enUS}>
              <div id="trackerTable" style={{ display: "flex", width: "100%", height: "100%" }}>
                {trackerMenu}
                <ProTable<Tracker>
                  columns={trackerColumns}
                  actionRef={trackerMenuactionRef}
                  bordered
                  headerTitle="Tracker Data"
                  size="small"
                  request={async (params, sorter, filter) => {
                    let sortedData = [...trackerData];

                    if (sorter && sorter.location) {
                      sortedData.sort((a, b) => {
                        const aValue = parseFloat(a.location?.speed || "0");
                        const bValue = parseFloat(b.location?.speed || "0");
                        if (sorter.location === "ascend") {
                          return aValue - bValue;
                        } else {
                          return bValue - aValue;
                        }
                      });
                    } else if (sorter && sorter.time) {
                      sortedData.sort((a, b) => {
                        const aValue = new Date(a.time).getTime();
                        const bValue = new Date(b.time).getTime();
                        if (sorter.time === "ascend") {
                          return aValue - bValue;
                        } else {
                          return bValue - aValue;
                        }
                      });
                    } else if (sorter && sorter.speed) {
                      sortedData.sort((a, b) => {
                        const aValue = parseFloat(a.location?.speed || "0");
                        const bValue = parseFloat(b.location?.speed || "0");
                        if (sorter.speed === "ascend") {
                          return aValue - bValue;
                        } else {
                          return bValue - aValue;
                        }
                      });
                    }

                    return {
                      data: sortedData,
                      success: true,
                    };
                  }}
                  rowKey="_id"
                  pagination={{ pageSize: 5 }}
                  search={false}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            </ConfigProvider>
          </div>
        </div>
        {isVisible && selectedOption === "option1" && (
          <BeaconFirstOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            beacons={beacons}
            setBeaconId={setBeaconId}
          />
        )}
        {isVisible && selectedOption === "option2" && (
          <BeaconSecondOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            beacons={beacons}
            setBeaconId={setBeaconId}
            setTimeRange={setTimeRange}
          />
        )}
        {isVisible && selectedOption === "option3" && (
          <BeaconThirdOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            beacons={beacons}
            setBeaconId={setBeaconId}
            setSpecificDate={setSpecificDate}
            setHourRange={setHourRange}
          />
        )}
        {isVisible && selectedOption === "option4" && (
          <BeaconFourthOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            setTimeRange={setTimeRange}
          />
        )}
        {isVisible && selectedOption === "option5" && (
          <BeaconFifthOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            setSpecificDate={setSpecificDate}
            setHourRange={setHourRange}
          />
        )}
        {isVisible && trackerSelectedOption === "trackerOption1" && (
          <TrackerFirstOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            trackers={trackers}
            setTrackerId={setTrackerId}
          />
        )}
        {isVisible && trackerSelectedOption === "trackerOption2" && (
          <TrackerSecondOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            trackers={trackers}
            setTrackerId={setTrackerId}
            setTimeRange={setTimeRange}
          />
        )}
        {isVisible && trackerSelectedOption === "trackerOption3" && (
          <TrackerThirdOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            trackers={trackers}
            setTrackerId={setTrackerId}
            setSpecificDate={setSpecificDate}
            setHourRange={setHourRange}
          />
        )}
        {isVisible && trackerSelectedOption === "trackerOption4" && (
          <TrackerFourthOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            setTimeRange={setTimeRange}
          />
        )}
        {isVisible && trackerSelectedOption === "trackerOption5" && (
          <TrackerFifthOptionModal
            isVisible={isVisible}
            onClose={handleCloseModal}
            setSpecificDate={setSpecificDate}
            setHourRange={setHourRange}
          />
        )}
        <Joyride
          steps={steps}
          run={runTour} // Controla si el tour está activo
          continuous={true} // Permite que el tour continúe automáticamente al siguiente paso
          showSkipButton={true} // Muestra un botón para saltar el tour
          styles={{
            options: {
              zIndex: 10000, // Asegura que el tour esté por encima de otros elementos
            },
          }}
        />
      </>
    );
  }
};

export default TableData;
