import User from "../model/User.js";
import bcrypt from "bcryptjs";
import { createError } from "../error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({ ...req.body, password: hash });

        await newUser.save();
        res.status(200).send("user has been bcrypt");
    } catch (error) {
        next(error)
    }
}

export const signin = async (req, res, next) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user) return next(createError(404, "User not found!"));

        const isCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isCorrect) return next(createError(400, "Wrong creadential!"));

        const token = jwt.sign({ id: user._id }, process.env.JWT);
        const { password, ...orthers } = user._doc;
        res
            .cookie("access_token", token, {
                httpOnly: true
            })
            .status(200)
            .json(orthers);

    } catch (error) {
        next(error)
    }
}