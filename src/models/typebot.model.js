import { model, Schema } from "mongoose";

// Define the flow schema for TypeBots
const flowSchema = new Schema(
    {
        type: {
            type: String,
            required: true,
            enum: ["text", "image", "video", "gif", "input"],
        },
        content: {
            type: String,
            required: function () {
                return (
                    this.type === "text" ||
                    this.type === "image" ||
                    this.type === "video" ||
                    this.type === "gif" ||
                    this.type === "button"
                );
            },
        },
        inputType: {
            type: String,
            enum: [
                "text",
                "number",
                "email",
                "phone",
                "date",
                "rating",
                "button",
            ],
            required: function () {
                return this.type === "input";
            },
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    { _id: false }
);

// Define the TypeBot schema
const typeBotSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        folderId: {
            type: Schema.Types.ObjectId,
            ref: "Folder",
            default: null,
        },
        flow: [flowSchema],
        theme: {
            type: String,
            enum: ["light", "dark", "tailBlue"],
            default: "light",
        },
    },
    { timestamps: true }
);

// Create the TypeBot model
export const TypeBot = model("TypeBot", typeBotSchema);
