import DatabaseError from "../middlewares/errors/databaseError.js";
import NotFoundError from "../middlewares/errors/notFoundError.js";


/**
 * BaseService class provides a set of common methods to interact with a database model.
 * It includes methods for finding, creating, updating, and deleting records, as well as batch operations.
 *
 * @class BaseService
 * @param {Object} model - The database model to be used by the service.
 */
class BaseService {
  constructor(model) {
    this.model = model;
  }
  
  /**
   * Retrieves all records from the database.
   *
   * @returns {Promise<Array>} A promise that resolves to an array of records.
   * @throws {DatabaseError} If there is an error connecting to the database.
   */
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


  /**
   * Retrieves a record from the database by its ID.
   *
   * @param {string|number} id - The unique identifier of the record to retrieve.
   * @returns {Promise<Object>} A promise that resolves to the retrieved record.
   * @throws {NotFoundError} If no record is found with the given ID.
   * @throws {DatabaseError} If there is an error connecting to the database.
   */
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


  /**
   * Creates a new record in the database.
   *
   * @param {Object} data - The data to be used for creating the new record.
   * @returns {Promise<Object>} A promise that resolves to the newly created record.
   * @throws {DatabaseError} If there is an error connecting to the database.
   */
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


  /**
   * Updates a record in the database with the given data.
   *
   * @param {string} id - The ID of the record to update.
   * @param {Object} data - The data to update the record with.
   * @returns {Promise<Object>} The updated record.
   * @throws {DatabaseError} If there is an error retrieving data from DynamoDB.
   * @throws {Error} If there is any other error during the update process.
   */
  async update(id, data) {
    let record = await this.findById(id);
    const { createdAt, updatedAt, ...filteredRecord } = record
    const updatedRecord = { ...filteredRecord, ...data };
    try {
      return await this.model.update(updatedRecord);
    } catch (error) {
      if (error.code === "ENOTFOUND" || error.code === "ECONNABORTED") {
        throw new DatabaseError("Unable to retrieve data from DynamoDB", error);
      }
      throw error;
    }
  }

  /**
   * Deletes a record by its ID.
   *
   * @param {string} id - The ID of the record to delete.
   * @returns {Promise<Object>} The result of the delete operation.
   * @throws {DatabaseError} If there is an issue retrieving data from DynamoDB.
   * @throws {Error} If any other error occurs during the delete operation.
   */
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

  /**
   * Batch creates items in the database.
   *
   * @param {Array} data - The data to be batch created.
   * @returns {Promise<Object>} The result of the batch create operation.
   * @throws {DatabaseError} If there is a network-related error while accessing DynamoDB.
   * @throws {Error} If any other error occurs during the batch create operation.
   */
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
