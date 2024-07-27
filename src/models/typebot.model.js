import { model, Schema } from "mongoose";

// Define the flow schema for TypeBots
const flowSchema = new Schema(
    {
        baseType: {
            type: String,
            required: true,
            enum: [
                "Text",
                "Image",
                "Video",
                "GIF",
                "Input Text",
                "Input Number",
                "Input Email",
                "Input Phone",
                "Input Date",
                "Input Rating",
                "Input Button",
            ],
        },
        type: {
            type: String,
            required: true,
        },
        text: {
            type: String,
            required: function () {
                return (
                    this.baseType === "Text" ||
                    this.baseType === "Image" ||
                    this.baseType === "Video" ||
                    this.baseType === "GIF" ||
                    this.baseType === "Input Button"
                );
            },
        },
        // inputType: {
        //     type: String,
        //     enum: [
        //         "Text",
        //         "Number",
        //         "Email",
        //         "Phone",
        //         "Date",
        //         "Rating",
        //         "Button",
        //     ],
        //     required: function () {
        //         return this.baseType.startsWith("Input");
        //     },
        // },
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
