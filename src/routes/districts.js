import { Router } from 'express'
import { DistrictController } from '../controllers/district.js'

export const districtsRouter = Router()

districtsRouter.get('', DistrictController.getAllDistricts)
districtsRouter.get('/:districtId', DistrictController.getDistrictByDistrictId)
districtsRouter.get('/:districtId/centers', DistrictController.getAllCentersInDistrict)

districtsRouter.use((req, res) => {
  res.status(404).send('404 - Not Found')
})
