import CenterSchema from '../schemas/center.js'

export class CenterRepository {
  static async getAllCenters() {
    const result = await CenterSchema.find({})
    return result
  }

  static async getCenterById(id) {
    const result = await CenterSchema.findById(id)
    return result
  }

  static async getCentersByPagination(districtId, startIndex, limit) {
    const result = CenterSchema.find()
      // const result = CenterSchema.find({ district_code: districtId })
      .sort('-_id')
      .skip(startIndex)
      .limit(limit)
      .exec()
    return result
  }

  static async getCountCenters() {
    const result = CenterSchema.countDocuments().exec()
    return result
  }
}
