import { DeviceType, Navbar } from "@/components/common/Navbar";
import { Header109 } from "@/components/Header109";
import { useState } from "react";

export default function Home() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("desktop");

  return (
    <div className="flex h-[300vh] flex-col bg-gray-100">
      <Navbar selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
      <div className="flex justify-center">
        <Header109 selectedDevice={selectedDevice} />
      </div>
    </div>
  );
}
