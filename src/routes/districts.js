import { Router } from 'express'
import { DistrictController } from '../controllers/district.js'

export const districtsRouter = Router()

districtsRouter.get('', DistrictController.getAllDistricts)
// skinsRouter.post('/buy', SkinController.buy)
// skinsRouter.get('/myskins/:username', SkinController.getUserSkins)
// skinsRouter.put('/color', SkinController.update)
// skinsRouter.delete('/delete/:id', SkinController.deleteById)
// skinsRouter.get('/getskin/:id', SkinController.getById)

districtsRouter.use((req, res) => {
  res.status(404).send('404 - Not Found')
})
