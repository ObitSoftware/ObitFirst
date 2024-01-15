import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import obtenerHoraExacta from '../../functions/actualHour'
import obtenerFechaActual from '../../functions/actualDate'

const Profile = () => {

    const {clientId} = useParams()
    const [actualDate, setActualDate] = useState(obtenerFechaActual())
    const [theHour, setTheHour] = useState(obtenerHoraExacta())
    const [messageForNote, setMessageForNote] = useState("")
    const [userData, setUserData] = useState([])
    const [clientName, setClientName] = useState([])
    const [allPurchases, setAllPurchases] = useState([])
    const [allEmails, setAllEmails] = useState([])
    const [clientPurchases, setClientPurchases] = useState([])
    const [clientEmails, setClientEmails] = useState([])
    const [clientAmountSpentOnPurchases, setClientAmountSpentOnPurchases] = useState("")
    const [wait, setWait] = useState(false)
    const [userNotes, setUserNotes] = useState([])

    useEffect(() => { 
            axios.get(`http://localhost:3000/clientes/${clientId}`)
            .then((res) => { 
             setUserData(res.data)            
            })
            .catch((err) => console.log(err))

            axios.get("http://localhost:3000/venta")
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

           axios.get("http://localhost:3000/getNotes")
           .then((res) => { 
            console.log(res.data)
            const dataNotes = res.data
            setUserNotes(dataNotes.filter((not) => not.addresseeId === clientId))
           })
          .catch((err) => console.log(err))
    }, [])

    useEffect(() => { 
       setClientName(userData.map((us) => us.nombre))
       setClientPurchases(allPurchases.filter((pur) => pur.nombreCliente === clientName[0]))
       setClientAmountSpentOnPurchases(clientPurchases.reduce((acc, el) => acc + el.total, 0))
       const clientEmail = userData.map((us) => us.email)
       console.log(clientEmail[0])
       setClientEmails(allEmails.filter((em) => em.addressee.some((e) => e === clientEmail[0])))
        setTimeout(() => { 
           setWait(true)
        }, 2500)
      }, [userData, allPurchases, allEmails])

      
    useEffect(() => { 
      console.log("NOTAS ---->", userNotes)
     }, [userNotes])


      const createNote = () => { 
         const noteData = ({
          date: actualDate,
          hour: theHour,
          message: messageForNote,
          addresseeId: clientId,
          resolved: false
         })
         axios.post("http://localhost:3000/newNote", noteData)
              .then((res) => console.log(res.data))
              .catch((err) => console.log(err))
       }

  




  return (
    <div>
          <h4>Usuario seleccionado:</h4>

          <div className='flex flex-col items-center justify-center'>
            {userData.map((us) => ( 
              <div className='flex flex-col items-center justify-center mt-8'>
                <p className='text-sm font-medium'>Nombre: {us.nombre}</p>
                <p className='text-sm font-medium'>Email: {us.email}</p>
                <p className='text-sm font-medium'>Telefono: {us.telefono}</p>
                <p className='text-sm font-medium'>Dni: {us.dni}</p>         
              </div>
            ))}

           {wait ? 
            <div className='flex gap-4 items-center justify-center mt-8'>
               <h4>Compras del usuario seleccionado:</h4>
               {clientPurchases.map((cl) => ( 
                <div className='mt-6 border'>
                   <p>Producto Comprado: {cl.nombreProducto}</p>
                   <p>Cantidad Comprada: {cl.cantidad}</p>
                   <p>Fecha de Compra: {cl.fechaCreacion}</p>
                   <p>Proveedor Producto: {cl.proveedorProducto}</p>
                   <p>Total Gastado: {cl.total}</p>
                </div>
               ))}
            </div>
            :
            <p>Esperando datos de compras...</p>
            }
            
            {wait ? 
             <div className='flex flex-col mt-8'>
                <p>Monto total gastado por el usuario: {clientAmountSpentOnPurchases}</p>
                <p className='mt-2'>Cantidad total de compras realizadas: {clientPurchases.length}</p>
             </div> 
             :
              null
            }

            {wait ? 
            <div className='flex gap-4 items-center justify-center mt-8'>
               <h4>Emails enviados al usuario seleccionado:</h4>
               {clientEmails.map((cl) => ( 
                <div className='mt-6 border'>
                   <p>Fecha: {cl.date}</p>
                   <p>Hora: {cl.hour}</p>
                   <p>Mensaje: {cl.message}</p>
                   <p>Asunto: {cl.title}</p>              
                </div>
               ))}
            </div>
            :
            <p>Esperando datos de compras...</p>
            }   

            <div className='flex flex-col items-center justify-center'>
                <h5 className='text-md font-medium text-black'>Crear Nota</h5>
                <textarea className='rounded-lg bg-gray-200 text-black' onChange={(e) => setMessageForNote(e.target.value)}/>
                <button className='bg-blue-400 text-white mt-4' onClick={() => createNote()}>Enviar</button>
             </div>


             {userNotes.length !== 0 ?
             <div className='border'>
                <h5 className='text-md font-medium text-black'>Notas creadas para este usuario</h5>
                {userNotes.map((not) => ( 
                  <div className='flex flex-col border'>
                     <p>Fecha: {not.date} </p>
                     <p>Hora: {not.hour} </p>
                     <p>Mensaje:{not.message} </p>
                  </div>
                ))}
             </div> : <p>No tienes notas creadas para este usuario</p>}

          </div>
    </div>
  )
}

export default Profile
