import { v4 as uuidv4 } from "uuid";

class UUIDHelper {
  /**
   * Generate a version 4 (random) UUID.
   * @returns {string} A version 4 UUID.
   */
  static generateV4() {
    return uuidv4();
  }
}

export default UUIDHelper;
