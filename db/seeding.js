import fs from 'fs'
import mongoose from 'mongoose'
import Center from '../src/schemas/center.js'
import District from '../src/schemas/district.js'

mongoose.connect('mongodb+srv://test1:team1@cluster0.zrplbre.mongodb.net/ed_4_all?authSource=admin')

async function seedData() {
  try {
    const data = fs.readFileSync('./df_district_information.json', 'utf8')
    const districts = JSON.parse(data)

    for (const districtData of districts) {
      const centers = districtData.centers
      delete districtData.centers

      let district = await District.findOne({ district_code: districtData.district_code })
      if (!district) {
        district = new District(districtData)
        await district.save()
      }

      for (const centerData of centers) {
        const center = new Center(centerData)
        await center.save()

        district.centers.push(center._id)
      }

      // Save the updated district document
      await district.save()
    }

    console.log('Data has been seeded successfully')
  } catch (error) {
    console.error(error)
  }
}

seedData()
