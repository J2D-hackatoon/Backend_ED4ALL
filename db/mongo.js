import mongoose from 'mongoose'

class Mongo {
  constructor() {
    if (!Mongo._instance) {
      this.connection = null
      this.url = 'mongodb+srv://test1:team1@cluster0.zrplbre.mongodb.net/ed_4_all?authSource=admin'
    }
    return Mongo._instance
  }

  /**
     *
     * @returns returns singleton instance
     */
  static getInstance() {
    return this._instance
  }

  /**
     *
     * @returns return db connection
     */
  getConnection() {
    return this.connection
  }

  /**
     * Inits connection with database
     * @see https://mongoosejs.com/docs/connections.html
     * @returns mongoose connection
     */
  async init() {
    console.log('Connecting to database...')
    this.connection = await mongoose.connect(this.url)
    return this.connection
  }
}

export const mongo = new Mongo().init()
