import { model, Schema } from "mongoose";

const folderSchema = new Schema(
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
    },
    { timestamps: true }
);

folderSchema.pre("findOneAndDelete", async function (next) {
    const TypeBot = model("TypeBot");
    await TypeBot.deleteMany({ folderId: this._conditions._id });
    next();
});

export const Folder = model("Folder", folderSchema);
