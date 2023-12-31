import mongoose from 'mongoose'

const CenterSchema = new mongoose.Schema({
  name: { type: String, require: true },
  address: { type: String, require: true },
  district_code: { type: Number, require: true },
  addresses_zip_code: { type: String, require: true },
  addresses_neighborhood_id: { type: Number, require: true },
  addresses_neighborhood_name: { type: String, require: true },
  addresses_district_name: { type: String, require: true },
  phone_number: { type: String, require: true },
  secondary_filters_name: [[String]],
  latitude: { type: Number, require: true },
  longitude: { type: Number, require: true }
})

export default mongoose.model('Center', CenterSchema)
