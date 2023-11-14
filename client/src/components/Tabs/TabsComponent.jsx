import React from "react";
import {Tabs, Tab} from "@nextui-org/react"; 

export default function TabsComponent() {
  const variants = [
    "solid"
  ];

  return (
    <div className="flex flex-wrap gap-4">
      {variants.map((variant) => (
        <Tabs key={variant} variant={variant} aria-label="Tabs variants">
          <Tab key="Productos" title="Productos"/>
          <Tab key="Ventas" title="Ventas"/>
          <Tab key="Proveedores" title="Proveedores"/>
        </Tabs>
      ))}
    </div>
  );
}