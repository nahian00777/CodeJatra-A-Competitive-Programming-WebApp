import React from "react";
import Sidebar from "../../components/Sidebar";

function LandingPage() {
  return (
    <div className="flex h-screen">
      {/* Optionally include the Sidebar */}
      <Sidebar />
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-2xl font-bold">Welcome to the Landing Page</h1>
      </div>
    </div>
  );
}

export default LandingPage;
