import {Task } from "../models/task.js"
export const newTask = async (req,res,next)=>{
    const {title, description} = req.body
    await Task.create({
        title,
        description,
        user: req.user
    })
    res.status(201).json({
        sucess: true,
        message: "Task added Sucessfully"
    })
}
export const getMyTask = async (req,res,next) =>{
    const userid = req.user._id
    const tasks = await Task.find({user: userid})
    res.status(200).json({
        sucess: true,
        tasks,
    })
}
export const updateMyTask = async (req,res,next) =>{
     
    const task = await Task.findById(req.params.id)
    if(!task) return next(new Error("Invalid id"))
    task.iscompleted = !task.iscompleted
    await task.save();

    res.status(200).json({
        sucess: true,
        message: "Task updated!",
    })
}
export const deleteMyTask = async (req,res,next) =>{
    const task = await Task.findById(req.params.id)
    if(!task) return next(new Error("Invalid id"))
    await task.deleteOne()
    
    
    res.status(200).json({
        sucess: true,
        message: "Task deleted!"
    })
}
export default getMyTask