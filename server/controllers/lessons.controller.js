const lessonSchema = require('../models/lessons.model')
const groupSchema = require('../models/group.model')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandle = require('../middlewares/async')

// Router: /lessons
// Method: POST
// Description: Add new lesson
exports.newLesson = asyncHandle(async (req, res, next) => {
    const { title, link } = req.body
    const { id } = req.params

    const findGroup = await groupSchema.findById(id)
    if (!findGroup) return next(new ErrorResponse('Group not found', 404));

    await lessonSchema.create({ title, link, groupId: id })
    res.status(201).json({
        success: true,
        message: "Lesson successfully created."
    })
})

// Router: /lessons
// Method: GET
// Description: Get all lessons
exports.getLessons = asyncHandle(async (req, res, next) => {
    const data = await lessonSchema.find()
    res.status(200).json({
        success: true,
        data
    })
})

// Router: /lessons/:id
// Method: PATCH
// Description: Update lesson
exports.updateLesson = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const { title, link } = req.body

    const updatedLesson = await lessonSchema.findByIdAndUpdate(id, { title, link })
    if (!updatedLesson) return next(new ErrorResponse('Lesson not found', 404));
    res.status(200).json({
        success: true,
        message: 'Lesson updated successfully.'
    })
})

// Router: /lessons/:id
// Method: DELETE
// Description: Delete lesson
exports.deleteLesson = asyncHandle(async (req, res, next) => {
    const { id } = req.params
    const deletedLesson = await lessonSchema.findByIdAndDelete(id)
    if (!deletedLesson) return next(new ErrorResponse('Lesson not found', 404));

    res.status(200).json({
        success: true,
        message: 'Lesson deleted successfully.'
    })
})