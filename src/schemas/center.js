import mongoose from 'mongoose'

const center = new mongoose.Schema({
  name: { type: String, require: true },
  address: { type: String, require: true },
  addresses_zip_code: { type: String, require: true },
  addresses_neighborhood_id: { type: Number, require: true },
  addresses_neighborhood_name: { type: String, require: true },
  addresses_district_id: { type: Number, require: true },
  addresses_district_name: { type: String, require: true },
  phone_number: { type: String, require: true },
  secondary_filters_name: { type: String, require: true },
  latitude: { type: Number, require: true },
  longitude: { type: Number, require: true }
})

export default mongoose.model('Center', center)
