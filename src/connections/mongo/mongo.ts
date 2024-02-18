import mongoose from 'mongoose'
export const mongoUrl = 'mongodb://localhost:27017'


export async function connectToMongoDB() {
  try {
    await mongoose.connect(mongoUrl)
    console.log('Conectado a MongoDB')
  } catch (error: any) {
    console.error('Error de conexión a MongoDB:', error.message)
    throw error
  }
}


export const bd = mongoose.connection


bd.on('error', (error) => {
  console.error('Error de conexión a MongoDB:', error)
});

bd.once('open', () => {
  console.log('Conectado a MongoDB')
})