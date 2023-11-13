import express from "express"
const usersRoutes = express.Router()
import {getUserData, login, registerNewUser } from "../controllers/users.controllers.js"

usersRoutes.post("/register", registerNewUser)
usersRoutes.post("/login", login)
usersRoutes.get("/getUserData/:userId", getUserData)

export default usersRoutes;