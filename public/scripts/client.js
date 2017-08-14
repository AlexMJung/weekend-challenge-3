$(document).ready(function () {
    getTasks()//calling the current tasks on document load.

    //creates a new task on the button click
    $('#createTask').on('click', function () {
        console.log('button clicked, woot!!!');
        var newTask = {
            task: prompt("What is the plan?"),
            complete: false
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
    $('#toDo').on('click', '.complete', function () {
        console.log('complete button was clicked, holla!!!');

        var postId = $(this).parent().parent().data().id;
        var itsDone = $(this).val();
        console.log(itsDone);
        console.log(postId);
        if (itsDone === "true") {
            itsDone = "false"
        } else {
            itsDone = "true"
        };//end of if/else statement

        //creating object for ajax send
        var checkbox = {
            done: itsDone
        }

        $.ajax({
            method: 'PUT',
            url: '/tasks/' + postId,
            data: checkbox,
            success: function (response) {
                console.log('complete updated')
                getTasks();
            }//end of success
        });//ajax
    });//end of on click function

    //removes a task completly when delete button is clicked
    $('#toDo').on('click', '.delete', function () {
        if (confirm("are you sure?")){
        //console.log('delete button was clicked, woop woop!!!');
        var deleteId = $(this).parent().parent().data().id;
        console.log('deleteId =', deleteId);
        $.ajax({
            method: 'DELETE',
            url: '/tasks/' + deleteId,
            success: function (response) {
                console.log(response)
                console.log('task deleted');
                getTasks();
            }//end of success
        });//ajax
        }
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
                $('#toDoItem').append('<tr data-id=' + task.id + ' class =' + task.complete + '>' +
                '<td><button class="complete" value="' + task.complete + '">Done!</button></td>' +        
                '<td class="text">' + task.task + '</td>' +
                '<td><button class="delete">Delete?</button>' +
                    '</td></tr>');
            }//end of for loop
        }//end of response
    })//end of ajax
}//end of getTasks

//function to clear tasks.
function emptyTasks() {
    $('#toDoItem').empty();
}//end of emptyTasks
