import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "src/components/NavBar";
import useTableData from "./hooks/useTableData";
import { Spin, message, ConfigProvider, Menu, Typography, Tooltip } from "antd";
import enUS from "antd/lib/locale/en_US";
import BeaconFirstOptionModal from "./components/BeaconFirstOptionModal";
import BeaconSecondOptionModal from "./components/BeaconSecondOptionModal";
import moment from "moment";
import useBeaconSecondOptionalModal from "./components/BeaconSecondOptionModal/hooks/useBeaconSecondOptionalModal";

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
}

const TableData = () => {
  const actionRef = useRef<ActionType>();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [beaconId, setBeaconId] = useState<string>("1");
  const [beaconData, setBeaconData] = useState<Beacon[]>([]);
  const [beacons, setBeacons] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("option0");
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<string[]>([""]);

  const { getBeaconById, getAllBeaconIds } = useTableData();
  const { getBeaconByIdFiltered } = useBeaconSecondOptionalModal();

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
    getAllBeaconIds()
      .then((data) => {
        setBeacons(data);
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

  const handleMenuClick = (e: any) => {
    setSelectedOption(e.key);
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
  ];

  const menu = (
    <Menu
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
        <Tooltip title="1. Buscar por identificador.">
          1. Buscar por identificador.
        </Tooltip>
      </Menu.Item>
      <Menu.Item
        key="option2"
        style={{ maxWidth: "200px", textAlign: "center" }}
      >
        <Tooltip title="2. Buscar por rango de tiempo.">
          2. Buscar por rango de tiempo.
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
          <NavBar isLoggedIn={isLoggedIn} />
          <div style={{ marginTop: "70px", height: "100%", width: "100%" }}>
            <ConfigProvider locale={enUS}>
              <div style={{ display: "flex", width: "100%", height: "100%" }}>
                {menu}
                <ProTable<Beacon>
                  columns={columns}
                  actionRef={actionRef}
                  cardBordered
                  request={async (params, sorter, filter) => {
                    let sortedData = [...beaconData];

                    if (sorter && sorter.location) {
                      sortedData.sort((a, b) => {
                        const aValue = parseFloat(a.location?.speed || "0");
                        const bValue = parseFloat(b.location?.speed || "0");
                        const compareResult = aValue - bValue;
                        return sorter.location === "ascend"
                          ? compareResult
                          : -compareResult;
                      });
                    } else if (sorter && sorter.time) {
                      sortedData.sort((a, b) => {
                        const aValue = new Date(a.time).getTime();
                        const bValue = new Date(b.time).getTime();
                        const compareResult = aValue - bValue;
                        return sorter.time === "ascend"
                          ? compareResult
                          : -compareResult;
                      });
                    }

                    return {
                      data: sortedData,
                      success: true,
                    };
                  }}
                  rowKey="_id"
                  pagination={false}
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
      </>
    );
  }
};

export default TableData;
