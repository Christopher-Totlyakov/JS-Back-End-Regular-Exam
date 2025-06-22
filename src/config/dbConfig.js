import mongoose from "mongoose";

async function initDatabase(){
    const dbUrl = 'mongodb://admin:admin@localhost:27017/?authSource=admin';
    const dbName = 'Ride_Showcase_DB';

    try {
        await mongoose.connect(dbUrl, { dbName });
        console.log('Successfully connected to database');
    } catch (error) {
        console.log('database connected failed');
        console.log(error.message);
    }
}

export default initDatabase;
