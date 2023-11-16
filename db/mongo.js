import mongoose from 'mongoose'

export class Mongo {
  static async init() {
    console.log('Connecting to database...')
    this.connection = mongoose
      .connect(
        'mongodb+srv://test1:team1@cluster0.zrplbre.mongodb.net/ed_4_all?authSource=admin'
      )
      .then((db) => console.log('DB is connected'))
    return this.connection
  }
}
