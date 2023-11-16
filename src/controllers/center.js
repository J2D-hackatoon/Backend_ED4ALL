import { CenterRepository } from '../repository/center.js'

export class CenterController {
  static async getAllCenters(req, res) {
    try {
      const centers = await CenterRepository.getAllCenters()
      return res.json(centers)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getCenterById(req, res) {
    try {
      const id = req.params.id
      const center = await CenterRepository.getCenterById(id)
      return res.json(center)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
