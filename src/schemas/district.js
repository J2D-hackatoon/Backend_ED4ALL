import mongoose from 'mongoose'

const DistrictSchema = new mongoose.Schema({
  district_code: { type: Number, require: true },
  district_name: { type: String, require: true },
  avg_income: { type: Number },
  centers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Center' }]
})

export default mongoose.model('District', DistrictSchema)
