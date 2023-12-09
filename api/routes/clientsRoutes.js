import express from 'express';
const clientsRoutes = express.Router();

import {getAllClients, saveNewClient, deleteClient, updateCliente} from "../controllers/clientsController.js";

clientsRoutes.get('/', getAllClients);
clientsRoutes.post('/', saveNewClient);
clientsRoutes.delete('/:clientId', deleteClient);
clientsRoutes.put("/:clientId", updateCliente)


export default clientsRoutes;
