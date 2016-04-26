"use strict";

function BitBall (){
  this.rankingsClone = [];
}

BitBall.prototype.init = function(rankingsObj) {
  this.rankingsClone = rankingsObj;
}
BitBall.prototype.getTeamData = function(country, node1, node2) {
  for (var a, b = 0; a = this.rankingsClone[b++];) {
    if (a.team.name === country) {
      return node2 ? a[node1][node2] : a[node1]
    }
  }
}
BitBall.prototype.addMatch = function(match) {
  if(match.status === "C") {
    this.teamA = match.teams[0].name;
    this.teamB = match.teams[1].name;
    this.matchOutcome = match.outcome;
    this.matchVenue = match.venue.country;
    this.calcPoints();
    this.updateData(this.teamA, this.ptsA);
    this.updateData(this.teamB, this.ptsB);
    this.sortData();
  }
  else {
    return false
  }
}
BitBall.prototype.calcPoints = function() {
  this.ptsA = this.getTeamData(this.teamA, "pts");
  this.ptsB = this.getTeamData(this.teamB, "pts");
  this.ptsAcalc = this.ptsA;
  this.ptsBcalc = this.ptsB;
  this.teamA === this.matchVenue && (this.ptsAcalc += 3);
  this.teamB === this.matchVenue && (this.ptsBcalc += 3);
  this.ptsDiff = (this.ptsAcalc - this.ptsBcalc);
  this.ptsDiff < -10 && (ptsDiff = -10);
  this.ptsDiff > 10 && (ptsDiff = 10);
  this.evalPoints();
  this.ptsA = this.roundPoints(this.ptsA);
  this.ptsB = this.roundPoints(this.ptsB)
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
BitBall.prototype.roundPoints = function(pts) {
  return Number(Math.round(pts + 'e' + 2) + 'e-' + 2)
}
BitBall.prototype.updateData = function(cty, pts) {
  for (var a, b = 0; a = this.rankingsClone[b++];) {
    if (a.team.name === cty) {
      a.pts = pts
    }
  }
}
BitBall.prototype.sortData = function() {
  this.rankingsClone.sort(function (a, b) {
    if (a.pts > b.pts) {
      return -1
    }
    if (a.pts < b.pts) {
      return 1
    }
  });
  for (var a, b = 0; a = this.rankingsClone[b++];) {
    a.pos = b
  }
}
