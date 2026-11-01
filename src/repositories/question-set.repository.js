const { QuestionSet, User } = require('../models');

class QuestionSetRepository {
  async findAll() {
    return await QuestionSet.findAll({
      include: [{ model: User, as: 'host', attributes: ['user_id', 'school_id', 'full_name'] }]
    });
  }

  async findById(id) {
    return await QuestionSet.findByPk(id, {
      include: [{ model: User, as: 'host', attributes: ['user_id', 'school_id', 'full_name'] }]
    });
  }

  async create(data) {
    return await QuestionSet.create(data);
  }

  async update(id, data) {
    const record = await QuestionSet.findByPk(id);
    if (!record) return null;
    return await record.update(data);
  }

  async delete(id) {
    const record = await QuestionSet.findByPk(id);
    if (!record) return null;
    await record.destroy();
    return true;
  }
}

module.exports = new QuestionSetRepository();