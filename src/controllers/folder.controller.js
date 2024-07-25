import { Folder } from "../models/folder.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create a new folder
export const createFolder = async (req, res, next) => {
    const { name } = req.body;
    const userId = req.user._id;

    try {
        if (!name || name.trim() === "") {
            throw new ApiError(400, "Folder name is required");
        }

        const folder = await Folder.create({ name, userId });

        const apiResponse = new ApiResponse(
            201,
            folder,
            "Folder created successfully"
        );
        res.status(201).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error creating folder"));
    }
};

// Delete a folder
export const deleteFolder = async (req, res, next) => {
    const { folderId } = req.params;
    const userId = req.user._id;

    try {
        const folder = await Folder.findOne({ _id: folderId, userId });

        if (!folder) {
            throw new ApiError(404, "Folder not found");
        }

        await folder.remove();

        const apiResponse = new ApiResponse(
            200,
            {},
            "Folder deleted successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error deleting folder"));
    }
};

// Get all folders for a user
export const getUserFolders = async (req, res, next) => {
    const userId = req.user._id;

    try {
        const folders = await Folder.find({ userId });

        const apiResponse = new ApiResponse(
            200,
            folders,
            "Folders fetched successfully"
        );
        res.status(200).json(apiResponse);
    } catch (error) {
        next(new ApiError(500, error.message || "Error fetching folders"));
    }
};
