import { check } from "express-validator"

export const RegisterSchema=[
    check('name').trim().isAlpha().withMessage("name should be alphavates only"),

    check('username','username is required').exists()
    .isAlphanumeric().withMessage('username shold be alphanumeric char')
    .trim().isLength({min:6,max:32}),

    check('password', 'Password is required').isLength({min:6,max:100}).trim(),

    check('email ', 'email is required').exists().isEmail(),



]