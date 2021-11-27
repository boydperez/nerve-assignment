const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
    srNo: {
        type: String,
        required: [true, 'Record needs to have a Serial number (srNo)'],
        unique: true,
    },
    name: {
        type: String,
        required: [true, 'Record needs to have a name (name)'],
        trim: true,
    },
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
