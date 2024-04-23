import React, { useEffect } from "react";
import useTrackerData from "./hooks/useTrackerData";

const Home = () => {
  const { getTracker } = useTrackerData();
  
  useEffect(() => {
    getTracker().then((data) => {
      console.log(data);
    }).catch((error) => {
      console.error('Error fetching tracker data:', error);
    });
  });

  return (
    <div>
      <h1>Example Home Page</h1>
    </div>
  );
};

export default Home;
