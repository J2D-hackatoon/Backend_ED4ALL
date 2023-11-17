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

districtsRouter.put('/:id', [
  check('id').isInt().withMessage('Invalid ID'),
  check('district_name').optional().notEmpty().withMessage('Name should not be empty'),
  check('district_code').optional().isNumeric().withMessage('District code must be a numeric'),
  check('avg_income').optional().isNumeric().withMessage('Average income must be a numeric'),
  check('educational_occupational_ranking').optional().isNumeric().withMessage('Education occupation rank must be a numeric'),
  check('density_population').optional().isNumeric().withMessage('Density population must be a numeric')

], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}, DistrictController.updateDistrictById)

districtsRouter.use((req, res) => {
  res.status(404).send('404 - Not Found')
})
