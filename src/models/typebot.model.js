import { model, Schema } from "mongoose";

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
        required: {
            type: Boolean,
            default: false,
        },
        uuid: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

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

typeBotSchema.pre("findOneAndDelete", async function (next) {
    const Response = model("Response");
    await Response.deleteOne({ typeBotId: this.getQuery()._id });
    next();
});

export const TypeBot = model("TypeBot", typeBotSchema);
