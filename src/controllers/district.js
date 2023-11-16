import { DistrictRepository } from '../repository/district.js'

export class DistrictController {
  static async getAllDistricts(req, res) {
    try {
      const districts = await DistrictRepository.getAllDistricts()
      return res.json(districts)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getAllCentersInDistrict(req, res) {
    try {
      const districtId = req.params.districtId
      const centers = await DistrictRepository.getAllCentersInDistrict(districtId)
      return res.json(centers)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getDistrictByDistrictId(req, res) {
    try {
      const districtId = req.params.districtId
      const district = await DistrictRepository.getDistrictByDistrictId(districtId)
      return res.json(district)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
