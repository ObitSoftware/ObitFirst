import React from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useEffect, useState } from 'react'
import obtenerHoraExacta from '../../functions/actualHour'
import obtenerFechaActual from '../../functions/actualDate'
import edit from "../../img/edit.png"
import { formatePrice } from '../../functions/formatPrice'


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

    const [showEmails, setShowEmails] = useState(false)
    const [showActivitie, setShowActivitie] = useState(false)
    const [showPurchases, setShowPurchases] = useState(false)
    const [showNotes, setShowNotes] = useState(true)

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

  
   const showJustEmails = () => { 
      setShowActivitie(false)
      setShowEmails(true)
      setShowPurchases(false)
      setShowNotes(false)
   }

     
   const showJustNotes = () => { 
      setShowActivitie(false)
      setShowEmails(false)
      setShowPurchases(false)
      setShowNotes(true)
   }

     
   const showJustPurchases = () => { 
      setShowActivitie(false)
      setShowEmails(false)
      setShowPurchases(true)
      setShowNotes(false)
   }

   const showJustActivitie = () => { 
      setShowActivitie(true)
      setShowEmails(false)
      setShowPurchases(false)
      setShowNotes(false)
   }



  return (
    <div>
       <div className='flex flex-col ml-24 2xl:ml-2 w-[500px] xl:w-[1050px] 2xl:w-[1400px]'>
           <div className='flex justify-between gap-60 w-full'>
              <div className='flex justify-start'>
               {userData.map((us) => ( 
                  <div className='flex flex-col justify-start items-start'>
                     <p className='text-xl font-medium text-black'>{us.nombre}</p>       
                     <p className='text-sm font-medium text-black mt-1'>Cliente</p>
                  </div>    
               ))}
              </div>
              <div className='flex items-center text-center gap-4 mt-2'>
                <button style={{backgroundColor:"#728EC3"}} className='rounded-xl items-center text-center h-7 2xl:h-9 text-white font-bold text-xs 2xl:text-sm'>Enviar Email</button>
                <button style={{backgroundColor:"#728EC3"}} className='rounded-xl items-center text-center h-7 2xl:h-9 text-white font-bold text-xs 2xl:text-sm'>Crear Nota </button>
                <img src={edit} className='w-6 h-6'/>
              </div>
           </div>
           <div className='flex justify-between w-auto'>
             <div className='flex flex-col bg-white w-96'>
                  <div className='flex flex-col items-start justify-start mt-2 '>
                     <h5 className='font-bold text-md'  style={{color:"#728EC3"}}>Stats</h5>
                     <p className='mt-1 text-sm'>El usuario esta activo</p>
                     <p className='text-sm'>El usuario esta activo</p>
                  </div>
                  <div className='mt-6 flex flex-col items-start justify-start'>
                     <h5 className='font-bold text-md' style={{color:"#728EC3"}}>Informacion Basica</h5>
                     {userData.map((us) => ( 
                        <div className='flex flex-col justify-start items-start'>
                           <p className='text-sm font-medium'> 📤 Email: {us.email}</p>
                           <p className='text-sm font-medium'> ☎️ Telefono: {us.telefono}</p>
                           <p className='text-sm font-medium'> 💳 Dni: {us.dni}</p>         
                        </div>    
                     ))}
                  </div>
                  <div className='mt-6 flex flex-col items-start justify-start'>
                     <h5 className='font-bold text-md'  style={{color:"#728EC3"}}>Ultima Modificacion</h5>
                     <p  className='text-sm'> 🟢 Ayer a las 10:15pm</p>
                  </div>

                  <div className='mt-6 flex flex-col items-start justify-start'>
                     <h5 className='font-bold text-md'  style={{color:"#728EC3"}}>Detalles</h5>
                     <p className='mt-3'>Monto total gastado por el usuario: {formatePrice(clientAmountSpentOnPurchases)}</p>
                     <p className='mt-1'>Cantidad total de compras realizadas: {clientPurchases.length}</p>
                  </div>
             </div>          
             <div className='flex flex-col'>
               <div className='flex gap-12 2xl:gap-24 mt-2 w-full bg-bg-white-200 mr-2'>
                  <p  className={`rounded-lg bg-bg-white-200 items-center text-center h-8 cursor-pointer text-xs w-auto ${showActivitie ? 'text-blue-600' : 'text-black' }  font-bold`}  onClick={() => showJustActivitie()}>Ultimos Movimientos </p>
                  <p className={`rounded-lg bg-bg-white-200 items-center text-center h-8 cursor-pointer text-xs w-auto ${showNotes ? 'text-blue-600' : 'text-black' }  font-bold`} onClick={() => showJustNotes()}> Notas </p>
                  <p  className={`rounded-lg bg-bg-white-200 items-center text-center h-8 cursor-pointer text-xs w-auto ${showEmails ? 'text-blue-600' : 'text-black' }  font-bold`}   onClick={() => showJustEmails()}>Emails </p>
                  <p  className={`rounded-lg bg-bg-white-200 items-center text-center h-8 cursor-pointer text-xs w-auto ${showPurchases ? 'text-blue-600' : 'text-black' }  font-bold`}   onClick={() => showJustPurchases()}>Compras </p>
               </div>
               <div className='mt-6 bg-white h-full w-full'>
               {showNotes === true ? 
                     <div>
                        {userNotes.length !== 0 ?
                           <div className=''>
                           {userNotes.map((not) => ( 
                              <div className='flex flex-col justify-start border-b'> 
                                 <div className='flex justify-start items-center'>
                                   <p className='mt-4'>📋</p> 
                                   <p className='text-sm ml-4'>Fecha: {not.date} - Hora: {not.hour} </p>
                                 </div>
                                 <div className='flex flex-col justify-start text-start ml-9'>
                                    <p className='text-sm'>Mensaje: {not.message} </p>
                                 </div>                       
                              </div>
                           ))}
                           </div> : <p>No tienes notas creadas para este usuario</p>}
                     </div>
                     :
                     null                    
                     }

                     {showPurchases === true ? 
                     <div className=' max-h-[400px] overflow-y-auto'>
                        {clientPurchases.map((cl) => ( 
                           <div className='mt-6 border'>
                              <div className='flex justify-start ml-2'>
                                  🛒
                              </div>
                              <div className='flex flex-col justify-start ml-2'>
                                 <p>Producto Comprado: {cl.nombreProducto}</p>
                                 <p>Cantidad Comprada: {cl.cantidad}</p>
                                 <p>Fecha de Compra: {cl.fechaCreacion}</p>
                                 <p>Proveedor Producto: {cl.proveedorProducto}</p>
                                 <p>Total Gastado: {cl.total}</p>
                              </div>
                           </div>
                        ))}
                     </div> : null
                     }

                     
                  {showEmails === true ? 
                     <div>
                         {clientEmails.map((cl) => ( 
                           <div className='mt-6 border'>
                              <p>Fecha: {cl.date}</p>
                              <p>Hora: {cl.hour}</p>
                              <p>Mensaje: {cl.message}</p>
                              <p>Asunto: {cl.title}</p>              
                           </div>
                        ))}
                     </div> : null
                     }
               </div>
             </div>
           </div>
       </div>
    </div>
  )
}

export default Profile

/*import React from 'react'
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
*/