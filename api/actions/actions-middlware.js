// add middlewares here related to actions
const Actions = require('../actions/actions-model');
const Projects = require('../projects/projects-model');

const checkForProjectsId = async (req, res, next) => {
    const { id } = req.params
    try {
        const project = await Projects.get(id)
        if (!project) {
            res.status(400).json({
                message : `No project found with id ${id}`
            })
        } else {
            req.project = project
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error'
        })
    }
}

const checkingForProjectSuccess = (req, res, next) => {
    if (!req.body.description) {
        res.status(400).json({message: 'description is needed'})
    } else {
        next()
    }
}


const checkForIdWithActionId = async (req, res, next) => {
    const { id } = req.params
    try {
        const action = await Actions.get(id)
        if (!action) {
            res.status(400).json({message : `Project not found with id ${id}`})
        } else {
            req.action = action 
            next()
        }
    } catch (err) {
        res.status(500).json({
            message: 'Error'
        })
    }
}

const checkIfActionsSucceed = (req, res, next) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: 'Name and description are required'
        })
    } else {
        next()
    }
}

module.exports = {
    checkIfActionsSucceed,
    checkForIdWithActionId,
    checkingForProjectSuccess,
    checkForProjectsId,
    
}