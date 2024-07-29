import { Response } from "../models/response.model.js";
import { TypeBot } from "../models/typebot.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const addResponse = async (req, res, next) => {
    const { typeBotId, responseId, interactionId, data } = req.body;

    try {
        const typeBot = await TypeBot.findById(typeBotId);

        if (!typeBot) {
            throw new ApiError(404, "TypeBot not found");
        }

        let response = await Response.findOne({ typeBotId });

        if (!response) {
            response = new Response({
                typeBotId,
                responses: [
                    {
                        responseId,
                        data: { ...data },
                    },
                ],
            });
        } else {
            const existingResponseIndex = response.responses.findIndex(
                (r) => r.responseId === responseId
            );

            if (existingResponseIndex >= 0) {
                // Update the existing response data
                const existingData =
                    response.responses[existingResponseIndex].data;

                // Merge new data with existing data
                for (const [key, value] of Object.entries(data)) {
                    existingData.set(key, value);
                }

                // Update the submittedAt timestamp
                response.responses[existingResponseIndex].submittedAt =
                    new Date();
            } else {
                // Add a new response entry
                response.responses.push({
                    responseId,
                    data: { ...data },
                });
            }
        }

        await response.save();

        const apiResponse = new ApiResponse(
            201,
            response,
            "Response added or updated successfully"
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
