const { sequelize } = require('../models'); 

async function findFinishedGamePlayers(since) {
  const query = `
    SELECT 
      gs.session_code,
      gs.started_at,
      gs.ended_at,
      u.school_id,
      p.nickname,
      p.score,
      CASE 
        WHEN p.finished_at IS NOT NULL THEN true 
        ELSE false 
      END AS completed
    FROM game_sessions gs
    JOIN players p ON gs.session_id = p.session_id
    JOIN users u ON p.user_id = u.user_id
    WHERE gs.ended_at IS NOT NULL
      ${since ? 'AND gs.ended_at > :since' : ''}
    ORDER BY gs.ended_at DESC;
  `;

  const results = await sequelize.query(query, {
    replacements: { since },
    type: sequelize.QueryTypes.SELECT
  });

  return results;
}

module.exports = {
  findFinishedGamePlayers,
};