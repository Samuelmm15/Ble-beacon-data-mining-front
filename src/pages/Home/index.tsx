import React, { useEffect } from "react";
import useTrackerData from "./hooks/useTrackerData";
import NavBar from "./components/NavBar";

const Home = () => {
  const { getTracker } = useTrackerData();

  useEffect(() => {
    getTracker()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error fetching tracker data:", error);
      });
  });

  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Home;
