import DatabaseError from "../middlewares/errors/databaseError.js";
import NotFoundError from "../middlewares/errors/notFoundError.js";


class BaseService {
  constructor(model) {
    this.model = model;
  }
  
  async findAll() {
    try {
      return await this.model.scan().exec();
    } catch (error) {
      if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
        throw new DatabaseError("Unable to retrieve data from DynamoDB", error);
      }
      throw error;
    }
  }

  async findById(id) {
    try {
      const record = await this.model.get(id);
      if (!record) {
        throw new NotFoundError(`${this.model.name} with ID ${id} not found.`);
      }
      return record;
    } catch (error) {
      if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
        throw new DatabaseError("Unable to retrieve data from DynamoDB", error);
      }
      throw error;
    }
  }

  async create(data) {
    try {
      const record = new this.model(data);
      return await record.save();
    } catch (error) {
      if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
        throw new DatabaseError("Unable to retrieve data from DynamoDB", error);
      }
      throw error;
    }
  }

  async update(id, data) {
    const record = await this.findById(id);
    record = { ...record, ...data };
    try {
      return await this.model.update(record);
    } catch (error) {
      if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
        throw new DatabaseError("Unable to retrieve data from DynamoDB", error);
      }
      throw error;
    }
  }

  async delete(id) {
    await this.findById(id);
    try {
      return await this.model.delete(id);
    } catch (error) {
      if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
        throw new DatabaseError("Unable to retrieve data from DynamoDB", error);
      }
      throw error;
    }
  }

  async batchCreate(data) {
    try {
      return await this.model.batchPut(data);
    } catch (error) {
      if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
        throw new DatabaseError("Unable to retrieve data from DynamoDB", error);
      }
      throw error;
    }
  }
}

export default BaseService;
