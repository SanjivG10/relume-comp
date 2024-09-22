import { DeviceType, Navbar } from "@/components/common/Navbar";
import { Header109 } from "@/components/Header109";
import { Header111 } from "@/components/Header111";
import { useState } from "react";

export default function Home() {
  const [selectedDevice, setSelectedDevice] = useState<DeviceType>("desktop");

  return (
    <div className="flex flex-col">
      <div className="flex flex-col bg-gray-100">
        <Navbar selectedDevice={selectedDevice} setSelectedDevice={setSelectedDevice} />
        <div className="flex justify-center">
          {/* <Header109 selectedDevice={selectedDevice} /> */}
          <Header111 selectedDevice={selectedDevice} />
        </div>
      </div>
    </div>
  );
}
