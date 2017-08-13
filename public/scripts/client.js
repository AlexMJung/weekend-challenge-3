$(document).ready(function () {
    getTasks()//calling the current tasks on document load.

    //creates a new task on the button click
    $('#createTask').on('click', function () {
        console.log('button clicked, woot!!!');
        var newTask = {
            task: prompt("what\'s on deck?")
        };
        console.log(newTask.task);
        $.ajax({
            method: 'POST',
            url: '/tasks',
            data: newTask,
            success: function (response) {
                console.log('new task posted')
                getTasks();
            }//end of success
        });//ajax
    });//end of on click function

    //marks a task as complete when complete? button is clicked
    //*****NOT DONE */
    $('#toDo').on('click', '.done', function () {
        console.log('complete button was clicked, holla!!!');

        //$.ajax({
        //     method: 'POST',
        //     url: '/tasks',
        //     data: newTask,
        //     success: function (response) {
        //         console.log('new task posted')
        //         getTasks();
        //     }//end of success
        // });//ajax
    });//end of on click function

    //removes a task completly when delete button is clicked
    $('#toDo').on('click', '.delete', function () {
        //console.log('delete button was clicked, woop woop!!!');
        var deleteId = $(this).parent().parent().data().id;
        console.log('deleteId =', deleteId);
        $.ajax({
            method: 'DELETE',
            url: '/tasks/' + deleteId,
            success: function (response) {
                console.log (response)
                console.log('new task deleted');
                getTasks();
            }//end of success
        });//ajax
    });//end of on click function


});// end of document.ready

//function to retrieve tasks
function getTasks() {
    emptyTasks();
    $.ajax({
        method: 'GET',
        url: '/tasks',
        success: function (response) {
            console.log(response);
            for (var i = 0; i < response.length; i++) {
                var task = response[i];
                $('#toDoItem').append('<li data-id=' + task.id +'>' +
                    '<input class="done" type="checkbox">' +
                    '<span class=\'toDo\'>' + task.task +
                    '<button class="delete">delete</button>' +
                    '</span>' +
                    '</li>');
            }//end of for loop
        }//end of response
    })//end of ajax
}//end of getTasks

//function to clear tasks.
function emptyTasks() {
    $('#toDoItem').empty();
}//end of emptyTasks
