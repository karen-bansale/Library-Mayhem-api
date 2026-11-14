// TEMPORARY - Week 11 only.
// Hanggang wala pang login, header ang nagsasabi kung sinong user ang tumatawag.
const env = require('../config/env');
const userRepository = require('../repositories/user.repository');

if (env.nodeEnv === 'production') {
  throw new Error(
    'current-user.js is the Week 11 stand-in. Replace it before production.'
  );
}

async function currentUser(req, res, next) {
  const schoolId = req.get('X-Demo-User');
  const user = schoolId
    ? await userRepository.findBySchoolId(schoolId)
    : null;

  
  req.user = user
    ? {
        user_id: user.user_id,
        school_id: user.school_id,
        role: String(user.role).toUpperCase(),
      }
    : null;

  next();
}

module.exports = currentUser;
