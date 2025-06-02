"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: [true, "Password is required"],
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    shopNames: {
        type: [String],
        validate: [
            {
                validator: function (value) {
                    return value.length >= 3 && value.length <= 4;
                },
                message: "You must provide 3 or 4 shop names",
            },
        ],
        required: [true, "Shop names are required"],
    },
}, {
    timestamps: true,
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
