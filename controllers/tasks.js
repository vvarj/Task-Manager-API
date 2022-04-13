const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const getAllTasks = asyncWrapper(async (req, res) => {

    const task = await Task.find({});
    res.status(200).json({ data: task });

});

const createTask = asyncWrapper(async (req, res) => {
    const data = req.body;
    const task = await Task.create(data);
    res.status(201).json({ data: task });

})

const getTask = asyncWrapper(async (req, res, next) => {
    const taskID = req.params.id;
    const task = await Task.findOne({ _id: taskID });
    if (!task) {
        // const error = new Error("Not Found");
        // error.status = 404;
        //return next(error);
        return next(createCustomError(`no task with id ${taskID}`, 404));

    }
    res.json({ data: task });


})

const updateTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, { new: true, runValidators: true, });
    if (!task) {
        return next(createCustomError(`no task with id ${taskID}`, 404));
    }
    res.json({ data: task });


})

const deleteTask = asyncWrapper(async (req, res) => {
    const taskID = req.params.id;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
        return next(createCustomError(`no task with id ${taskID}`, 404));
    }
    res.json({ data: task, message: "DELETED" });

});

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
};