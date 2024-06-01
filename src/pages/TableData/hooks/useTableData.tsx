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

  async function getTrackerById(id: string) {
    const response = await fetch(`https://localhost:3000/api/trackerData/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Error fetching tracker data");
    }
  }

  async function getAllTrackerIds() {
    const response = await fetch("https://localhost:3000/api/trackerData/ids", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Error fetching tracker data");
    }
  }

  async function getTrackerByFiltered(id: string, startDate: string, endDate: string) {
    const response = await fetch(
      `https://localhost:3000/api/trackerData/${id}?startDate=${startDate}&endDate=${endDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("Error fetching tracker data");
    }
  }

  return {
    getBeaconById,
    getAllBeaconIds,
    getTrackerById,
    getAllTrackerIds,
    getTrackerByFiltered,
  };
};

export default useTableData;
