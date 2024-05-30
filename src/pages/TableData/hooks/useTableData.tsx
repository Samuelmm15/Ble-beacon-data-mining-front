import React from "react";

const useTableData = () => {
  async function getBeaconById(id: string) {
    const response = await fetch(`https://localhost:3000/api/beacon/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Error fetching beacons data");
    }
  }

  async function getAllBeaconIds() {
    const response = await fetch("https://localhost:3000/api/beacon/ids", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Error fetching beacons data");
    }
  }

  return {
    getBeaconById,
    getAllBeaconIds,
  };
};

export default useTableData;
