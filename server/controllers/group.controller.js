const groupSchema = require('../models/group.model')
const userSchema = require('../models/users.model')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandle = require('../middlewares/async')

// Router: /groups
// Method: POST
// Description: Add new group
exports.newGroup = asyncHandle(async (req, res, next) => {
    const { title, direction } = req.body

    const findGroup = await groupSchema.findOne({ title })
    if (findGroup) return next(new ErrorResponse('Group with this title already created', 400))

    await groupSchema.create({ title, direction })
    res.status(201).json({
        success: true,
        message: 'Group successfully created.'
    })
})

// Router: /groups
// Method: GET
// Description: Get all groups
exports.getGroups = asyncHandle(async (req, res, next) => {
    const data = await groupSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /groups/:id
// Method: GET
// Description: Get group by id and all users by groupId
exports.oneGroup = asyncHandle(async (req, res, next) => {
    const { id } = req.params

    const findGroup = await groupSchema.findById(id)
    if (!findGroup) return next(new ErrorResponse('Group not found.', 404));

    const users = await userSchema.find({ groupId: findGroup.groupId })
    res.status(200).json({
        success: true,
        group: findGroup,
        users
    })
})