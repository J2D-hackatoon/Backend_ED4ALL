import { CenterRepository } from '../repository/center.js'
import { DistrictRepository } from '../repository/district.js'

export class CenterController {
  static async getAllCenters(req, res) {
    try {
      const centers = await CenterRepository.getAllCenters()
      return res.json(centers || [])
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getCenterById(req, res) {
    try {
      const id = req.params.id
      const center = await CenterRepository.getCenterById(id)
      if (!center) {
        return res.status(404).json({ message: 'Center not found' })
      }
      return res.status(200).json(center)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async updateCenterById(req, res) {
    try {
      const id = req.params.id
      const data = req.body
      const center = await CenterRepository.updateCenterById(id, data)
      if (!center) {
        return res.status(404).json({ message: 'Center not found' })
      }
      return res.status(200).json(center)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async insertCenter(req, res) {
    try {
      const data = req.body
      const district = await DistrictRepository.getDistrictByDistrictId(data.district_code)
      if (!district) {
        return res.status(404).json({ message: 'District not found' })
      }
      delete data.district_code
      const center = await CenterRepository.insertCenter(data)
      district.centers.push(center._id)
      await DistrictRepository.updateDistrictById(district.district_code, district)
      return res.status(200).json(center)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
