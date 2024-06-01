import React from "react";

const useBeaconSecondOptionalModal = () => {
  async function getBeaconByIdFiltered(
    id: string,
    startDate: string,
    endDate: string
  ) {
    const response = await fetch(
      `https://localhost:3000/api/beacon/${id}?startDate=${startDate}&endDate=${endDate}`,
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

  return {
    getBeaconByIdFiltered,
  };
};

export default useBeaconSecondOptionalModal;
