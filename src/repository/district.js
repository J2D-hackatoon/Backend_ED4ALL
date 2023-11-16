import DistrictSchema from '../schemas/district.js'

export class DistrictRepository {
  static async getAllDistricts() {
    const result = await DistrictSchema.find({})
    console.log(result)
    return result
  }
}
