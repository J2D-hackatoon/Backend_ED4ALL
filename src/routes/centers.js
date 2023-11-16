import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import { CenterController } from '../controllers/center.js'

export const centersRouter = Router()

centersRouter.get('', CenterController.getAllCenters)
centersRouter.get('/:id', [
  check('id').isMongoId().withMessage('Invalid MongoDB ID')
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}, CenterController.getCenterById)
