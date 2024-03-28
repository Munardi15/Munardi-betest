const User = require('../model/userModel');
const redis = require('../config/redis');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getUsers = async (req, res) => {
    try {
        // const cachedUsers = await redis.get('cachedUsers');
        // if (cachedUsers) {
        //     console.log('Data pengguna ditemukan dalam cache Redis');
        //     res.json(JSON.parse(cachedUsers));
        // } else {
        const users = await User.find();
        // await redis.set('cachedUsers', JSON.stringify(users));
        // console.log('Data pengguna disimpan dalam cache Redis');
        res.json(users);
        // }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        // const cachedUser = await redis.get(`user:${userId}`);

        // if (cachedUser) {
        //     console.log('Data pengguna ditemukan dalam cache Redis');
        //     res.json(JSON.parse(cachedUser));
        // } else {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // await redis.set(`user:${userId}`, JSON.stringify(user));
        // console.log('Data pengguna disimpan dalam cache Redis');
        res.json(user);
        // }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findUserByAccountNumber = async (req, res) => {
    try {
        const accountNumber = req.params.accountNumber;
        // const cachedUser = await redis.get(`user:accountNumber:${accountNumber}`);

        // if (cachedUser) {
        //     console.log('Data pengguna ditemukan dalam cache Redis');
        //     res.json(JSON.parse(cachedUser));
        // } else {
        const user = await User.findOne({ accountNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // await redis.set(`user:accountNumber:${accountNumber}`, JSON.stringify(user));
        // console.log('Data pengguna disimpan dalam cache Redis');
        res.json(user);
        // }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.findUserByIdentityNumber = async (req, res) => {
    try {
        const identityNumber = req.params.identityNumber;
        // const cachedUser = await redis.get(`user:identityNumber:${identityNumber}`);

        // if (cachedUser) {
        //     console.log('Data pengguna ditemukan dalam cache Redis');
        //     res.json(JSON.parse(cachedUser));
        // } else {
        const user = await User.findOne({ identityNumber });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // await redis.set(`user:identityNumber:${identityNumber}`, JSON.stringify(user));
        // console.log('Data pengguna disimpan dalam cache Redis');
        res.json(user);
        // }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        // await redis.set(`user:${userId}`, JSON.stringify(updatedUser));
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId);
        // await redis.del(`user:${userId}`);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
