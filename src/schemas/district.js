import mongoose from 'mongoose'

const DistrictSchema = new mongoose.Schema({
  district_code: { type: Number, require: true },
  district_name: { type: String, require: true },
  avg_income: { type: Number },
  eduacational_occupation_ranking: { type: Number },
  density_population: { type: Number },
  work_occupation: {
    occupated: { type: Number },
    not_occupated: { type: Number }
  },
  age_population: {
    interval_0_2: { type: Number },
    interval_3_5: { type: Number },
    interval_6_12: { type: Number },
    interval_13_15: { type: Number },
    interval_17_18: { type: Number },
    interval_19_25: { type: Number },
    interval_26_30: { type: Number },
    interval_31_40: { type: Number },
    interval_41_50: { type: Number },
    interval_51_70: { type: Number },
    interval_71_up: { type: Number }
  },
  centers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Center' }]
})

export default mongoose.model('District', DistrictSchema)
