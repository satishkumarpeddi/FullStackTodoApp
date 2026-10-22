const express = require('express');
const path = require('path');
const todo = express.Router();
const validateTodoMiddleware = require('../middleware/validateTodo.js');
const fs = require('fs')
const filePath = path.resolve(__dirname,'../data/todos.json')
todo.use(express.json())

const removeTodo = (todos,idx) => {
    let newTodoList = [];
    console.log(idx)
    for(let i=0;i<todos.length;i++){
        if(i!=idx)
            newTodoList.push(todos[i])
    }
    return newTodoList;
}

const findTodo = (todos,idx) => {
    for(let i=0;i<todos.length;i++){
        if(todos[i].id==idx)
            return i;
    }
    return -1;
}

todo.get('/todos',(req,res)=>{
    fs.readFile(filePath,"utf-8",(err,data)=>{
        if(err){
            return res.status(404).json({
                message:"File not found"
            })
        }
        res.status(200).send(JSON.parse(data))
    })
})

todo.get('/todos/:id',(req,res)=>{
    fs.readFile(filePath,"utf-8",(err,data)=>{
        if(err){
            return res.status(404).json({
                message:"File Not found"
            })
        }
        let todos = JSON.parse(data);
        if(!Array.isArray(todos)){
            return res.status(409).json({
                message:"Unprocessable data"
            })
        }
        let idx = findTodo(todos,parseInt(req.params.id));
        res.status(200).send(todos[idx])
    })
})

todo.post('/todos',validateTodoMiddleware,(req,res)=>{
    const newTodo = {
        id:Math.floor(Math.random()*1000),
        title:req.body.title,
        description:req.body.description
    }
    fs.readFile(filePath,"utf-8",(err,data)=>{
        if(err){
            return res.status(404).json({
                message:"File not found"
            })
        }
        let todos = JSON.parse(data);
        if(!Array.isArray(todos)){
            return res.status(409).json({
                message:"Unprocessable data"
            })
        }
        todos.push(newTodo);
        fs.writeFile(filePath,JSON.stringify(todos),(err,data)=>{
            if(err){
                return res.status(404).json({
                    message:"File not found"
                })
            }
            res.status(201).send(newTodo);
        })
    })
})

todo.put('/todos/:id',validateTodoMiddleware,(req,res)=>{
    fs.readFile(filePath,"utf-8",(err,data)=>{
        if(err){
            return res.status(404).json({
                message:"File not found"
            })
        }
        let todos = JSON.parse(data);
        let idx = findTodo(todos,parseInt(req.params.id))
        if(!Array.isArray(todos)){
            return res.status(409).json({
                message:"Unprocessable data"
            })
        }
        const updateTodo = {
            id:parseInt(req.params.id),
            title:req.body.title,
            description:req.body.description
        }
        todos[idx] = updateTodo;
        fs.writeFile(filePath,JSON.stringify(todos),(err,data)=>{
            if(err){
                return res.status(404).json({
                    message:"File not found"
                })
            }
            res.status(201).send(updateTodo);
        })
    })
})

todo.delete('/todos/:id',(req,res)=>{
    fs.readFile(filePath,"utf-8",(err,data)=>{
        if(err){
            return res.status(404).json({
                message:"File not found"
            })
        }
        let todos = JSON.parse(data);
        if(!Array.isArray(todos)){
            return res.status(409).json({
                message:"Unprocessable data"
            })
        }
        let idx = findTodo(todos,parseInt(req.params.id))
        let newTodoList = removeTodo(todos,idx);
        todos=newTodoList;
        fs.writeFile(filePath,JSON.stringify(todos),(err,data)=>{
            if(err){
                return res.status(404).json({
                    message:"File not found"
                })
            }
            res.status(200).json({
                message:"Deleted Successfully"
            })
        })
    })
})
module.exports = todo