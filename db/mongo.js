import mongoose from 'mongoose'
import 'dotenv/config'

export class Mongo {
  static async init() {
    console.log('Connecting to database...')
    this.connection = mongoose
      .connect(process.env.DB_URL)
      .then((db) => console.log('DB is connected'))
    return this.connection
  }
}
