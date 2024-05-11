import React from "react";

const useTrackerData = () => {

  async function getTracker() {
    const res = await fetch("https://localhost:3000/api/trackerData/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "charset": "utf-8",
      },
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Failed to fetch tracker data");
    }
  }

  return {
    getTracker,
  };
};

export default useTrackerData;
