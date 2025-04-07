const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true // Add index for faster queries by user
    },
    icon: {
        type: String,
        trim: true, // Remove unnecessary whitespace
        default: '' // Provide a default value
    },
    source: {
        type: String,
        required: [true, 'Income source is required'],
        trim: true,
        minlength: [2, 'Source must be at least 2 characters long'],
        maxlength: [50, 'Source cannot exceed 50 characters']
    },
    amount: {
        type: Number,
        required: [true, 'Amount is required'],
        min: [0, 'Amount cannot be negative'],
        validate: {
            validator: Number.isFinite,
            message: 'Amount must be a valid number'
        }
    },
    date: {
        type: Date,
        default: Date.now,
        index: true // Add index for sorting by date
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true }, // Include virtuals in JSON output
    toObject: { virtuals: true } // Include virtuals in object output
});

incomeSchema.index({ user: 1, source: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Income', incomeSchema);

