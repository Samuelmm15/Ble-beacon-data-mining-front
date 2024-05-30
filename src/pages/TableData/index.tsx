import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "src/components/NavBar";
import useTableData from "./hooks/useTableData";
import { Spin, message, ConfigProvider } from "antd";
import enUS from "antd/lib/locale/en_US";

interface Beacon {
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

  const { getBeaconById } = useTableData();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    getBeaconById(beaconId)
      .then((data) => {
        console.log(data);
        setBeaconData(data);
      })
      .catch((error) => {
        message.error(error.message);
      });
  }, [beaconId]);

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

  if (beaconData.length === 0) {
    return <Spin size="large" fullscreen />;
  } else {
    return (
      <div>
        <NavBar isLoggedIn={isLoggedIn} />
        <div style={{ marginTop: "70px" }}>
          <ConfigProvider locale={enUS}>
            <ProTable<Beacon>
              columns={columns}
              actionRef={actionRef}
              cardBordered
              request={async (params, sorter, filter) => {
                let sortedData = [...beaconData];
              
                if (sorter && sorter.location) {
                  sortedData.sort((a, b) => {
                    const aValue = parseFloat(a.location?.speed || '0');
                    const bValue = parseFloat(b.location?.speed || '0');
                    const compareResult = aValue - bValue;
                    return sorter.location === 'ascend' ? compareResult : -compareResult;
                  });
                } else if (sorter && sorter.time) {
                  sortedData.sort((a, b) => {
                    const aValue = new Date(a.time).getTime();
                    const bValue = new Date(b.time).getTime();
                    const compareResult = aValue - bValue;
                    return sorter.time === 'ascend' ? compareResult : -compareResult;
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
            />
          </ConfigProvider>
        </div>
      </div>
    );
  }
};

export default TableData;
