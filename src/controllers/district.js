import { DistrictRepository } from '../repository/district.js'
import { CenterRepository } from '../repository/center.js'

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
      const pageNumber = parseInt(req.query.pageNumber) || 0
      const limit = parseInt(req.query.limit) || 12
      const result = {}

      const districtId = req.params.districtId
      // const totalCenters = await DistrictRepository.getAllCentersInDistrict(
      //   districtId
      // )

      const startIndex = pageNumber * limit
      const endIndex = (pageNumber + 1) * limit

      // result.totalCenters = totalCenters
      if (startIndex > 0) {
        result.previous = {
          pageNumber: pageNumber - 1,
          limit
        }
      }

      if (endIndex < (await CenterRepository.getCountCenters())) {
        result.next = {
          pageNumber: pageNumber + 1,
          limit
        }
      }

      result.data = await CenterRepository.getCentersByPagination(
        districtId,
        startIndex,
        limit
      )
      result.rowsPerPage = limit
      return res.json(result)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }

  static async getDistrictByDistrictId(req, res) {
    try {
      const districtId = req.params.districtId
      const district = await DistrictRepository.getDistrictByDistrictId(
        districtId
      )
      return res.json(district)
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
}
