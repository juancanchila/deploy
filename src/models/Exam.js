// src/models/Exam.js

class Exam {
    constructor(data) {
      this.id = data.Id;
      this.title = data.Title;
      this.status = data.Status;
      this.createdAt = data.Created;
      this.updatedAt = data.Modified;
      this.examiner = data.Examiner;
      this.client = data.Client;
    }
  }
  
  module.exports = Exam;
  