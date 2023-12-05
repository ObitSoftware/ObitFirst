import React from "react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import arrowDownGray from "../../img/arrowDownGray.png"

export default function ChooseBranch() {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["SUCURSAL 03 - BUENOS AIRES"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown>
      <DropdownTrigger>
        <div className="flex text-center items-center gap-2">
            <p style={{color:"#96ADD9"}} className='font-bold underline text-lg cursor-pointer'> {selectedValue} </p>
           <img src={arrowDownGray} className="h-6 w-6 cursor-pointer"/>
        </div>
      </DropdownTrigger>
      <DropdownMenu 
        aria-label="Multiple selection example"
        variant="flat"
        closeOnSelect={false}
        disallowEmptySelection
        selectionMode="multiple"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem style={{color:"#96ADD9"}}  className="font-bold" key="text">SUCURSAL 01 - BUENOS AIRES</DropdownItem>
        <DropdownItem style={{color:"#96ADD9"}}  className="font-bold" key="number">SUCURSAL 02 - BUENOS AIRES</DropdownItem>
        <DropdownItem style={{color:"#96ADD9"}}  className="font-bold" key="date">SUCURSAL 03 - BUENOS AIRES</DropdownItem>
        <DropdownItem style={{color:"#96ADD9"}}  className="font-bold" key="single_date">SUCURSAL 01 - ROSARIO</DropdownItem>
        <DropdownItem style={{color:"#96ADD9"}}  className="font-bold" key="iteration">SUCURSAL 01 - CORDOBA</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
