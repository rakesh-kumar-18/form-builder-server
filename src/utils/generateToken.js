import ApiError from "./ApiError.js";

const generateToken = (user) => {
    try {
        const accessToken = user.generateAccessToken();
        return accessToken;
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating tokens");
    }
};

export default generateToken;
