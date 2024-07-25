import { Response } from "../models/response.model.js";
import { TypeBot } from "../models/typebot.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Add a new response
export const addResponse = async (req, res, next) => {
    const { typeBotId, data } = req.body;

    try {
        const typeBot = await TypeBot.findById(typeBotId);

        if (!typeBot) {
            throw new ApiError(404, "TypeBot not found");
        }

        const response = await Response.findOneAndUpdate(
            { typeBotId },
            {
                $push: { responses: { data } },
                $inc: { completionCount: 1 },
            },
            { new: true, upsert: true }
        );

        const apiResponse = new ApiResponse(
            201,
            response,
            "Response added successfully"
        );
        res.status(201).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error adding response"));
    }
};

// Update view count
export const incrementViewCount = async (req, res, next) => {
    const { typeBotId } = req.params;

    try {
        const response = await Response.findOneAndUpdate(
            { typeBotId },
            { $inc: { viewCount: 1 } },
            { new: true, upsert: true }
        );

        const apiResponse = new ApiResponse(
            200,
            response,
            "View count incremented successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(
            new ApiError(500, error.message || "Error incrementing view count")
        );
    }
};

// Update start count
export const incrementStartCount = async (req, res, next) => {
    const { typeBotId } = req.params;

    try {
        const response = await Response.findOneAndUpdate(
            { typeBotId },
            { $inc: { startCount: 1 } },
            { new: true, upsert: true }
        );

        const apiResponse = new ApiResponse(
            200,
            response,
            "Start count incremented successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(
            new ApiError(500, error.message || "Error incrementing start count")
        );
    }
};

// Get responses for a TypeBot
export const getResponses = async (req, res, next) => {
    const { typeBotId } = req.params;

    try {
        const response = await Response.findOne({ typeBotId });

        if (!response) {
            throw new ApiError(404, "Responses not found");
        }

        const apiResponse = new ApiResponse(
            200,
            response,
            "Responses fetched successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error fetching responses"));
    }
};
