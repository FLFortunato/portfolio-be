import {UserController} from '../controllers/user.controller'
import {CompanyController} from '../controllers/cards.controller'
import { Router } from 'express'

const publicRoutes = [
    {path: '/user', route: UserController()},
    {path: '/company', route: CompanyController()}
]


export const AppController = () =>{

    const router = Router()

    publicRoutes.forEach(routers => router.use( routers.path, routers.route))

    return router;
}