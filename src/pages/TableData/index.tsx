import { ProColumns } from "@ant-design/pro-table";
import React, { useEffect, useState } from "react";
import NavBar from "src/components/NavBar";

interface Beacon {
  _id: string;
  beaconId: number;
  time: string;
  location: {
    latitude: number;
    longitude: number;
    altitude: number;
    bearing: string;
    speed: string;
  };
}

const TableData = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const columns: ProColumns<Beacon>[] = [
    
  ];

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} />
    </div>
  );
};

export default TableData;
