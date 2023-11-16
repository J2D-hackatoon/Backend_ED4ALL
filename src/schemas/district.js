import mongoose from 'mongoose'

const DistrictSchema = new mongoose.Schema({
  district_id: { type: Number, require: true },
  name: { type: String, require: true },
  avg_rent: { type: Number },
  centers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Center' }]
})

export default mongoose.model('District', DistrictSchema)
