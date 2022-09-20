import {Router} from 'express'
import gameDetailController from '@/controllers/gameDetail.controller'
import { Routes } from '@/interfaces/routes.interface'

export default class gameDetailRoute implements Routes{

    public path:string
    public router:Router
    public gameController:gameDetailController

    constructor(){
        this.path = '/game'
        this.router = Router();
        this.gameController = new gameDetailController()
        
        this.initializeRoute();
    }

    private initializeRoute(){
        this.router.get(`${this.path}/:gameID`, this.gameController.getGameDetail)
    }
}