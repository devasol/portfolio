import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from './models/Project.js';
import Experience from './models/Experience.js';
import Setting from './models/Setting.js';

dotenv.config();

const check = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || process.env.MONGODB_URI);
        const p = await Project.countDocuments();
        const e = await Experience.countDocuments();
        const s = await Setting.countDocuments();
        console.log(`Projects: ${p}, Experience: ${e}, Settings: ${s}`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};
check();
