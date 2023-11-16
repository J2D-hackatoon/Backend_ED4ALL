import DistrictSchema from '../schemas/district.js'

export class DistrictRepository {
  static async getAllDistricts() {
    const result = await DistrictSchema.find({})
    console.log(result)
    return result
  }

  static async getAllCentersInDistrict(districtId) {
    const district = await DistrictSchema.findOne({ district_code: districtId }).populate('centers')
    return district.centers
  }

  static async getDistrictByDistrictId(districtId) {
    const result = await DistrictSchema.findOne({ district_code: districtId })
    return result
  }
}
