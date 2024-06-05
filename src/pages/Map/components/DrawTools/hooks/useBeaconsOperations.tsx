import React from "react";

const useBeaconsOperations = () => {
  async function getNumberOfBeacons(
    _southWest: any,
    _northEast: any,
    time: any
  ) {
    const response = await fetch(
      "https://localhost:3000/api/beaconOperations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _southWest, _northEast, time }),
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = response.json();
      return data;
    } else {
      throw new Error("The operation could not be performed");
    }
  }

  return {
    getNumberOfBeacons,
  };
};

export default useBeaconsOperations;
