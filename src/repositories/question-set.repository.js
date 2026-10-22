const { QuestionSet, User } = require('../models');

class QuestionSetRepository {
  async create(data) {
    return await QuestionSet.create(data);
  }

  async findAll() {
    return await QuestionSet.findAll({
      include: [{ model: User, as: 'host', attributes: ['user_id', 'username', 'school_id'] }]
    });
  }

  async findById(id) {
    return await QuestionSet.findByPk(id, {
      include: [{ model: User, as: 'host', attributes: ['user_id', 'username', 'school_id'] }]
    });
  }

  async update(id, data) {
    const questionSet = await QuestionSet.findByPk(id);
    if (!questionSet) return null;
    return await questionSet.update(data);
  }

  async delete(id) {
    const questionSet = await QuestionSet.findByPk(id);
    if (!questionSet) return null;
    await questionSet.destroy();
    return true;
  }
}

module.exports = new QuestionSetRepository();