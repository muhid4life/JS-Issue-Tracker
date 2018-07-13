function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issueList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i =0; i < issues.issues.length; i++){
        var id = issues[i].id;
        var desc = issues[i].description;
        var severity = issues[i].severity;
        var assignedTo = issues[i].assignedTo;
        var status = issues[i].status;

        issuesList.innerHTML += '<div class="well">'+
                                '<h6>Issue ID: ' + id + '</h6>'+
                                '<p><span class="label label-info">'+ status +'</span></p>'+
                                '<h3>' + desc + '</h3>'+
                                '<p><span class="glyphicon glyphicon-time"></span' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-time"></span' + assignedTo + '</p>'+
                                '<a href="#" onClick ="setStatusClosed(\''+id+'\')" class="btn btn-warning">Close</a>'+
                                '<a href="#" onClick ="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                '</div>';
    }
}