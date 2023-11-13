import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import usersRoutes from "./routes/users.routes.js"
import productsRoutes from "./routes/products.routes.js"



const app = express()
const port = 4000

app.use(express.json())
app.use(express.text())
app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({type:"*/*"}))
app.use(express.urlencoded({extended:true}))

app.use(usersRoutes)
app.use(productsRoutes)



app.get('/', (req, res) => {
    res.send('OBIT SOFTWARE API IS CORRECTRY UPLOAD')
  })
  
app.listen(port, () => {
    console.log(`El servidor de OB-IT SOSFTWARE esta funcionando correctamente en el puerto ${port} ✔✔`)
    //connectDataBase()  
  })