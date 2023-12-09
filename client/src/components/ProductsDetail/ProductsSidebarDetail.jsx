import React from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"


const ProductsSidebarDetail = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-[800px]'>

        <div className='flex gap-12 items-center justify-center'>
            <div className='w-[400px] '>
                <Card isHoverable={true} className='bg-white h-24 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Cantidad de Productos. Numeros en cantidad</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-24 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Total de $ de los productos</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-24 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>110.000$</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>

        <div className='flex gap-12 items-center justify-center mt-12'>
            <div className='w-[400px] '>
                <Card isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                    <CardBody>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Cantidad de Productos. Numeros en cantidad</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img className='h-44 w-44' src={"https://thumbs.dreamstime.com/b/gr%C3%A1fico-circular-transparente-azul-y-gr%C3%A1ficos-de-barras-diagramas-negocio-sobre-el-fondo-blanco-estad%C3%ADsticas-crecimiento-221788349.jpg"}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                    <CardBody>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Total de $ de los productos</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img className='h-44 w-44' src={"https://thumbs.dreamstime.com/b/gr%C3%A1fico-circular-transparente-azul-y-gr%C3%A1ficos-de-barras-diagramas-negocio-sobre-el-fondo-blanco-estad%C3%ADsticas-crecimiento-221788349.jpg"}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className='w-[400px] '>
                <Card  isHoverable={true} className='bg-white h-64 flex items-center justify-center'>
                    <CardBody >
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>110.000$</p>
                        </div>
                        <div className='flex items-center justify-center'>
                            <img className='h-44 w-44' src={"https://thumbs.dreamstime.com/b/gr%C3%A1fico-circular-transparente-azul-y-gr%C3%A1ficos-de-barras-diagramas-negocio-sobre-el-fondo-blanco-estad%C3%ADsticas-crecimiento-221788349.jpg"}/>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>

        <div className='flex gap-12 items-center justify-center mt-12'>
            <div className='w-[850px] '>
                <Card className='bg-white h-64 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Historial de Ganancias por producto</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
          
            <div className='w-[400px] '>
                <Card className='bg-white h-64 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <div className='flex items-center justify-center gap-2'>
                            <img src={iconProduct} className='h-6 object-fit w-6'/>
                            <p className='font-bold text-xs'>Sin Definir</p>
                        </div>
                    </CardBody>
                </Card>
            </div>
        </div>


       
    </div>
  )
}

export default ProductsSidebarDetail
