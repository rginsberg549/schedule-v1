var workingHours = [8,9,10,11,12,13,14,15,16,17];

var containerElement = $(".container");


function createRow(time) {
    var rowElement = $("<div>");
    rowElement.addClass("row m-3");

    var timeElement = $("<span>");
    timeElement.attr("id", moment().hour(time).format("HH"));
    timeElement.addClass("col-sm-2 text-center mt-2")
    timeElement.text(moment().hour(time).format("h a"));
    
    var inputElement = $("<input>");
    inputElement.attr("id", time + "-details")
    inputElement.addClass("col-sm-6");

    var saveElement = $("<button>")
    saveElement.attr("id", time + "-save")
    saveElement.addClass("col-sm-1 btn btn-info")
    saveElement.text("Save");
    $(saveElement).on("click", function(event){
        event.preventDefault();
        var key = $(inputElement).attr("id")
        console.log(key);
        var data = $(inputElement).val().trim()
        localStorage.setItem(key, data);
    })

    var clearElement = $("<button>")
    clearElement.attr("id", time + "-clear")
    clearElement.addClass("col-sm-1 btn btn-info")
    clearElement.text("Clear");
    $(clearElement).on("click", function(event){
        var key = $(inputElement).attr("id")
        localStorage.removeItem(key);
        $("#" + key).val('');
    });

    rowElement.append(timeElement);
    rowElement.append(inputElement);
    rowElement.append(saveElement);
    rowElement.append(clearElement);

    containerElement.append(rowElement);
}

function render() {
    for (let index = 0; index < workingHours.length; index++) {
        createRow(workingHours[index]);
        getDetails(workingHours[index]);
    }
}

function getDetails(time) {
    $("#" + time + "-details").val(localStorage.getItem(time + "-details"));
}

function todayDate() {
    setInterval(function() {
        $(".current-date-time").text("Today is " + moment().format("MMM-DD-YYYY"));

        for (let index = 0; index < workingHours.length; index++) {
            var timeBlock = $("#" + workingHours[index]).attr("id");
            var currentTime = moment().format("HH");
            
            if (timeBlock === currentTime) {
                $("#" + workingHours[index] + "-details").addClass("bg-light");
            } else if (timeBlock > currentTime) {
                $("#" + workingHours[index] + "-details").addClass("bg-info");
            } else {
                $("#" + workingHours[index] + "-details").addClass("");

            }
        }
    }, 1000)
}

render();
todayDate();