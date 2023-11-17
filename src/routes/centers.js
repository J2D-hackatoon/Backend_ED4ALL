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

centersRouter.put('/:id', [
  check('id').isMongoId().withMessage('Invalid MongoDB ID'),
  check('name').optional().notEmpty().withMessage('Name not valid'),
  check('address').optional().notEmpty().withMessage('Address not valid'),
  check('district_code').optional().isNumeric().withMessage('District code must be a number'),
  check('addresses_zip_code').optional().notEmpty().withMessage('Zip code is required'),
  check('addresses_neighborhood_id').optional().isNumeric().withMessage('Neighborhood ID must be a number'),
  check('addresses_neighborhood_name').optional().notEmpty().withMessage('Neighborhood name is required'),
  check('addresses_district_name').optional().notEmpty().withMessage('District name is required'),
  check('phone_number').optional().notEmpty().withMessage('Phone number is required'),
  check('secondary_filters_name').optional().isArray().withMessage('Secondary filters name must be an array'),
  check('latitude').optional().isNumeric().withMessage('Latitude must be a number'),
  check('longitude').optional().isNumeric().withMessage('Longitude must be a number')
], (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}, CenterController.updateCenterById)

centersRouter.post('/',
  [
    check('name').notEmpty().withMessage('Name is required'),
    check('address').notEmpty().withMessage('Address is required'),
    check('district_code').isNumeric().withMessage('District code must be a number'),
    check('addresses_zip_code').notEmpty().withMessage('Zip code is required'),
    check('addresses_neighborhood_id').isNumeric().withMessage('Neighborhood ID must be a number'),
    check('addresses_neighborhood_name').notEmpty().withMessage('Neighborhood name is required'),
    check('addresses_district_name').notEmpty().withMessage('District name is required'),
    check('phone_number').notEmpty().withMessage('Phone number is required'),
    check('secondary_filters_name').isArray().withMessage('Secondary filters name must be an array'),
    check('latitude').isNumeric().withMessage('Latitude must be a number'),
    check('longitude').isNumeric().withMessage('Longitude must be a number'),
    check('district_code').isNumeric().withMessage('District code must be a number')
  ]
  , (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  }, CenterController.insertCenter)
