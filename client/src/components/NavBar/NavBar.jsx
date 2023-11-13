import React, {useEffect, useState} from "react";
import {NavbarMenuToggle, NavbarItem, NavbarMenuItem, NavbarMenu} from "@nextui-org/react";
//import {AcmeLogo} from "./AcmeLogo.jsx";
import obitLogoSmall from "../../img/obitLogoSmall.png"
import config from "../../img/confi.png"


export default function Navbar() {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Profile",
    "Dashboard",
    "Activity",
    "Analytics",
    "System",
    "Deployments",
    "My Settings",
    "Team Settings",
    "Help & Feedback",
    "Log Out",
  ];

  

  return (
   <div className='fixed inset-x-0 top-0 h-16 w-full' style={{backgroundColor:"#728EC3"}}> {/*75px*/}
        <div className="w-full flex items-center justify-between  red-600 h-12 mt-2">
            <div className="flex ml-6 items-center"> 
               <div className="dropdown block md:hidden">
                    <label tabIndex={1} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-black">
                        <path fill-rule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clip-rule="evenodd" />
                    </svg>
                    </label>
                    <ul tabIndex={1} className="bg-gray-200 menu menu-sm dropdown-content mt-3 z-[1] p-2  rounded-box w-52">
                        <li><a>.............</a></li>
                        <li><a>.............</a></li>
                        <li><a>.............</a></li>
                    </ul>
                </div>
                <div className=" flex text-center justify-center rounded-full" style={{backgroundColor:"#D3D3D3"}}>
                  <img src={obitLogoSmall} className="h-8 w-8 m-2"/>
                </div>
                 <div className="hidden lg:block">
                    <div className="flex flex-col ml-4 items-start  justify-center">
                        <p className="text-white font-bold text-md">EMPRESA 01</p>              
                        <p className="text-white text-sm">Usuario: MDB</p>             
                    </div>
                  
                 </div>
            </div>
            <div className="flex items-center mr-6">
                <div className="avatar">
                <div className="w-6 rounded-full m-2">
                    <img src={config} style={{color:"white"}}/>
                </div>
                </div>
           </div>
        </div>
   </div> 
    
  );
}