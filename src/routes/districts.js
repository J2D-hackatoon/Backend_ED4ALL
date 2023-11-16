import { Router } from 'express'
import { check, validationResult } from 'express-validator'
import { DistrictController } from '../controllers/district.js'

export const districtsRouter = Router()

districtsRouter.get('', DistrictController.getAllDistricts)

districtsRouter.get('/:districtId', [
  // Validate 'districtId'
  check('districtId').isInt().withMessage('Invalid ID')
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}, DistrictController.getDistrictByDistrictId)

districtsRouter.get('/:districtId/centers', [
  check('districtId').isInt().withMessage('Invalid ID')
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }

  next()
}, DistrictController.getAllCentersInDistrict)

districtsRouter.use((req, res) => {
  res.status(404).send('404 - Not Found')
})
