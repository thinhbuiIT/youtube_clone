import { createError } from "../error.js";
import User from "../model/User.js";
// import Video from "../models/Video.js";

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, { new: true });
            //use {new:true} for update immediately
            res.status(200).json(updatedUser);
        } catch (error) {
            next(error);
        }
    } else {
        return next(createError(403, "You can update only your account..."));
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.id === req.user.id) {
        try {
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("User is deleted!");
        } catch (error) {
            next(error)
        }
    } else {
        return next(createError(403, "You can delete only your account..."));
    }
}

export const subscribeUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $push: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: 1 }
        });
        res.status(200).json("SubscribeUser successfull!");
    } catch (error) {
        next(error);
    }
}

export const unSubscribe = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id }
        });
        await User.findByIdAndUpdate(req.params.id, {
            $inc: { subscribers: -1 }
        });
        res.status(200).json("UnSubscribeUser successfull!");
    } catch (error) {
        next(error);
    }
}

export const like = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}
export const disLike = async (req, res, next) => {
    try {

    } catch (error) {
        next(error);
    }
}