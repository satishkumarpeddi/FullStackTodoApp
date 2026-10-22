const zod = require('zod');

const schemeTodo = zod.object({
    title:zod.string().nonempty(),
    description:zod.string().nonempty()
})

const validateTodo = (title,description) => {
    const response = schemeTodo.safeParse({title,description})
    if(response.success)
        return true;
    return false;
}

const validateTodoMiddleware = (req,res,next) => {
    const title = req.body.title;
    const description = req.body.description;
    if(!validateTodo(title,description)){
        return res.status(409).json({
            message:"Invalid data formate!!"
        })
    }
    next();
}

module.exports = validateTodoMiddleware;