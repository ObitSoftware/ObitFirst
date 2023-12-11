import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import config from "../../img/confi.png"
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

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
    <Dropdown>
      <DropdownTrigger>
        <img src={config} className="cursor-pointer"/>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Action event example"   
        onAction={(key) => console.log(key)}  
       >
         <DropdownItem key="new" >Mi Perfil</DropdownItem>
         <DropdownItem key="edit">Configuracion</DropdownItem> 
         <DropdownItem onClick={() => goToPage("/")}>Cerrar Sesion </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
