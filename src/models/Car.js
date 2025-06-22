import { Schema, model, Types } from "mongoose";

const carSchema = new Schema({
    model: {
        type: String,
        required: [true, 'Model is required'],
        minlength: [2, 'Model must be at least 2 characters long']
    },
    manufacturer: {
        type: String,
        required: [true, 'Manufacturer is required'],
        minlength: [3, 'Manufacturer must be at least 3 characters long']
    },
    engine: {
        type: String,
        required: [true, 'Engine is required'],
        minlength: [3, 'Engine must be at least 3 characters long']
    },
    topSpeed: {
        type: Number,
        required: [true, 'Top Speed is required'],
        validate: {
            validator: value => value >= 10,
            message: 'Top Speed must be at least a 2-digit number'
        }
    },
    image: {
        type: String,
        required: [true, 'Image URL is required'],
        validate: {
            validator: value => /^https?:\/\//.test(value),
            message: 'Image URL must start with http:// or https://'
        }
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [5, 'Description must be at least 5 characters long'],
        maxlength: [500, 'Description cannot be more than 500 characters long']
    },
    likes: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const Car = model('Car', carSchema);

export default Car;
