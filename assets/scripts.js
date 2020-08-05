var workingHours = [8,9,10,11,12,13,14,15,16,17];

var containerElement = $(".container");

function getDate() {
    var date = moment().format("MMM-DD-YYYY  hh:mm");
    return date;
}


function createRow(time) {
    var rowElement = $("<div>");
    rowElement.addClass("row m-3");

    var timeElement = $("<span>");
    timeElement.attr("id", moment().hour(time).format("H"));
    timeElement.addClass("col-sm-2 text-center border-top border-bottom")
    timeElement.text(moment().hour(time).format("h a"));
    
    var inputElement = $("<textarea>");
    inputElement.attr("id", time + "-details")
    inputElement.addClass("col-sm-7");

    var msgElement = $("<span>");
    msgElement.attr("id", time + "-message");
    msgElement.addClass("mx-auto text-success");

    var saveElement = $("<button>")
    saveElement.attr("id", time + "-save")
    saveElement.addClass("col-sm-1 btn btn-info")
    saveElement.text("Save");
    $(saveElement).on("click", function(event){
        event.preventDefault();
        var key = $(inputElement).attr("id")
        var data = $(inputElement).val().trim()
        localStorage.setItem(key, data);
        msgElement.text("Your changes have been saved");
        setTimeout(function() {
            msgElement.text('');
        }, 1000);
    })

    var clearElement = $("<button>");
    clearElement.attr("id", time + "-clear");
    clearElement.addClass("col-sm-1 btn btn-info");
    clearElement.text("Clear");
    $(clearElement).on("click", function(event){
        var key = $(inputElement).attr("id");
        localStorage.removeItem(key);
        $("#" + key).val('');
        msgElement.text("Your input has been cleared");
        setTimeout(function() {
            msgElement.text('');
        }, (1000));
    });

    rowElement.append(timeElement);
    rowElement.append(inputElement);
    rowElement.append(saveElement);
    rowElement.append(clearElement);
    rowElement.append(msgElement);

    containerElement.append(rowElement);
}

function render() {
    for (let index = 0; index < workingHours.length; index++) {
        createRow(workingHours[index]);
        getDetails(workingHours[index]);
        applyStyles();
    }
}

function getDetails(time) {
    $("#" + time + "-details").val(localStorage.getItem(time + "-details"));
}

function applyStyles() {
    setInterval(function() {
        $(".current-date-time").text("Today is " + getDate());

        for (let index = 0; index < workingHours.length; index++) {
            var timeBlock = $("#" + workingHours[index]).attr("id");
            var currentTime = moment().hour();
            
            if (timeBlock == currentTime) {
                $("#" + workingHours[index] + "-details").addClass("bg-success");
            } else if (timeBlock > currentTime) {
                $("#" + workingHours[index] + "-details").addClass("bg-info");
            } else if (timeBlock < currentTime) {
                $("#" + workingHours[index] + "-details").addClass("bg-warning");
            }
        }
    }, 1000)
}

render();
