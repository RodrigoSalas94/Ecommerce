import mongoose, { Document, Schema } from 'mongoose'
import { Tickets } from '../ticket'
import { mongoUrl } from '../../connections/mongo/mongo'
mongoose.connect(mongoUrl)

const ticketSchema = new Schema<Tickets & Document>({
    idusers: { type: Number, required: true },
    idproducts: { type: Number, required: true },
    total: { type: Number, required: true },
    date: { type: Date, default: Date.now },
})

const ticketModel = mongoose.model<Tickets & Document>('Tickets', ticketSchema)

export default ticketModel