import express from 'express';
const clientsRoutes = express.Router();

import {getAllClients, saveNewClient, deleteClient, updateCliente, getClientData} from "../controllers/clientsController.js";

clientsRoutes.get('/', getAllClients);
clientsRoutes.get('/:clientId', getClientData);
clientsRoutes.post('/', saveNewClient);
clientsRoutes.delete('/:clientId', deleteClient);
clientsRoutes.put("/:clientId", updateCliente)


export default clientsRoutes;
