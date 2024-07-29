import { model, Schema } from "mongoose";

// Define the individual response schema
const individualResponseSchema = new Schema(
    {
        responseId: {
            type: String,
            required: true,
        },
        submittedAt: {
            type: Date,
            default: Date.now,
        },
        data: {
            type: Map,
            of: String, // or use more specific type if needed
        },
    },
    { _id: false }
);

// Define the response schema
const responseSchema = new Schema(
    {
        typeBotId: {
            type: Schema.Types.ObjectId,
            ref: "TypeBot",
            required: true,
        },
        responses: [individualResponseSchema],
        viewCount: {
            type: Number,
            default: 0,
        },
        completionCount: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

// Create the Response model
export const Response = model("Response", responseSchema);
