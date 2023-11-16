import { DistrictModel } from '../models/district.js'

export class SkinController {
  static async getAllDistricts(req, res) {
    try {
      const districts = await DistrictModel.getAllDistricts()
      return res.json(districts)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
