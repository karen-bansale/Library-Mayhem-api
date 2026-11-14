module.exports = {
  users_username_key: {
    status: 409,
    code: 'USERNAME_TAKEN',
    message: 'That username is already in use.',
  },

  uq_player_nickname: {
    status: 409,
    code: 'NICKNAME_TAKEN',
    message: 'That nickname is already used in this game.',
  },
  
  users_email_key: {
    status: 409,
    code: 'EMAIL_TAKEN',
    message: 'That email is already registered.',
  },
  users_school_id_key: {
    status: 409,
    code: 'SCHOOL_ID_TAKEN',
    message: 'That school ID is already registered.',
  },
  game_sessions_session_code_key: {
    status: 409,
    code: 'SESSION_CODE_TAKEN',
    message: 'That session code is already in use.',
  },
  game_sessions_set_id_fkey: {
    status: 409,
    code: 'QUESTION_SET_IN_USE',
    message: 'This question set is used by a game and cannot be deleted.',
  },
};