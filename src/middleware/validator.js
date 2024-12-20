const { body, validationResult } = require('express-validator')

// https://github.com/validatorjs/validator.js#sanitizers
const warrantyValidationRules = () => {
  return [
    // modelNumber must be at least 4 chars long
    body('modelNumber').isLength({ min: 4 }).withMessage('must have at least 4 characters.'),
    // purchaseDate must be a date
    body('purchaseDate').isDate({format: 'YYYY/MM/DD' }).withMessage('must follow the format of YYYY/MM/DD'),
    // durationInYears must be a float in range of .1 to 100
    body('durationInYears').isFloat({ min: .1, max: 100 }).withMessage('must be within range of 0.1 and 100'),
    // company must be not empty
    body('company').notEmpty().trim().withMessage('must not be empty'),
    // details must be not empty
    body('details').notEmpty().trim().withMessage('must not be empty'),
    // email must be an email
    body('email').isEmail().withMessage('is not a valid email'),
    // phone must be 10 digits long
    body('phone').isMobilePhone().withMessage('must be a valid phone number in the format: ##########'),
    // linkToFileClaim is a URL
    body('linkToFileClaim').isURL().withMessage('must be a URL')
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ [err.path]: `${err.value} ${err.msg}` }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  warrantyValidationRules,
  validate
}