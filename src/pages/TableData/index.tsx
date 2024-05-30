import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import React, { useEffect, useRef, useState } from "react";
import NavBar from "src/components/NavBar";
import useTableData from "./hooks/useTableData";
import { Spin, message } from "antd";

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
      title: "Identificador",
      dataIndex: "beaconId",
      key: "beaconId",
      valueType: "text",
    },
    {
      title: "Tiempo",
      dataIndex: "time",
      key: "time",
      valueType: "dateTime",
    },
    {
      title: "Latitud",
      dataIndex: "location",
      key: "latitude",
      valueType: "text",
      render: (_, record) => record.location?.latitude,
    },
    {
      title: "Longitud",
      dataIndex: "location",
      key: "longitude",
      valueType: "text",
      render: (_, record) => record.location?.longitude,
    },
    {
      title: "Altitud",
      dataIndex: "location",
      key: "altitude",
      valueType: "text",
      render: (_, record) => record.location?.altitude,
    },
    {
      title: "Orientación",
      dataIndex: "location",
      key: "bearing",
      valueType: "text",
      render: (_, record) => record.location?.bearing,
    },
    {
      title: "Velocidad",
      dataIndex: "location",
      key: "speed",
      valueType: "text",
      render: (_, record) => record.location?.speed,
    },
  ];

  if (beaconData.length === 0) {
    return <Spin size="large" fullscreen/>;
  } else {
    return (
      <div>
        <NavBar isLoggedIn={isLoggedIn} />
        <div style={{ marginTop: "10px" }}>
          <ProTable<Beacon>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={async () => {
              return {
                data: beaconData,
                success: true,
              };
            }}
            rowKey="_id"
            search={false}
            pagination={false}
          />
        </div>
      </div>
    );
  }
};

export default TableData;
