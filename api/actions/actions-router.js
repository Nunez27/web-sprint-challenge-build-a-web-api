// Write your "actions" router here!
const express = require('express');
const { reset } = require('nodemon');
const Actions = require('./actions-model');
const router = express.Router()


router.get('/api/actions'), async (req, res)=> {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch (err) {
        res.status(500).json({
            message: "Error"
        })
    }
}

router.get('/api/actions/:id', async (req, res) => {
    const { id } = req.params

    try {
        const action = await Actions.get(id)
        if (!action) {
            res.status(404).json({
                message: 'This action does not exist'
            })
        } else{
            res.status(200).json(action)
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error'
        })
    }
})


router.post('api/actions', async (req, res) => {
    const body = req.body
    if(!body.project.id || !body.description || !body.notes) {
        res.status(400).json({
            message : 'All fields requried'
        })
    } else {
        try {
            const newAction = await Actions.insert(body)
            res.status(201).json(newAction)
        } catch (err) {
            res.status(500).json ({
                message: 'Error'
            })
        }
    } 
})


router.delete('api/actions/:id', async (req, res) => {
    const { id } = req.params

    try {
        const deleteAction = await Actions.remove(id)
        if (!deleteAction) {
            res.status(404).json({
                message: 'Action doesnt exist'
            })
        } else {
            res.status(200).json(deleteAction)
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error'
        })
    }
})


router.put('api/actions/:id', async (req, res) => {
    const { id } = req.params
    const body = req.body

    if (!body.description && !body.notes) {
        res.status(400).json({
            message: 'All fields required'
        })
    } else {
        try {
            const actionUpdated = await Actions.update(id, body);
            if (!actionUpdated) {
                res.status(404).json({
                    message: 'id with action does not exist'
                })
            } else {
                res.status(200).json(actionUpdated)
            }
        } catch (err) {
            res.status(500).json({
                message: "Error"
            })
        }
    }
})



router.use((err, req, res) => {
    res.status(500).json({
        message: "Something went wrong",
        err: err.message
    })
})

module.exports = router