// import React from "react";

import Header from "../components/Header";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Navbar />
      <Header />
    </div>
  );
};

export default Home;
