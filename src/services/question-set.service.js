const questionSetRepository = require('../repositories/question-set.repository');
const { AppError } = require('../errors/app-error');

class QuestionSetService {
  async getAllQuestionSets() {
    return await questionSetRepository.findAll();
  }

  async getQuestionSetById(id) {
    const set = await questionSetRepository.findById(id);
    if (!set) {
      throw new AppError(404, 'NOT_FOUND', 'Question set not found.');
    }
    return set;
  }

  async createQuestionSet(userId, data) {
    return await questionSetRepository.create({
      ...data,
      host_id: userId,
    });
  }

  async updateQuestionSet(id, userId, data) {
    const set = await questionSetRepository.findById(id);
    if (!set) {
      throw new AppError(404, 'NOT_FOUND', 'Question set not found.');
    }
    // Ownership check: Hindi pwedeng baguhin ng ibang host ang hindi kanila
    if (set.host_id !== userId) {
      throw new AppError(403, 'FORBIDDEN', 'You do not own this question set.');
    }
    return await questionSetRepository.update(id, data);
  }

  async deleteQuestionSet(id, userId) {
    const set = await questionSetRepository.findById(id);
    if (!set) {
      throw new AppError(404, 'NOT_FOUND', 'Question set not found.');
    }
    // Ownership check
    if (set.host_id !== userId) {
      throw new AppError(403, 'FORBIDDEN', 'You do not own this question set.');
    }
    return await questionSetRepository.delete(id);
  }
}

module.exports = new QuestionSetService();