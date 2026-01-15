import React from "react";
import Dp_MHS_httpSS_Component from "./Dp_MHS_httpSS_Component";
import Dp_MHS_httpMS_Component from "./Dp_MHS_httpMS_Component";
import Dp_MHS_Udp_Component from "./Dp_MHS_Udp_Component";
import Dp_MHS_Ping_Component from "./Dp_MHS_Ping_Component";
import DynamicHeader from "../../../CommonPage/DynamicHeader";


//TODO MHS location is good or moderate or poor need to be determined
function Dp_MHS_Page({ city }) {
  return (
    <>
      <DynamicHeader level={2}>Mobile Hotspot Test - 5G Auto - {city}</DynamicHeader>
      <Dp_MHS_httpSS_Component city={city} />
      <Dp_MHS_httpMS_Component city={city} />
      <Dp_MHS_Udp_Component city={city} />
      <Dp_MHS_Ping_Component city={city} />
    </>
  );
};

export default Dp_MHS_Page;