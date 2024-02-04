import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    const db = getDB();
    console.log(expense);
    await db.collection(this.collectionName).insertOne(expense);
    return expense;
  }

  // Get one expnese by its ID
  async getOne(id) {
    const db = getDB();
    const expense = await db
      .collection(this.collectionName)
      .findOne({ _id: new ObjectId(id) });
    return expense;
  }

  // Get all expenses
  async getAllExpenses() {
    const db = getDB();
    const expenses = await db.collection(this.collectionName).find().toArray();
    return expenses;
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    const db = getDB();
    const result = await db
      .collection(this.collectionName)
      .updateOne({ _id: new ObjectId(id) }, { $push: { tags: tag } });
    return result;
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    const db = getDB();
    let query = {};

    if (criteria.minAmount || criteria.maxAmount) {
      query.amount = {};

      if (criteria.minAmount) {
        query.amount.$gte = parseFloat(criteria.minAmount);
      }

      if (criteria.maxAmount) {
        query.amount.$lte = parseFloat(criteria.maxAmount);
      }
    }

    if (criteria.isRecurring !== undefined) {
      query.isRecurring = criteria.isRecurring === "true";
    }

    const expenses = await db
      .collection(this.collectionName)
      .find(query)
      .toArray();
    return expenses;
  }

  // -----------Above is previous code-------------

  // Update a tag in an expense
  async updateTagInExpense(id, oldTag, newTag) {
    const db = getDB();
    const filter = { _id: new ObjectId(id), tags: oldTag };
    const update = { $set: { "tags.$": newTag } };
    const expenses = await db.collection(this.collectionName).updateOne(filter, update);
    return expenses;

  }

  // Delete a tag from an expense
  async deleteTagFromExpense(id, tag) {

    const db = getDB();
    const filter = { _id: new ObjectId(id) };
    const update = { $pull: { tags: tag } };
    await db.collection(this.collectionName).updateOne(filter, update);

  }

}

/**
 * Update a tag in an expense
 * 
 * @param {string} id - The ID of the expense item to be updated
 * @param {string} oldTag - The old tag value to be replaced
 * @param {string} newTag - The new tag value to replace the old tag
 * @returns {Promise<Object>} - A promise that resolves to an object containing information about the update operation
 */
async function __updateTagInExpense(id, oldTag, newTag) {
  const db = getDB();

  // Create a filter object to identify the document to be updated
  const filter = { _id: new ObjectId(id), tags: oldTag };

  // Create an update object to specify how the document should be modified
  const update = { $set: { "tags.$": newTag } };

  // Execute the update operation on the MongoDB collection
  const expenses = await db.collection(this.collectionName).updateOne(filter, update);

  // Return the result of the update operation
  return expenses;
}


export default ExpenseRepository;






//Don't change the prewritten code

// import { getDB } from "../../config/mongodb.js";
// import { ObjectId } from "mongodb";

// class ExpenseRepository {
//   constructor() {
//     this.collectionName = "expenses"; // name of the collection in mongodb
//   }

//   //-----------------Prewritten code starts----------------------

//   // Create a new expense
//   async addExpense(expense) {
//     const db = getDB();
//     console.log(expense);
//     await db.collection(this.collectionName).insertOne(expense);
//     return expense;
//   }

//   // Get one expnese by its ID
//   async getOne(id) {
//     const db = getDB();
//     const expense = await db
//       .collection(this.collectionName)
//       .findOne({ _id: new ObjectId(id) });
//     return expense;
//   }

//   // Get all expenses
//   async getAllExpenses() {
//     const db = getDB();
//     const expenses = await db.collection(this.collectionName).find().toArray();
//     return expenses;
//   }

//   // Add tag to an expense
//   async addTagToExpense(id, tag) {
//     const db = getDB();
//     const result = await db
//       .collection(this.collectionName)
//       .updateOne({ _id: new ObjectId(id) }, { $push: { tags: tag } });
//     return result;
//   }

//   // Filter expenses based on date, amount, and isRecurring field
//   async filterExpenses(criteria) {
//     const db = getDB();
//     let query = {};

//     if (criteria.minAmount || criteria.maxAmount) {
//       query.amount = {};

//       if (criteria.minAmount) {
//         query.amount.$gte = parseFloat(criteria.minAmount);
//       }

//       if (criteria.maxAmount) {
//         query.amount.$lte = parseFloat(criteria.maxAmount);
//       }
//     }

//     if (criteria.isRecurring !== undefined) {
//       query.isRecurring = criteria.isRecurring === "true";
//     }

//     const expenses = await db
//       .collection(this.collectionName)
//       .find(query)
//       .toArray();
//     return expenses;
//   }

//   // Update a tag in an expense
// async updateTagInExpense(id, oldTag, newTag) {
//   const db = getDB();
//   const collection = db.collection(this.collectionName);

//   const expense = await collection
//     .findOne({ _id: new ObjectId(id) });

//   const tagArr = expense.tags;
//   const tagIndex = tagArr.indexOf(oldTag);
//   if (tagIndex != -1) {
//     tagArr.splice(tagIndex, 1, newTag);
//   }

//   // Update the expense with the modified tags
//   await collection.updateOne(
//     { _id: new ObjectId(id) },
//     { $set: { tags: tagArr } }
//   );

//   // // 1. Removes existing entry
//   // await collection.updateOne(
//   //   {
//   //     _id: new ObjectId(id),
//   //   },
//   //   {
//   //     $pull: {tags},
//   //   }
//   // );

//   // // 2. Add new entry
//   // await collection.updateOne(
//   //   {
//   //     _id: new ObjectId(productID),
//   //   },
//   //   {
//   //     $push: { tags: tagArr },
//   //   }
//   // );
//   return { success: true, message: "Tag updated successfully" };
// }

//   // async updateTagInExpense(id, oldTag, newTag) {
//   //   const db = getDB();
//   //   const collection = db.collection(this.collectionName);
//   //   await collection.updateOne(
//   //     { _id: new ObjectId(id) },
//   //     { $pull: { tags: oldTag } }
//   //   );

//   //   await collection.updateOne(
//   //     { _id: new ObjectId(id) },
//   //     { $push: { tags: newTag } }
//   //   );

//   //   return { success: true, message: "Tag updated successfully" };
//   // }

//   // Delete a tag from an expense
//   async deleteTagFromExpense(id, tag) {
//     const db = getDB();
//     const collection = db.collection(this.collectionName);

//     const result = await collection.updateOne(
//       { _id: new ObjectId(id) },
//       { $pull: { tags: tag } } // Remove only the specified tag from the tags array
//     );

//     if (result.modifiedCount === 0) {
//       return { success: false, message: "Tag not found in expense" };
//     }

//     return { success: true, message: "Tag deleted successfully" };
//   }
// }

// export default ExpenseRepository;

// //----------------prewritten code ends--------------------------

// // Change below functions only

// // Update a tag in an expense
// // async __updateTagInExpense(id, oldTag, newTag) {
// //   const db = getDB();
// //   const collection = db.collection(this.collectionName);

// //   const expense = await collection
// //     .findOne({ _id: new ObjectId(id) });

// //   const tagArr = expense.tags;
// //   const tagIndex = tagArr.indexOf(oldTag);
// //   if (tagIndex != -1) {
// //     tagArr.splice(tagIndex, 1, newTag);
// //   }

// //   // Update the expense with the modified tags
// //   await collection.updateOne(
// //     { _id: new ObjectId(id) },
// //     { $set: { tags: tagArr } }
// //   );

// //   // // 1. Removes existing entry
// //   // await collection.updateOne(
// //   //   {
// //   //     _id: new ObjectId(id),
// //   //   },
// //   //   {
// //   //     $pull: {tags},
// //   //   }
// //   // );

// //   // // 2. Add new entry
// //   // await collection.updateOne(
// //   //   {
// //   //     _id: new ObjectId(productID),
// //   //   },
// //   //   {
// //   //     $push: { tags: tagArr },
// //   //   }
// //   // );
// //   return { success: true, message: "Tag updated successfully" };
// // }
// // Delete a tag from an expense
// // async __deleteTagFromExpense(id, tag) {
// //   const db = getDB();
// //   const collection = db.collection(this.collectionName);

// //   const expense = await collection
// //     .findOne({ _id: new ObjectId(id) });
// //   // console.log(expense);
// //   const tagArr = expense.tags;
// //   const tagIndex = tagArr.indexOf(tag);
// //   if (tagIndex != -1) {
// //     tagArr.splice(tagIndex, 1);
// //   }

// //   // Update the expense with the modified tags
// //   await collection.updateOne(
// //     { _id: new ObjectId(id) },
// //     { $set: { tags: tagArr } }
// //   );

// //   return { success: true, message: "Tag updated successfully" };
// // }

