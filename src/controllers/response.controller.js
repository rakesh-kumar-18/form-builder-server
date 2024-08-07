import { Response } from "../models/response.model.js";
import { TypeBot } from "../models/typebot.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export const addResponse = async (req, res, next) => {
    const { typeBotId, responseId, interactionId, data } = req.body;

    try {
        const typeBot = await TypeBot.findById(typeBotId);

        const currInputType = Object.keys(data)[0];

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
                completionCount: 0,
            });
        } else {
            const existingResponseIndex = response.responses.findIndex(
                (r) => r.responseId === responseId
            );

            if (existingResponseIndex >= 0) {
                const existingData =
                    response.responses[existingResponseIndex].data;
                for (const [key, value] of Object.entries(data)) {
                    existingData.set(key, value);
                }
                response.responses[existingResponseIndex].submittedAt =
                    new Date();
            } else {
                response.responses.push({
                    responseId,
                    data: { ...data },
                });
            }
        }

        const lastInputFlowItem = typeBot.flow
            .filter((item) => item.baseType.startsWith("Input"))
            .pop();

        if (lastInputFlowItem && lastInputFlowItem.type === currInputType) {
            response.completionCount += 1;
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
