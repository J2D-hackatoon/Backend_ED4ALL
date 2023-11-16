import fs from 'fs'
import Center from '../src/schemas/center.js'
import District from '../src/schemas/district.js'
import { Mongo } from './mongo.js'

async function seedData() {
  try {
    await Mongo.init()
    const data = fs.readFileSync('./df_district_information.json', 'utf8') // Be careful with the path
    const districts = JSON.parse(data)

    // const age_population: {}

    //         districts.age_array
    //   interval_0_2: null,
    //   interval_3_5
    //   interval_6_12
    //   interval_13_15
    //   interval_17_18
    //   interval_19_25
    //   interval_26_30
    //   interval_31_40
    //   interval_41_50
    //   interval_51_70
    //   interval_71_up

    // for (const age_interval of districts.age_array) {

    // }

    // console.log(districts[0].age_array)

    for (const districtData of districts) {
      // for (const age_interval of districtData.age_array) {
      // }

      const centers = districtData.centers
      delete districtData.centers

      let district = await District.findOne({
        district_code: districtData.district_code
      })
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
