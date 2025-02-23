const { Router } = require('express')
const router = Router()
const {
    newLesson,
    getLessons,
    updateLesson,
    deleteLesson
} = require('../controllers/lessons.controller')
const adminAuth = require('../middlewares/adminAuth')
const { body, param, validationResult } = require('express-validator')

router.post('/lessons/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('title')
        .isLength({ min: 1 }).withMessage('The lesson title must contain at least one letter'),
    body('link')
        .isURL().withMessage('Uncorrect url format'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next()
    }
], newLesson)
router.get('/lessons', adminAuth, getLessons)
router.patch('/lessons/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    body('title')
        .isLength({ min: 1 }).withMessage('The class title must contain at least one letter'),
    body('link')
        .isURL().withMessage('Uncorrect url format'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next()
    }
],  updateLesson)
router.delete('/lessons/:id', adminAuth, [
    param('id')
        .isMongoId().withMessage('Must be a valid MongoDB ObjectId'),
    (req, res, next) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array()
            })
        }
        next()
    }
], deleteLesson)

module.exports = router