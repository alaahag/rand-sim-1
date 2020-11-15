const express = require('express')
const router = express.Router()

const todos = []
let id = 1

router.get('/todos', function (req, res) {
    res.send(todos)
})

router.post('/todo', function (req, res) {
    const text = req.body.text
    const newTodo = { id: id++, text: text, complete: false, color: req.body.color }

    todos.push(newTodo)
    res.send(todos)
})

router.put('/todo/:todoID', function (req, res) {
    const todoID = req.params.todoID
    const todoObj = todos.find(t => t.id == todoID)

    todoObj.complete = !todoObj.complete
    res.send(todos)
})

router.put('/todoColor/:todoID', function (req, res) {
    const todoID = req.params.todoID
    const todoObj = todos.find(t => t.id == todoID)

    if (todoObj.color == "rgb(126, 214, 223)")
        todoObj.color = "yellow"
    else if (todoObj.color == "yellow")
        todoObj.color = "orange"
    else
        todoObj.color = "rgb(126, 214, 223)"

    res.send(todos)
})

router.delete('/todo/:todoID', function (req, res) {
    const todoID = req.params.todoID
    const id = todos.indexOf(todos.find(t => t.id == todoID))
    todos.splice(id, 1)
    res.send(todos)
})

module.exports = router