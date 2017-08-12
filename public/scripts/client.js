$(document).ready(function () {

getTasks()//calling the current tasks on document load.


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
                console.log('new task posted')
                getTasks();
            }//end of success
        })//ajax
    })//end of on click function

//function to retrieve tasks
    function getTasks() {
        $.ajax({
            method: 'GET',
            url: '/tasks.js',
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
            }//end of response
        })//end of ajax
    }//end of getTasks

    //function to clear tasks.
    function emptyTasks() {
        $('#toDoItem').empty();
    }//end of emptyTasks

})// end of document.ready