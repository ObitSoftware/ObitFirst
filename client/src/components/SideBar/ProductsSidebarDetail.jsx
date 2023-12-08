import React from 'react'
import {Card, CardBody} from "@nextui-org/react";


const ProductsSidebarDetail = () => {
  return (
    <div className=''>
        <div className='flex gap-12 items-center justify-center'>
            <div>
                <Card className='bg-white h-16 flex items-center justify-center'>
                    <CardBody className='flex items-center justify-center'>
                        <p className='font-bold'>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>
            <div>
                <Card>
                    <CardBody>
                        <p>Make beautiful websites regardless of your design experience.</p>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
  )
}

export default ProductsSidebarDetail
