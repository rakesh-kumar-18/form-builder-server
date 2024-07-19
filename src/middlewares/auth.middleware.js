import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const isAuthenticated = async (req, res, next) => {
    try {
        const token =
            req.cookies?.accessToken ||
            (req.headers?.authorization?.startsWith("Bearer ") &&
                req.headers.authorization.split(" ")[1]);

        if (!token) throw new ApiError(401, "No token, authorization denied");

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded?._id).select("-password");

        if (!user) throw new ApiError(401, "Invalid Access Token");

        req.user = user;
        next();
    } catch (error) {
        next(new ApiError(400, error.message || "Invalid access token"));
    }
};

export default isAuthenticated;
