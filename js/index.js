var workTime = 1;
var breakTime = 1;
var seconds = 0;
var stop = false;
var progress = 100;
var totalSeconds = 0;
var counter = 0;
var intervalWork;
var intervalBreak;

$("#plusWork").click(function() {
    workTime++;
    $("#work").html(workTime);
});

$("#minusWork").click(function() {
    workTime--;
    if (workTime < 1) { workTime = 1; }
    $("#work").html(workTime);
});

$("#plusBreak").click(function() {
    breakTime++;
    $("#break").html(breakTime);
});

$("#minusBreak").click(function() {
    breakTime--;
    if (breakTime < 1) { breakTime = 1; }
    $("#break").html(breakTime);
});

$("#time").click(function() {
    if (stop) {
        console.log("TESTE");
        clearInterval(intervalWork);
        clearInterval(intervalBreak);
        stop = false;
    } else {
        $("#time").html(workTime + ':00');
        setWork(workTime);
        stop = true;
    }
});

function setWork(val) {
    $("#state").html("Work Time");
    totalSeconds = workTime * 60;
    counter = 0;
    seconds = 0;
    $("#progress").css("width", "100%");

    intervalWork = setInterval(function() {
        seconds--;
        counter++;
        if (seconds < 0) {
            val--;
            seconds = 59;
        }
        if (val == -1) {
            clearInterval(intervalWork);
            setBreak(breakTime);
        }

        var porcent = (100 - Math.round((100 * counter) / totalSeconds));
        progress = porcent + "%";

        if (val < 0) {} else {
            $("#progress").css("width", progress);
            if (seconds < 10) {
                $("#time").html(val + ":0" + seconds);
            } else {
                $("#time").html(val + ":" + seconds);
            }
        }

    }, 1000);
}

function setBreak(val) {
    $("#state").html("Break Time");
    totalSeconds = breakTime * 60;
    counter = 0;
    seconds = 0;
    $("#progress").css("width", "0%");

    intervalBreak = setInterval(function() {
        seconds--;
        counter++;
        if (seconds < 0) {
            val--;
            seconds = 59;
        }
        if (val == -1) {
            clearInterval(intervalBreak);
            setWork(workTime);
        }

        var porcent = Math.round((100 * counter) / totalSeconds);
        progress = porcent + "%";

        if (val < 0) {} else {
            $("#progress").css("width", progress);
            if (seconds < 10) {
                $("#time").html(val + ":0" + seconds);
            } else {
                $("#time").html(val + ":" + seconds);
            }
        }

    }, 1000);
}