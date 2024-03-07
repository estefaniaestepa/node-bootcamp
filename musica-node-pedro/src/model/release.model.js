const mongoose = require('mongoose');

const releaseSchema = new mongoose.Schema({
    upc: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    tracks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Track',
        required: false
    }],
    cover: {
        type: String,
        required: false
    }
});

const Release = mongoose.model('Release', releaseSchema);

module.exports = Release;