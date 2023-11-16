import { Router } from 'express'
import { CenterController } from '../controllers/center.js'

export const centersRouter = Router()

centersRouter.get('', CenterController.getAllCenters)
centersRouter.get('/:id', CenterController.getCenterById)
