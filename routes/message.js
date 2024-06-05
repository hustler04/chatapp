const express = require('express');
const router = express.Router();
const Message = require('../models/messageSchema');
const User = require('../models/userSchema');

router.get('/', async (req, res) => {
    const { username } = req.query;

    if (!username) {
        return res.status(400).send('Username is required');
    }

    try {
        const messages = await Message.find({
            $or: [{ senderId: username }, { recipientId: username }]
        });

        res.render('message', { user: { username }, messages });
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
