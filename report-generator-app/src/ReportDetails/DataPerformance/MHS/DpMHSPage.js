import React from "react";
import Dp_MHS_httpSS_Component from "./Dp_MHS_httpSS_Component";
import Dp_MHS_httpMS_Component from "./Dp_MHS_httpMS_Component";
import Dp_MHS_Udp_Component from "./Dp_MHS_Udp_Component";
import Dp_MHS_Ping_Component from "./Dp_MHS_Ping_Component";

function Dp_MHS_Page(){
    return(
    <div className='page-content'>
      <Dp_MHS_httpSS_Component />
      <Dp_MHS_httpMS_Component />
      {/* <Dp_MHS_Udp_Component /> */}
      {/* <Dp_MHS_Ping_Component /> */}
    </div>
    );
};

export default Dp_MHS_Page;