import {Router} from 'express'
import reviewDetailController from '@/controllers/reviewDetail.controller'
import { Routes } from '@/interfaces/routes.interface'

export default class gameDetailRoute implements Routes{

    public path:string
    public router:Router
    public reviewController:reviewDetailController

    constructor(){
        this.path = '/review'
        this.router = Router();
        this.reviewController = new reviewDetailController()
        
        this.initializeRoute();
    }

    private initializeRoute(){
        this.router.get(`${this.path}/:reviewID`, this.reviewController.getReviewDetail)
    }
}