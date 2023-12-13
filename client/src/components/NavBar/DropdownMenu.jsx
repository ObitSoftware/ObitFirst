import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import config from "../../img/confi.png"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Link } from "react-router-dom";

export default function DropDownNavBarOptions() { 

    const navigate = useNavigate()
    const userCtx = useContext(UserContext)

    const logOut = () => { 
      userCtx.updateUser(null)
      userCtx.updateUserName(null)
      userCtx.updateUserRol(null)
      userCtx.updateUserEmail(null)
    }

    const goToPage = (rute) => { 
      navigate(rute)
      logOut()
  }


  return (
    <Dropdown className="bg-white text-black">
      <DropdownTrigger>
        <img src={config} className="cursor-pointer"/>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example"   
        onAction={(key) => console.log(key)}  
       >
         <DropdownItem key="new"><Link to="/usersData" className="text-blue-500 hover:text-blue-600">Mi perfil</Link></DropdownItem>
         <DropdownItem key="new"><Link to="/usersData" className="text-blue-500 hover:text-blue-600">Usuarios</Link></DropdownItem>
         <DropdownItem key="edit"><Link to="/usersData" className="text-blue-500 hover:text-blue-600">Configuracion</Link></DropdownItem> 
         <DropdownItem onClick={() => goToPage("/")} color={"#338EF7"}><Link to="/" className="text-blue-500 hover:text-blue-600">Cerrar Sesion</Link></DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
