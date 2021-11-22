$(document).ready(function() {
    $.getJSON("/api/todo")
    .then(addTodos)

    $('#todoInput').keypress(function(event) {
        if(event.which == 13) {
            createTodo();
        }
    });

    $('.list').on('click', 'li', function() {
        updateTodo($(this));
    })


    $('.list').on('click', 'span', function(event) {
        event.stopPropagation();
        removeTodo($(this).parent());
    })
});

function addTodos(todos) {
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}

function addTodo(todo) {
    var newTodo = $('<li class="task">' + todo.name + '<span>X</span></li>');
    newTodo.data('id', todo._id);
    newTodo.data('completed', todo.completed);
    if(todo.completed) {
        newTodo.addClass("done");
    }
    $('.list').append(newTodo);
}

function createTodo() {
    var userInput = $('#todoInput').val();
    $.post("/api/todo", {name: userInput})
    .then(function(newTodo) {
        $('#todoInput').val('');
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    })
}

function removeTodo(todo) {
    var clickedId = todo.data('id');
    $.ajax({
        method: 'DELETE',
        url: '/api/todo/' + clickedId
    })
    .then(function(data) {
        todo.remove();
    })
    .catch(function(err) {
        console.log(err);
    })
}

function updateTodo(todo) {
    var clickedId = todo.data('id');
    var isDone = !todo.data('completed');
    var updateData = {completed: isDone}
    $.ajax({
        method: 'PUT',
        url: '/api/todo/' + clickedId,
        data: updateData
    })
    .then(function(updatedTodo) {
        todo.toggleClass("done");
        todo.data('completed', isDone);
    })
}