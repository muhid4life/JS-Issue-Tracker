document.getElementById('issueInputForm').addEventListener('submit', saveIssue);

// TODO change the setStatusClosed(id) and ssetStatusOpen(id) to a single method
function changeStatus(id){
    var issues = JSON.parse(localStorage.getItem('issues'));

    for(var i=0; i < issues.length;i++){
        if (issues[i].id == id){
            if(issues[i].status == 'Closed'){
                issues[i].status = 'Open';
            }else{
                issues[i].status = 'Closed';
            }
        }
    }

    localStorage.setItem('issues',JSON.stringify(issues));
    fetchIssues();
}

// function changeStatusValueDisplay(id){
//     var issues = JSON.parse(localStorage.getItem('issues'));
//         var status="close"
//         for(var i=0; i < issues.length;i++){
//             if (issues[i].id == id){
//                 if(issues[i].status == 'Closed'){
//                     status = "Close"
//                     localStorage.setItem('issues',JSON.stringify(issues));
//                     return status;
//                 }else{
//                     status = "Open"
//                     localStorage.setItem('issues',JSON.stringify(issues));
//                     return status;
//             }
//         }
//     }
//     localStorage.setItem('issues',JSON.stringify(issues));
    
//     return status;
// }

function deleteIssue(id){
    
     var issues = JSON.parse(localStorage.getItem('issues'));
     console.log(issues);
     for(var i=0; i < issues.length; i++){
         if(issues[i].id == id){
             console.log(issues[i].id);
             console.log("index is"+i);
             issues=issues.splice(id,1);
             console.log(issues);   
             console.log(issues.length);
             break;
         }
     }
     // localStorage.setItem('key', 'value');
     localStorage.setItem('issues',JSON.stringify(issues));
     fetchIssues();
     
 }

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
    document.getElementById('issueInputForm').requestFullScreen();
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
                                '<p><span class="glyphicon glyphicon-time"></span>' + severity + '</p>'+
                                '<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>'+
                                '<a href="#" onClick ="changeStatus(\''+id+'\')" class="btn btn-warning">Close</a>'+
                                '<a href="#" onClick ="deleteIssue(\''+id+'\')" class="btn btn-danger">Delete</a>'+
                                '</div>';
    }
}
