"use strict";

window.BITBALL = {};

var rankingsJson = [
  {"team": {"name": "Australia", "abbr": "AU", "id": 32}, "pos": 1, "pts": 54.23},
  {"team": {"name": "New Zealand", "abbr": "NZL", "id": 62 }, "pos": 2, "pts": 54.00},
  {"team": { "name": "France", "abbr": "FRA", "id": 2 }, "pos": 3, "pts": 52.95},
  {"team": { "name": "England", "abbr": "ENG", "id": 1 }, "pos": 4, "pts": 52.32},
  {"team": { "name": "Romania", "abbr": "ROU", "id": 24 }, "pos": 5, "pts": 43.50}
],
newMatch = [];

(function() {
  var ratingsNode = document.getElementById('ratingsTable'),
  teamA, teamB, matchOutcome, matchVenue,
  ptsA, ptsB,
  ptsAcalc, ptsBcalc, ptsDiff,
  dataClone = []

  BITBALL.init = function(jsonObj) {
    dataClone = jsonObj;
    initTable();
    updateTable()
  }
  BITBALL.initMatch = function(){
    getMatch()
  }
  BITBALL.addMatch = function(match) {
    if(match.status === "C") {
      teamA = match.teams[0].name;
      teamB = match.teams[1].name;
      matchOutcome = match.outcome;
      matchVenue = match.venue.country;
      calcPoints();
      updateData(teamA, ptsA);
      updateData(teamB, ptsB);
      sortData();
      updateTable()
    }
    else {
      console.log("Match is false");
      return false
    }
  }
  var initTable = function() {
    var tmRow;
    for (var a, b = 0; a = dataClone[b++];) {
      tmRow = document.createElement("tr");
      tmRow.insertCell(0);
      tmRow.insertCell(1);
      tmRow.insertCell(2);
      ratingsNode.appendChild(tmRow)
    }
  },
  updateTable = function() {
    for (var a, b = 0; a = dataClone[b++];) {
      ratingsNode.rows[b].cells.item(0).setAttribute("id", a.team.id);
      ratingsNode.rows[b].cells.item(0).innerHTML = a.team.name;
      ratingsNode.rows[b].cells.item(1).innerHTML = a.pos;
      ratingsNode.rows[b].cells.item(2).innerHTML = a.pts
    }
  },
  getMatch = function(){
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
        {"id": getTeamData(teamAval, "team", "id"), "name": teamAval, "abbreviation": getTeamData(teamAval, "team", "abbr")},
        {"id": getTeamData(teamBval, "team", "id"), "name": teamBval, "abbreviation": getTeamData(teamBval, "team", "abbr")}
      ],
      "scores": [parseFloat(scoreA, 10), parseFloat(scoreB, 10)],
      "status": "U",
      "outcome": "N"
    }
    scoreA < 1 || scoreB < 1 ? newMatch.outcome = "N" : scoreA > scoreB ? newMatch.outcome = "A" : scoreB > scoreA ? newMatch.outcome = "B" : newMatch.outcome = "D";

    newMatch.outcome === "N" ? newMatch.status = "U" : newMatch.status = "C";
    console.log(newMatch.outcome + ' ' + newMatch.status);
  },
  calcPoints = function() {
    ptsA = getTeamData(teamA, "pts");
    ptsB = getTeamData(teamB, "pts");
    console.log(ptsA + " " + ptsB);
    ptsAcalc = ptsA;
    ptsBcalc = ptsB;
    teamA === matchVenue && (ptsAcalc += 3);
    teamB === matchVenue && (ptsBcalc += 3);
    console.log(ptsAcalc + " " + ptsBcalc);
    ptsDiff = (ptsAcalc - ptsBcalc);
    ptsDiff < -10 && (ptsDiff = -10);
    ptsDiff > 10 && (ptsDiff = 10);
    evalPoints();
    ptsA = roundPoints(ptsA);
    ptsB = roundPoints(ptsB)
  },
  evalPoints = function() {
    if(matchOutcome === "A") {
      ptsA += (1 - (ptsDiff /  10));
      ptsB -= (1 - (ptsDiff /  10))
    }
    else {
      if(matchOutcome === "B") {
        ptsA -= (1 + (ptsDiff /  10));
        ptsB += (1 + (ptsDiff /  10))
      }
      else {
        ptsA += (ptsDiff /  10);
        ptsB += (ptsDiff /  10)
      }
    }
  },
  roundPoints = function(pts) {
    return Number(Math.round(pts + 'e' + 2) + 'e-' + 2)
  },
  getTeamData = function(country, node1, node2) {
    for (var a, b = 0; a = dataClone[b++];) {
      if (a.team.name === country) {
        return node2 ? a[node1][node2] : a[node1]
      }
    }
  },
  updateData = function(cty, pts) {
    for (var a, b = 0; a = dataClone[b++];) {
      if (a.team.name === cty) {
        a.pts = pts
      }
    }
  },
  sortData = function() {
    dataClone.sort(function (a, b) {
      if (a.pts > b.pts) {
        return -1
      }
      if (a.pts < b.pts) {
        return 1
      }
    });
    for (var a, b = 0; a = dataClone[b++];) {
      a.pos = b
    }
  }
})();

BITBALL.init(rankingsJson);

document.getElementById("submitMatch").addEventListener("click", function() {
  BITBALL.initMatch();
  BITBALL.addMatch(newMatch)
})
