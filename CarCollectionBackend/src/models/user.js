const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: ["Admin", "User"], 
        default: "User", 
    },
    username: {
        type: String,
        required: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    photo: {
        type: String, 
        required: false,
    },
    CarCollection:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Car",
    }],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", 
        },
    ],
}, {
    timestamps: true, 
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
