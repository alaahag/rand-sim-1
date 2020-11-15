// BAD PRACTICE - not proper MVC. Should be separated to files.
const render = function (todos) {

    $("#todos").empty()

    todos.forEach(todo => {
        let todoColor = todo.color;
        if (todoColor == 'rgb(126, 214, 223)')
            todoColor = 'todo-normal'
        else if (todoColor == 'yellow')
            todoColor = 'todo-yellow'
        else
            todoColor = 'todo-orange'

        $("#todos").append(`
        <div data-id=${todo.id} class="todo ${todo.complete ? 'complete' : ''} ${todoColor}">
            <i class="fas fa-check-circle"></i>
            <span class=text>${todo.text}</span>
            <span class="delete"><i class="fas fa-trash"></i></span>
        </div>
        `)
    })
}

const add = function () {
    const color = $(this).closest(".todo").css("background-color") || "rgb(126, 214, 223)"
    $.post('/todo', { text: $("#todo-input").val(), color: color }, function (todos) {
        render(todos)
        $("#todo-input").val("")
    })
}

$("#todos").on("click", ".todo", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "PUT",
        url: "/todoColor/" + id,
        success: todos => render(todos)
    })
})

$("#todos").on("click", ".fa-check-circle", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "PUT",
        url: "/todo/" + id,
        success: todos => render(todos)
    })
})

$("#todos").on("click", ".fa-trash", function () {
    const id = $(this).closest(".todo").data().id
    $.ajax({
        method: "DELETE",
        url: "/todo/" + id,
        success: todos => render(todos)
    })
})

$.get('/todos', todos => render(todos))