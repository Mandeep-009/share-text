import mongoose from "mongoose";

const connectionSchema = new mongoose.Schema({
    _id: {type: String,required: true},
    content: {type: String},
    createdAt: { type: Date, expires: 900, default: Date.now }
})

const Connection = mongoose.model('connections',connectionSchema);

export default Connection;