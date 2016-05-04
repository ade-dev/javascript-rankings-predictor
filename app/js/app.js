"use strict";

function BitBall (){
  this.rankingsClone = [];
}

BitBall.prototype.init = function(rankingsObj) {
  this.rankingsClone = rankingsObj;
}
BitBall.prototype.addMatch = function(match) {
  if(match.status === "C") {
    this.initMatch(match).updatePoints();
    this.updateJson(this.rankingsClone, this.teamA, this.ptsA);
    this.updateJson(this.rankingsClone, this.teamB, this.ptsB);
    this.sortJson(this.rankingsClone);
  }
  else {
    return false
  }
}
BitBall.prototype.initMatch = function(match) {
  this.teamA = match.teams[0].name;
  this.teamB = match.teams[1].name;
  this.matchOutcome = match.outcome;
  this.matchVenue = match.venue.country;
  return this
}
BitBall.prototype.updatePoints = function() {
  this.ptsA = this.getTeamData(this.rankingsClone, this.teamA, "pts");
  this.ptsB = this.getTeamData(this.rankingsClone, this.teamB, "pts");
  this.ptsAcalc = this.ptsA;
  this.ptsBcalc = this.ptsB;
  this.teamA === this.matchVenue && (this.ptsAcalc += 3);
  this.teamB === this.matchVenue && (this.ptsBcalc += 3);
  this.ptsDiff = (this.ptsAcalc - this.ptsBcalc);
  this.ptsDiff < -10 && (this.ptsDiff = -10);
  this.ptsDiff > 10 && (this.ptsDiff = 10);
  this.evalPoints();
  this.ptsA = this.roundNumber(this.ptsA);
  this.ptsB = this.roundNumber(this.ptsB);
}

BitBall.prototype.getTeamData = function(obj, teamName, key1, key2) {
  for (var a, b = 0; a = obj[b++];) {
    if (a.team.name === teamName) {
      return key2 ? a[key1][key2] : a[key1]
    }
  }
}
BitBall.prototype.evalPoints = function() {
  if(this.matchOutcome === "A") {
    this.ptsA += (1 - (this.ptsDiff /  10));
    this.ptsB -= (1 - (this.ptsDiff /  10))
  }
  else {
    if(this.matchOutcome === "B") {
      this.ptsA -= (1 + (this.ptsDiff /  10));
      this.ptsB += (1 + (this.ptsDiff /  10))
    }
    else {
      this.ptsA += (this.ptsDiff /  10);
      this.ptsB += (this.ptsDiff /  10)
    }
  }
}
BitBall.prototype.updateJson = function(obj, cty, pts) {
  for (var a, b = 0; a = obj[b++];) {
    if (a.team.name === cty) {
      a.pts = pts
    }
  }
}
BitBall.prototype.sortJson = function(obj) {
  obj.sort(function (a, b) {
    if (a.pts > b.pts) {
      return -1
    }
    if (a.pts < b.pts) {
      return 1
    }
  });
  for (var a, b = 0; a = obj[b++];) {
    a.pos = b
  }
}
BitBall.prototype.roundNumber = function(pts) {
  return Number(Math.round(pts + 'e' + 2) + 'e-' + 2)
}
