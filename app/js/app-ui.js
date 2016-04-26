"use strict";

window.BitBallUi = {};

var bitBall = new BitBall(),
newMatch = [];

var rankingsJson = [
  {"team": {"name": "Australia", "abbr": "AU", "id": 32}, "pos": 1, "pts": 54.23},
  {"team": {"name": "New Zealand", "abbr": "NZL", "id": 62 }, "pos": 2, "pts": 54.00},
  {"team": { "name": "France", "abbr": "FRA", "id": 2 }, "pos": 3, "pts": 52.95},
  {"team": { "name": "England", "abbr": "ENG", "id": 1 }, "pos": 4, "pts": 52.32},
  {"team": { "name": "Romania", "abbr": "ROU", "id": 24 }, "pos": 5, "pts": 43.50}
];

(function() {
  var ratingsNode = document.getElementById('ratingsTable');

  BitBallUi.initTable = function() {
    var tmRow;
    for (var a, b = 0; a = bitBall.rankingsClone[b++];) {
      tmRow = document.createElement("tr");
      tmRow.insertCell(0);
      tmRow.insertCell(1);
      tmRow.insertCell(2);
      ratingsNode.appendChild(tmRow)
    }
    return this
  }
  BitBallUi.updateTable = function() {
    for (var a, b = 0; a = bitBall.rankingsClone[b++];) {
      ratingsNode.rows[b].cells.item(0).setAttribute("id", a.team.id);
      ratingsNode.rows[b].cells.item(0).innerHTML = a.team.name;
      ratingsNode.rows[b].cells.item(1).innerHTML = a.pos;
      ratingsNode.rows[b].cells.item(2).innerHTML = a.pts
    }
    return this
  }
  BitBallUi.getMatch = function() {
    var rankingForm = document.rankingsForm,
    teamAval = rankingForm.firstTeamName.value,
    teamBval = rankingForm.secondTeamName.value,
    scoreA = rankingForm.firstTeamScore.value,
    scoreB = rankingForm.secondTeamScore.value,
    matchVenueVal = rankingForm.venue.value;

    newMatch = {
      "matchId": 2524, "description": "Match Data",
      "venue": {"id": 900, "name": "Stadium", "city": "city", "country": matchVenueVal},
      "teams": [
        {"id": bitBall.getTeamData(teamAval, "team", "id"), "name": teamAval, "abbreviation": bitBall.getTeamData(teamAval, "team", "abbr")},
        {"id": bitBall.getTeamData(teamBval, "team", "id"), "name": teamBval, "abbreviation": bitBall.getTeamData(teamBval, "team", "abbr")}
      ],
      "scores": [parseFloat(scoreA, 10), parseFloat(scoreB, 10)],
      "status": "U",
      "outcome": "N"
    }
    scoreA < 1 || scoreB < 1 ? newMatch.outcome = "N" : scoreA > scoreB ? newMatch.outcome = "A" : scoreB > scoreA ? newMatch.outcome = "B" : newMatch.outcome = "D";

    newMatch.outcome === "N" ? newMatch.status = "U" : newMatch.status = "C";
  };
})();

bitBall.init(rankingsJson);
BitBallUi.initTable().updateTable();

document.getElementById("submitMatch").addEventListener("click", function() {
  BitBallUi.getMatch();
  bitBall.addMatch(newMatch);
  BitBallUi.updateTable()
});




