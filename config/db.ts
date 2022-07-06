export const mongoose = require('mongoose');

/**
 * @description Connect to MongoDB database
 */

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB)
    console.log(`MongoDB Connected: ${conn.connections[0].name}`)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

module.exports = connectDB