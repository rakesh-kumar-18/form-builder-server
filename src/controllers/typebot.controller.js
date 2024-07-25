import { TypeBot } from "../models/typebot.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create a new TypeBot
export const createTypeBot = async (req, res, next) => {
    const { name, flow, theme, folderId } = req.body;
    const userId = req.user._id;

    try {
        if (!name || name.trim() === "") {
            throw new ApiError(400, "TypeBot name is required");
        }

        const typeBot = await TypeBot.create({
            name,
            userId,
            flow,
            theme,
            folderId,
        });

        const apiResponse = new ApiResponse(
            201,
            typeBot,
            "TypeBot created successfully"
        );
        res.status(201).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error creating TypeBot"));
    }
};

// Delete a TypeBot
export const deleteTypeBot = async (req, res, next) => {
    const { typeBotId } = req.params;
    const userId = req.user._id;

    try {
        const typeBot = await TypeBot.findOne({ _id: typeBotId, userId });

        if (!typeBot) {
            throw new ApiError(404, "TypeBot not found");
        }

        await typeBot.remove();

        const apiResponse = new ApiResponse(
            200,
            {},
            "TypeBot deleted successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error deleting TypeBot"));
    }
};

// Get all TypeBots for a user
export const getUserTypeBots = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const typeBots = await TypeBot.find({ userId });

        const apiResponse = new ApiResponse(
            200,
            typeBots,
            "TypeBots fetched successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error fetching TypeBots"));
    }
};

// Get TypeBots by Folder
export const getTypeBotsByFolder = async (req, res, next) => {
    const { folderId } = req.params;
    const userId = req.user._id;

    try {
        const typeBots = await TypeBot.find({ folderId, userId });

        const apiResponse = new ApiResponse(
            200,
            typeBots,
            "TypeBots fetched successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error fetching TypeBots"));
    }
};
