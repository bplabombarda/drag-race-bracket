export default function getScore(email, submissions, results) {
  let score = 0;
  const weeks = Object.keys(submissions[email]);

  weeks.forEach((week) => {
    if (results && results[week]) {
      score += addScore(submissions[email][week], results[week], email);
    }
  });

  return { email, score };
}

function addScore(week, result, email) {
  let weekScore = 0;
  if (!result.finale) {
    let matches = [];

    Object.keys(week).forEach((position) => {
      week.winner = week.winner || "none";
      week.top = week.top || "none";
      week.bottom = week.bottom || "none";
      week.eliminated = week.eliminated || "none";
      // correct winner or eliminated

      if (position === "winner" || position === "eliminated") {
        matches = result[position].filter((pos) => {
          return week[position].toLowerCase().includes(pos.toLowerCase());
        });
        weekScore += 10 * matches.length;
      }

      //   eliminated is in bottom
      if (position === "bottom") {
        matches = result[position].filter((pos) => {
          return (
            week[position].toLowerCase().includes(pos.toLowerCase()) ||
            week.eliminated.toLowerCase().includes(pos.toLowerCase())
          );
        });
        return (weekScore += 5 * matches.length);
      }

      //   bottom is in eliminated
      if (position === "eliminated") {
        matches = result[position].filter((pos) => {
          return week.bottom.toLowerCase().includes(pos.toLowerCase());
        });
        return (weekScore += 5 * matches.length);
      }

      //  winner  is in the top section
      if (position === "top") {
        matches = result[position].filter((pos) => {
          return (
            week[position].toLowerCase().includes(pos.toLowerCase()) ||
            week.winner.toLowerCase().includes(pos.toLowerCase())
          );
        });
        return (weekScore += 5 * matches.length);
      }

      //   top is in winner
      if (position === "winner") {
        matches = result[position].filter((pos) => {
          return week.top.toLowerCase().includes(pos.toLowerCase());
        });
        return (weekScore += 5 * matches.length);
      }
    });

    return weekScore;
  } else {
    Object.keys(week).forEach((position) => {
      if (position.includes("winner")) {
        const matches = result.winner.filter((pos) => {
          return week[position].toLowerCase().includes(pos.toLowerCase());
        });
        weekScore += 15 * matches.length;
      }

      if (position.includes("runner")) {
        const matches = result.runnersUp.filter((pos) => {
          return week[position].toLowerCase().includes(pos.toLowerCase());
        });
        weekScore += 10 * matches.length;
      }

      if (position.includes("congeniality")) {
        const matches = result.missCongeniality.filter((pos) => {
          return week[position].toLowerCase().includes(pos.toLowerCase());
        });
        weekScore += 5 * matches.length;
      }
    });

    return weekScore;
  }
}
