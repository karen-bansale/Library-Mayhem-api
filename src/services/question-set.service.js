const questionSetRepository = require('../repositories/question-set.repository');

class QuestionSetService {
  async createQuestionSet(data) {
    return await questionSetRepository.create(data);
  }

  async getAllQuestionSets() {
    return await questionSetRepository.findAll();
  }

  async getQuestionSetById(id) {
    const questionSet = await questionSetRepository.findById(id);
    if (!questionSet) {
      throw new Error('Question set not found');
    }
    return questionSet;
  }

  async updateQuestionSet(id, data) {
    const updated = await questionSetRepository.update(id, data);
    if (!updated) {
      throw new Error('Question set not found for update');
    }
    return updated;
  }

  async deleteQuestionSet(id) {
    const deleted = await questionSetRepository.delete(id);
    if (!deleted) {
      throw new Error('Question set not found for deletion');
    }
    return deleted;
  }
}

module.exports = new QuestionSetService();