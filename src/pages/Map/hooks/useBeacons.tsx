import React from "react";

const useBeacons = () => {
  async function getBeacons() {
    const response = await fetch("https://localhost:3000/api/beacon", {
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

  async function getDrones() {
    const response = await fetch("https://localhost:3000/api/trackerData", {
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

  async function getHistoryBeacon(beaconId: number, time: string) {
    const response = await fetch(
      `https://localhost:3000/api/beacon/beaconsByBeforeTime/${beaconId}?time=${time}`,
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
      throw new Error("Error fetching beacons data");
    }
  }

  return { getBeacons, getDrones, getHistoryBeacon };
};

export default useBeacons;
