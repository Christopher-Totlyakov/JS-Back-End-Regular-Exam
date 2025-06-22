import User from "../models/User.js";
import bcrypt from 'bcrypt';
import { generateAuthToken } from "../utils/userUtils.js";

export default {
    async register(userData) {
        const { firstName, lastName, email, password, rePassword } = userData;

        if (password !== rePassword) {
            throw new Error("Passwords do not match");
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const newUser = await User.create({ firstName, lastName, email, password });
        const token = await generateAuthToken(newUser);
        return token;
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('User with this email does not exist');
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password');
        }

        const token = await generateAuthToken(user);
        return token;
    }
};
