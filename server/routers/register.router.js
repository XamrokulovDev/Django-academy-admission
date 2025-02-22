const { Router } = require('express')
const router = Router()
const { adminRegister } = require('../controllers/register.controller')
const { body, validationResult } = require('express-validator')

router.post('/admin/register', [
    body('username')
        .notEmpty().withMessage('Please, enter username.'),
    body('password')
        .notEmpty().withMessage('Please, enter password.'),
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
], adminRegister)

module.exports = router