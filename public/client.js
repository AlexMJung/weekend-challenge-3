$(document).ready(function () {

    //create new task button
    $('#createTask').on('click', function () {
        console.log('button clicked, woot!!!');
        var newTask = {
            task: prompt("what\'s on deck?")
};
console.log(newTask);
$.ajax ({
    method: 'POST',
    url: 'toDoList/',
    data: newTask,
    success: function(response){
    $('#toDo').append('<div class=\'toDo\'>' + response.task + '</div>');
    }//end of success
})//ajax


})//end of on click function




})// end of document.ready