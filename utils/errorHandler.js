import { validationResult } from "express-validator";

let errorHandler = {
    error500ServerError: function(res, err) {
        console.log(err);
        res.status(500).json({
            message: "Internal server error",
            error: err
        })
    },
    error404NotFound: function(res, err) {
        res.status(404).json(`${err} not found`);
    },
    error400Database: function(res, err) {
        res.status(400).json(`The ${Object.keys(err.keyValue)} ${err.keyValue[Object.keys(err.keyValue)]} already exist`);
    },
    error428Required: function(res, err) {
        res.status(428).json(`The ${Object.keys(err.errors)[0]} is required`);   
    },
    error400BadRequest: function(res, err) {
        res.status(400).json({
            message: "There is a trouble with your request",
            error: err
        })
    },
    errorsIsEmpty: function(req, res, next) {
        const result = validationResult(req);
        if (result.errors.length !== 0) {
            let err = result.errors.length == 1 ? `The request has ${result.errors.length} validation error:` : `The request has ${result.errors.length} validation errors:`;
            for (let i = 0; i < result.errors.length; i++) {
                if (i < result.errors.length - 1) {
                    err += ` ${result.errors[i].msg} in ${result.errors[i].path},`    
                } else {
                    err += ` ${result.errors[i].msg} in ${result.errors[i].path}.`
                } 
            }
            return res.status(400).json(err);
          } else {
            next();
          }
    }
}

export default errorHandler;