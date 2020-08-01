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
        var key = $(this).attr("id");
        
        console.log(event);
        console.log(inputElement);
        
    });

    rowElement.append(timeElement);
    rowElement.append(inputElement);
    rowElement.append(saveElement);

    containerElement.append(rowElement);


}

function saveDetail(event, inputValue) {
    console.log(event);
    console.log(inputValue);
}


function render() {
    for (let index = 0; index < workingHours.length; index++) {
        createRow(workingHours[index]);
        
    }

}

render()






