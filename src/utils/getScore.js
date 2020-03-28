export default function getScore(email, submissions, results) {
  let score = 0;
  const weeks = Object.keys(submissions[email]);

  weeks.forEach(week => {
    if (results[week]) {
      score += addScore(submissions[email][week], results[week]);
    }
  });

  return { email, score };
}

function addScore(week, result) {
  let weekScore = 0;
  if (!result.finale) {
    let matches = [];

    Object.keys(week).forEach(position => {
      // correct winner or eliminated
      week.winner = week.winner || "none";
      week.top = week.top || "none";
      week.bottom = week.bottom || "none";
      week.eliminated = week.eliminated || "none";

      if (position === "winner" || position === "eliminated") {
        matches = result[position].filter(pos => {
          return week[position].toLowerCase().includes(pos.toLowerCase());
        });
        weekScore += 10 * matches.length;
      }

      //   eliminated is in bottom
      if (position === "bottom") {
        matches = result[position].filter(pos => {
          return (
            week[position].toLowerCase().includes(pos.toLowerCase()) ||
            week.eliminated.toLowerCase().includes(pos.toLowerCase())
          );
        });
        return (weekScore += 5 * matches.length);
      }

      //   bottom is in eliminated
      if (position === "eliminated") {
        matches = result[position].filter(pos => {
          return week.bottom.toLowerCase().includes(pos.toLowerCase());
        });
        return (weekScore += 5 * matches.length);
      }

      //  winner  is in the top section
      if (position === "top") {
        matches = result[position].filter(pos => {
          console.log("week", week);
          return (
            week[position].toLowerCase().includes(pos.toLowerCase()) ||
            week.winner.toLowerCase().includes(pos.toLowerCase())
          );
        });
        return (weekScore += 5 * matches.length);
      }

      //   top is in winner
      if (position === "winner") {
        matches = result[position].filter(pos => {
          return week.top.toLowerCase().includes(pos.toLowerCase());
        });
        return (weekScore += 5 * matches.length);
      }
    });

    return weekScore;
  }
}
