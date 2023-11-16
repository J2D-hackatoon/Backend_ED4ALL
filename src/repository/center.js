import Center from '../schemas/center.js'

export class CenterRepository {
  static async getAllCenters() {
    const result = await Center.find({})
    return result
  }

  static async getCenterById(id) {
    const result = await Center.findById(id)
    return result
  }

    static async getAllCentersInDistrict(districtId) {
        const result = await Center.find({ district_id: districtId })
        return result
    }
}
