const express = require('express');
const router = express.Router();
const Size = require('../model/size.model.js');

// Create a new size entry
router.post('/create', async (req, res) => {
    const { innerBoxQty, boxesPacked, loosePcs, ...otherFields } = req.body;
    const totalPcsReceived = (innerBoxQty * boxesPacked) + loosePcs;

    console.log(totalPcsReceived);

    const size = new Size({
        ...otherFields,
        innerBoxQty,
        boxesPacked,
        loosePcs,
        totalPcsReceived
    });

    try {
        await size.save();
        res.status(201).send(size);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get all size entries
router.get('/', async (req, res) => {
    try {
        const sizes = await Size.find();
        res.status(200).send(sizes);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Delete a specific size entry by ID
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const size = await Size.findByIdAndDelete(id);
        if (!size) {
            return res.status(404).send({ message: 'Size not found' });
        }
        res.status(200).send({ message: 'Size deleted successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
