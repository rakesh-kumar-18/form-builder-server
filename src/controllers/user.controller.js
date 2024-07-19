import { Types } from "mongoose";
import { User } from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import generateToken from "../utils/generateToken.js";

const OPTIONS = {
    httpOnly: true,
    secure: true,
};

export const registerUser = async (req, res, next) => {
    const { username, email, password, confirmPassword } = req.body;

    try {
        if ([username, email, password, confirmPassword].some((field) => !field || field.trim() === ""))
            throw new ApiError(400, "All fields are required");

        if (password !== confirmPassword)
            throw new ApiError(400, "Passwords do not match");

        const isUsernameExist = await User.findOne({ username });
        if (isUsernameExist)
            throw new ApiError(409, "User with this username already exists");

        const isEmailExist = await User.findOne({ email });
        if (isEmailExist)
            throw new ApiError(409, "User with this email already exists");

        const user = await User.create({
            username,
            email,
            password,
        });

        const createdUser = await User.findById(user._id).select(
            "-password"
        );

        if (!createdUser)
            throw new ApiError(
                500,
                "Something went wrong while registering the user"
            );

        const apiResponse = new ApiResponse(
            201,
            createdUser,
            "User registered successfully"
        );
        res.status(201).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error registering user"));
    }
};

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if ([email, password].some((field) => !field || field.trim() === ""))
            throw new ApiError(400, "All fields are required");

        const user = await User.findOne({ email });

        if (!user) throw new ApiError(401, "Invalid Credentials");

        const isPasswordValid = await user.isValidPassword(password);

        if (!isPasswordValid) throw new ApiError(401, "Invalid Credentials");

        const accessToken = await generateToken(user);

        const loggedInUser = await User.findById(user._id).select(
            "-password"
        );

        res.cookie("accessToken", accessToken, OPTIONS);

        const apiResponse = new ApiResponse(
            200,
            { loggedInUser, accessToken },
            "Login successful"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error logging in"));
    }
};

export const logoutUser = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) throw new ApiError(404, "User not found");

        res.clearCookie("accessToken", OPTIONS);

        const apiResponse = new ApiResponse(200, {}, "Logout successful");
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error logging out"));
    }
};

export const getCurrentUser = async (req, res, next) => {
    try {
        const user = req.user;

        if (!user) throw new ApiError(404, "User not found");

        const apiResponse = new ApiResponse(
            200,
            user,
            "Current user fetched successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error fetching current user"));
    }
};
