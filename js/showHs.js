if ((localStorage.length === 0)) {
    // Store
    localStorage.setItem("easyhighscore", 0);
    localStorage.setItem("normalhighscore", 0);
    localStorage.setItem("hardhighscore", 0);
}

var ehscore = localStorage.getItem("easyhighscore");
document.getElementById("easyhighscoreResult").innerHTML = localStorage.getItem("easyhighscore");
var ehscore = localStorage.getItem("normalhighscore");
document.getElementById("normalhighscoreResult").innerHTML = localStorage.getItem("normalhighscore");
var ehscore = localStorage.getItem("easyhighscore");
document.getElementById("hardhighscoreResult").innerHTML = localStorage.getItem("hardhighscore");
