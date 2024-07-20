const mongoose = require('mongoose');

const SizeSchema = new mongoose.Schema({
    grade: String,
    size: String,
    weightUsed: Number,
    innerBoxQty: Number,
    weightPerInnerBox: Number,
    boxesPacked: Number,
    loosePcs: Number,
    totalPcsReceived: Number,
    date: Date,
});

module.exports = mongoose.model('Size', SizeSchema);
