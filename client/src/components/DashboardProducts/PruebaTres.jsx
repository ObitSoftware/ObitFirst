import React, { useEffect, useState } from 'react'
import {Card, CardBody} from "@nextui-org/react";
import iconProduct from "../../img/productsIcon.png"
import { quantityOfProducts, calcularMontoTotal, getQuantityProductsCategory, topMoreBoughtProducts, topProductsWithMoreNetGains } from './FunctionsGetDataOfProducts';
import  HistoricGainsProduct  from '../Graficos/HistoricGainsProduct';
import RankingVentaProductos from '../Graficos/RankingVentaProductos';
import VentasPorMes from '../Graficos/VentasPorMes';
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button} from "@nextui-org/react";
import { formatePrice } from '../../functions/formatPrice';
import start from "../../img/star.png"
import factured from "../../img/factured.png"
import arrowDash from "../../img/arrowDashboard.png"
import arrowGreen from "../../img/arrowGreen.png"
import purchaseIcon from "../../img/purchaseIcon.png"

const PruebaTres = () => {

    
    const [totalQuantityProducts, setTotalQuantityProducts] = useState(null)
    const [totalMoneyInverted, setTotalMoneyInverted] = useState(null)
    const [quantityProductsOfCategory, setQuantityProductsOfCategory] = useState([])
    const [productsMoreBought, setProductsMoreBought] = useState([])
    const [productsWithMoreNetGains, setProductsWithMoreNetGains] = useState([])
    const [monthSelected, setMonthSelected] = useState("")

    useEffect(() => {
        const getTotalQuantity = async () => {
          try {
            const quantity = await quantityOfProducts();
            setTotalQuantityProducts(quantity);
          } catch (error) {
            console.error(error);
          }
        };
        getTotalQuantity();
      }, []); 


      useEffect(() => { 
         const getTotalMoneyInverted = async () => { 
            try {
               const total = await calcularMontoTotal()
               const formatedNmber = formatePrice(total)
               setTotalMoneyInverted(formatedNmber)
            } catch (error) {
                console.error(error);
            }
         }
         getTotalMoneyInverted()
      }, [])


      useEffect(() => { 
        const getTotalByCategory = async () => { 
           try {
              const total = await getQuantityProductsCategory()
              setQuantityProductsOfCategory(total)
           } catch (error) {
               console.error(error);
           }
        }
        getTotalByCategory()
     }, [])

     
     useEffect(() => { 
        const getMoreBought = async () => { 
           try {
              const moreBought = await topMoreBoughtProducts()
              setProductsMoreBought(moreBought)
           } catch (error) {
               console.error(error);
           }
        }
        getMoreBought()
     }, [])

         
     useEffect(() => { 
        const getMoreNetGains = async () => { 
           try {
              const moreGains = await topProductsWithMoreNetGains()
              setProductsWithMoreNetGains(moreGains)
           } catch (error) {
               console.error(error);
           }
        }
        getMoreNetGains()
     }, [])

     useEffect(() => { 
         console.log(quantityProductsOfCategory)
     }, [quantityProductsOfCategory])


  return (
<div class="grid grid-cols-3 grid-rows-3 grid-auto-rows-min">
 <div class="col-start-1 row-start-1 bg-red-500">
  <div class="h-12">lllllllllllllllllll</div>
 </div>
 <div class="col-start-1 row-start-2 bg-blue-500">
  <div class="h-12">lllllllllllllllllll</div>
 </div>
 <div class="col-start-1 row-start-3 bg-green-500">
  <div class="h-36">lllllllllllllllllll</div>
 </div>
 <div class="col-start-2 col-span-2 row-span-2 bg-yellow-500">
  <div>lllllllllllllllllll</div>
 </div>
 <div class="col-start-2 row-span-2 bg-purple-500">
  <div>lllllllllllllllllll</div>
 </div>
 <div class="col-start-3 row-span-1 bg-purple-200">
  <div>lllllllllllllllllll</div>
 </div>
</div>
  )
}

export default PruebaTres
/*
  <div class="grid grid-cols-3 grid-rows-3">
    <div class="col-start-1 row-start-1 bg-red-500">lllllllllllllllllll</div>
    <div class="col-start-1 row-start-2 bg-blue-500">lllllllllllllllllll</div>
    <div class="col-start-1 row-start-3 bg-green-500">lllllllllllllllllll</div>
    <div class="col-start-2 col-span-2 row-span-2 bg-yellow-500">lllllllllllllllllll</div>
    <div class="col-start-2 row-span-2 bg-purple-500">lllllllllllllllllll</div>
    <div class="col-start-3 row-span-1 bg-purple-200">lllllllllllllllllll</div>
    </div>
*/