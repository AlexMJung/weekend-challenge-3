$(document).ready(function () {

    //create new task button
    $('#createTask').on('click', function () {
        console.log('button clicked, woot!!!');
        var newTask = {
            task: prompt("what\'s on deck?")
        };
        console.log(newTask.task);
        $.ajax({
            method: 'POST',
            url: '/tasks.js',
            data: newTask,
            success: function (response) {
                for (var i = 0; i < response.length; i++) {
                    var task = response[i];


                    $('#toDoItem').append('<li>' +
                        '<div class=\'toDo\'>' + task.task +
                        '<button class="done">Complete?</button>' +
                        '<button class="delete">delete</button>' +
                        '</div>' +
                        '</li>');
                }//end of for loop
            }//end of success
        })//ajax


    })//end of on click function




})// end of document.ready