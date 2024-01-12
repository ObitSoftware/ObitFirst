import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'


const ProviderProfile = () => {

    const {providerId} = useParams()
    const [providerData, setProviderData] = useState([])
    const [providerEmail, setProviderEmail] = useState("")
    const [providerName, setProviderName] = useState("")
    const [allPurchases, setAllPurchases] = useState([])
    const [allEmails, setAllEmails] = useState([])
    const [emailsToProvider, setEmailsToProvider] = useState([])
    const [purchasesToProvider, setPurchasesToProvider] = useState([])
    const [totalAmountInvertedOnProvider, setTotalAmountInvertedOnProvider] = useState("")
    const [allActions, setAllActions] = useState([])    

    useEffect(() => { 
        axios.get(`http://localhost:3000/proveedores/${providerId}`)
        .then((res) => {
            const data = res.data
            setProviderData(data)               
        })
        .catch((err) => console.log(err))

        axios.get("http://localhost:3000/compras")
        .then((res) => { 
         console.log(res.data)
         setAllPurchases(res.data)
        })
       .catch((err) => console.log(err))

        axios.get("http://localhost:3000/email")
        .then((res) => { 
         console.log(res.data)
         setAllEmails(res.data)
        })
        .catch((err) => console.log(err))
      }, [providerId])

      useEffect(() => { 
        setProviderEmail(providerData.email)  
        setProviderName(providerData.nombre)  
      }, [providerData, allPurchases, allEmails])

      useEffect(() => { 
        const searchEmails = allEmails.filter((em) => em.addressee.some((eme) => eme === providerEmail))
        console.log("aca!",searchEmails)
        const searchPurchasesToProvider = allPurchases.filter((em) => em.productosComprados.some((eme) => eme.proveedor[0] === providerName))
        const totalAmount = searchPurchasesToProvider.map((se) => se.productosComprados.filter((prod) => prod.proveedor[0] === providerName).map((p) => p.total)).flat()
        const getTotalAmount = totalAmount.reduce((acc, el) => acc + el, 0)
        setEmailsToProvider(searchEmails)
        setPurchasesToProvider(searchPurchasesToProvider)
        setTotalAmountInvertedOnProvider(getTotalAmount)
        setAllActions([searchEmails, searchPurchasesToProvider])
      }, [providerEmail, providerName])

      useEffect(() => {
        if (Array.isArray(allActions) && allActions.length >= 2) {
            const currentDate = new Date();
            const convertToDate = (dateString) => {
            const [day, month, year] = dateString.split('/');
            return new Date(`${year}-${month}-${day}`);
          };
    
          const ultimaCompra = allActions[1].reduce((ultima, compra) => {
            const fechaCompra = convertToDate(compra.fechaCompra);
            return fechaCompra > convertToDate(ultima.fechaCompra) ? compra : ultima;
          }, allActions[1][0]);
      
          const ultimoEmail = allActions[0].reduce((ultimo, email) => {
            const fechaEmail = convertToDate(email.date);
            return fechaEmail > convertToDate(ultimo.date) ? email : ultimo;
          }, allActions[0][0]);
      
          const resultados = {
            compras: ultimaCompra,
            emails: ultimoEmail,
          };
          setAllActions(resultados)
        } else {
          console.log("allActions no tiene el formato esperado.", allActions);
        }
      }, [allActions]);

      useEffect(() => { 
           console.log(allActions)
      }, [allActions])

 


  return (
    <div className='flex'>
      
       
           {providerData.length !== 0 ?
           <div>
                 <h2>Provedor Seleccionado: </h2>
                    <div className='flex flex-col'>
                        <p>{providerData.nombre}</p> 
                        <p>{providerData.email}</p>
                        <p>{providerData.telefono}</p>
                        <p>{providerData._id} </p>
                    </div>                
              </div> : 
              <p>Esperando.........</p>
              } 

             {emailsToProvider.length !== 0 ? 
              <div className='flex flex-col gap-4 mt-6 items-center'> 
              <p className='font-bold text-zinc-600'>Emails enviados al Proveedor</p>
               {emailsToProvider.map((em) => (
                <div key={em._id} className='flex flex-col border'>
                    <p>Dia del Mail: {em.date} </p>
                    <p>Hora del Mail: {em.hour} </p>
                    <p>Mensaje del Mail: {em.message} </p>
                    <p>Titulo del Mail: {em.title} </p>
                    
                </div>
               ))}
              </div>
             :
             <p>No hay emails enviados.......</p>
             }


             {purchasesToProvider.length !== 0 ? 
              <div className='flex flex-col items-center mt-6'>
                 <p className='font-bold text-zinc-600'>Compras realizadas al proveedor</p>
                 {purchasesToProvider.map((provEmails) => ( 
                    <div className='flex flex-col items-center mt-2 border'>
                        <p>Fecha de compra: {provEmails.fechaCompra}</p>
                        <p>Productos Comprados: {provEmails.productosComprados.filter((prod) => prod.proveedor[0] === providerName).map((p) => p.nombreProducto)}</p>
                        <p>Cantidad comprada: {provEmails.productosComprados.filter((prod) => prod.proveedor[0] === providerName).map((p) => p.cantidad)}</p>
                        <p>Monto gastado: {provEmails.productosComprados.filter((prod) => prod.proveedor[0] === providerName).map((p) => p.total)}</p>
                    </div>
                 ))}
              </div>
              :
              <p>Esperando compras realizadas.......</p>
             }

             {totalAmountInvertedOnProvider.length !== 0 ?  <p className='font-bold text-zinc-600'>El monto total invertido en este proveedor es: {totalAmountInvertedOnProvider}</p> : <p>Esperando total...</p>}  

           
        
    </div>
  )
}

export default ProviderProfile
