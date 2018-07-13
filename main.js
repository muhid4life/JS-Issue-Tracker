document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

function saveIssue(e){
    var issueDesc = document.getElementById('issueDescInput').value;
    var issueSeverity = document.getElementById('issueSeverityInput').value;
    var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
    //library to give a unique global Id
    var issueId = chance.guid();
    var issueStatus = 'Open';
    //Issue object
    var issue = {
        id: issueId,
        description: issueDesc,
        severity: issueSeverity,
        assignedTo: issueAssignedTo,
        status: issueStatus
    }

    if(localStorage.getItem('issues') == null){
        var issues = [];
        issues.push(issue);
        // JSON.stringify takes the issue array and generates a JSON value to store it into issues object
        localStorage.setItem('issues',JSON.stringify(issues));
    }else{
        // retrieve into JSON format and then use parse to generate an array and assign it to issues
        var issues =JSON.parse(localStorage.getItem('issues'));
        issues.push(issue);
        localStorage.setItem('issues', JSON.stringify(issues));
    }
    //clear the input form
    document.getElementById('issueInputForm').requestFullscreen();
    //printout  our new Issue
    fetchIssues();
    //prevent form from submitting the default values
    e.preventDefualt();
}

function fetchIssues(){
    var issues = JSON.parse(localStorage.getItem('issues'));
    var issuesList = document.getElementById('issuesList');

    issuesList.innerHTML = '';

    for (var i =0; i < issues.length; i++){
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