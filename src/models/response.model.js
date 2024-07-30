import { model, Schema } from "mongoose";

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
            of: String,
        },
    },
    { _id: false }
);

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

export const Response = model("Response", responseSchema);
