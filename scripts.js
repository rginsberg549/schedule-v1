var workingHours = ["8am", "9am", "10am"];

var containerElement = $(".container");


function createRow(time) {
    var time = time

    var rowElement = $("<div>");
    
    rowElement.addClass("row m-3");

    var timeElement = $("<span>");
    timeElement.attr("id", time);
    timeElement.addClass("col-sm-2 text-center mt-2")
    timeElement.text(time);
    
    var inputElement = $("<input>");
    inputElement.attr("id", time + "-details")
    inputElement.addClass("col-sm-8");

    var saveElement = $("<button>")
    saveElement.attr("id", time)
    saveElement.addClass("col-sm-2 btn btn-info")
    saveElement.text("Save");
    $(saveElement).on("click", function(event){
        event.preventDefault();
        var data = {
            "key" : $(inputElement).attr("id"),
            "details": $(inputElement).val().trim()
        }
        console.log(data);
    });

    rowElement.append(timeElement);
    rowElement.append(inputElement);
    rowElement.append(saveElement);

    containerElement.append(rowElement);
}



function render() {
    for (let index = 0; index < workingHours.length; index++) {
        createRow(workingHours[index]);
        
    }

}

render()






