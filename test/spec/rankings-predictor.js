describe("Bitball", function() {
  var bitBall,
  testRankingsJson,
  testMatch,
  testMatchHomeWin,
  testMatchAwayWin,
  testMatchDraw;

  beforeEach(function() {
    bitBall = new BitBall;

    testRankingsJson = [
      {"team": {"name": "Australia", "abbr": "AU", "id": 32}, "pos": 1, "pts": 54.23},
      {"team": {"name": "New Zealand", "abbr": "NZL", "id": 62 }, "pos": 2, "pts": 54.00},
      {"team": { "name": "France", "abbr": "FRA", "id": 2 }, "pos": 3, "pts": 52.95},
      {"team": { "name": "England", "abbr": "ENG", "id": 1 }, "pos": 4, "pts": 52.32},
      {"team": { "name": "Romania", "abbr": "ROU", "id": 24 }, "pos": 5, "pts": 43.50}
    ];
    bitBall.init(testRankingsJson);
  });

  it("BitBall.init: Should initialize the rankings table by assigning the inputted JSON object to a property of the Bitball object", function(){
    expect(bitBall.rankingsClone).toEqual(testRankingsJson);
  });

  describe("BitBall.addMatch", function() {
    beforeEach(function(){
      testMatch = {
        "matchId": 2524, "description": "Match Data",
        "venue": {"id": 900, "name": "Stadium", "city": "city", "country": "England"},
        "teams": [
          {"id": "1", "name": "England", "abbreviation": "ENG"},
          {"id": "2", "name": "France", "abbreviation": "FRA"}
        ],
        "scores": [3, 2],
        "status": "C",
        "outcome": "A"
      };
      bitBall.initMatch(testMatch);
    });

    it("BitBall.initMatch: Should initialize with values from the match JSON object", function(){
      expect(bitBall.teamA).toBe(testMatch.teams[0].name);
      expect(bitBall.teamB).toBe(testMatch.teams[1].name);
      expect(bitBall.matchOutcome).toBe(testMatch.outcome);
      expect(bitBall.matchVenue).toBe(testMatch.venue.country);
    });

    it("BitBall.getTeamData: Should get current team points from the rankings table", function(){
      bitBall.ptsA = bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamA, "pts");
      bitBall.ptsB = bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamB, "pts");
      expect(bitBall.ptsA).toBe(52.32);
      expect(bitBall.ptsB).toBe(52.95);

    });

    it("BitBall.updatePoints: Should calculate and return updated team rating points", function() {
      bitBall.updatePoints();
      expect(bitBall.ptsA).toEqual(53.08);
      expect(bitBall.ptsB).toEqual(52.19);
    });

    it("BitBall.updateJson: Should update the rankings table with latest rating points", function() {
      bitBall.updatePoints();
      bitBall.updateJson(bitBall.rankingsClone, bitBall.teamA, bitBall.ptsA);
      bitBall.updateJson(bitBall.rankingsClone, bitBall.teamB, bitBall.ptsB);
      expect(bitBall.ptsA).toBe(bitBall.rankingsClone[3].pts);
      expect(bitBall.ptsB).toBe(bitBall.rankingsClone[2].pts);
    });

    it("BitBall.sortJson: Should sort the updated rankings table by rating points", function() {
      bitBall.updatePoints();
      bitBall.updateJson(bitBall.rankingsClone, bitBall.teamA, bitBall.ptsA);
      bitBall.updateJson(bitBall.rankingsClone, bitBall.teamB, bitBall.ptsB);
      bitBall.sortJson(bitBall.rankingsClone);
      expect(bitBall.rankingsClone[2].pos).toBe(3);
    })
  });
  describe("Adding various matches", function(){
    beforeEach(function(){
      testMatchHomeWin = {
        "matchId": 2524, "description": "Match Data",
        "venue": {"id": 900, "name": "Stadium", "city": "city", "country": "Australia"},
        "teams": [
          {"id": "32", "name": "Australia", "abbreviation": "AU"},
          {"id": "62", "name": "New Zealand", "abbreviation": "NZL"}
        ],
        "scores": [3, 2],
        "status": "C",
        "outcome": "A"
      };
      testMatcAwayWin = {
        "matchId": 2526, "description": "Match Data",
        "venue": {"id": 900, "name": "Stadium", "city": "city", "country": "France"},
        "teams": [
          {"id": "2", "name": "France", "abbreviation": "FRA"},
          {"id": "1", "name": "England", "abbreviation": "ENG"}
        ],
        "scores": [3, 5],
        "status": "C",
        "outcome": "B"
      };
      testMatchDraw = {
        "matchId": 2526, "description": "Match Data",
        "venue": {"id": 900, "name": "Stadium", "city": "city", "country": "New Zealand"},
        "teams": [
          {"id": "2", "name": "France", "abbreviation": "FRA"},
          {"id": "32", "name": "Australia", "abbreviation": "AU"}
        ],
        "scores": [3, 3],
        "status": "C",
        "outcome": "D"
      };
      bitBall.init(testRankingsJson);
    });
    it("Should process a match with a home win", function(){
      bitBall.addMatch(testMatchHomeWin);
      expect(bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamA, "pts")).toBe(54.91);
      expect(bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamB, "pts")).toBe(53.32);
    });

    it("Should process a match with an away win", function(){
      bitBall.addMatch(testMatcAwayWin);

      expect(bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamA, "pts")).toBe(51.59);
      expect(bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamB, "pts")).toBe(53.68);
    });

    it("Should process a match with a draw", function(){
      bitBall.addMatch(testMatchDraw);
      expect(bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamA, "pts")).toBe(52.82);
      expect(bitBall.getTeamData(bitBall.rankingsClone, bitBall.teamB, "pts")).toBe(54.10);

    });
  })
});
