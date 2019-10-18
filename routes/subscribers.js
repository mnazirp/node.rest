const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscriber')

//Getting All
router.get('/', async (req, res) => {
    try {
        const subscribers = await Subscriber.find()
        res.json(subscribers)
    } catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
})

//Getting by id
router.get('/:id', getSubscribers, async(req, res) => {
    res.send(res.subscriber.name)
})

//Insert subscriber
router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel
    })
    try {
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    } catch (err) {
        res.status(400).json({
            message: err.message
        })
    }
})

//Update subscriber
router.patch('/:id', getSubscribers, async (req, res) => {
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.subscribedToChannel != null){
        res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }

    try{
        const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//Delete subscriber
router.delete('/:id', getSubscribers, async (req, res) => {
    try{
        await res.subscriber.remove()
        res.json({message: 'Deleted successful'})
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

async function getSubscribers(req, res, next) {
    let subscriber
    try {
        subscriber = await Subscriber.findById(req.params.id)
        if (subscriber == null) {
            return res.status(404).json({
                message: 'Cannot fint subscriber'
            })
        }
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
    res.subscriber = subscriber
    next()
}

module.exports = router