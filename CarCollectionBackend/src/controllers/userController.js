const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Crear un nuevo usuario
const createUser = async (req, res) => {
    try {
        const { email, username, password, role, photo } = req.body;
        const newUser = new User({ email, username, password, role, photo });
        await newUser.save();
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        res.status(400).json({ message: "Error creating user", error: error.message });
    }
};

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const users = await User.aggregate([
            {
                $project: {
                    id: "$_id",
                    email: 1,
                    role: 1,
                    username: 1,
                    photo: 1,
                    CarCollectionCount: { $size: "$CarCollection" },
                    friendsCount: { $size: "$friends" },
                },
            },
        ]);

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching users", error: error.message });
    }
};


// Obtener un usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ message: "User not found" });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error.message });
    }
};

// Actualizar un usuario
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (updates.password) {
            // Si se actualiza el password, encriptarlo
            const bcrypt = require("bcrypt");
            const saltRounds = 10;
            updates.password = await bcrypt.hash(updates.password, saltRounds);
        }
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true }).select("-password");
        if (!updatedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
        res.status(400).json({ message: "Error updating user", error: error.message });
    }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: "User not found" });
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting user", error: error.message });
    }
};

// Agregar un amigo
const addFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const user = await User.findById(userId);
        const friend = await User.findById(friendId);

        if (!user || !friend) return res.status(404).json({ message: "User or Friend not found" });
        if (user.friends.includes(friendId)) return res.status(400).json({ message: "Friend already added" });

        user.friends.push(friendId);
        await user.save();

        res.status(200).json({ message: "Friend added successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error adding friend", error: error.message });
    }
};

// Borrar un amigo
const removeFriend = async (req, res) => {
    try {
        const { userId, friendId } = req.body;
        const user = await User.findById(userId);

        if (!user) return res.status(404).json({ message: "User not found" });
        if (!user.friends.includes(friendId)) return res.status(400).json({ message: "Friend not in list" });

        user.friends = user.friends.filter(id => id.toString() !== friendId);
        await user.save();

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error removing friend", error: error.message });
    }
};

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

        // Generar token
        const token = generateToken(user._id);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                photo: user.photo,
                role: user.role,
                CarCollection: user.CarCollection
            },
        });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error: error.message });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({ message: "Logout successful" });
};


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,
    loginUser,
    logoutUser,
};
