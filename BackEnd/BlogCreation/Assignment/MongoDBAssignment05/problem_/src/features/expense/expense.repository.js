//No need to change the previous code

import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  //----------------previous code starts------------------------

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

  // Update a tag in an expense
  async updateTagInExpense(id, oldTag, newTag) {
    const db = getDB();
    const filter = { _id: new ObjectId(id), tags: oldTag };
    const update = { $set: { "tags.$": newTag } };
    const expenses = await db
      .collection(this.collectionName)
      .updateOne(filter, update);
    return expenses;
  }

  // Delete a tag from an expense
  async deleteTagFromExpense(id, tag) {
    const db = getDB();
    const filter = { _id: new ObjectId(id) };
    const update = { $pull: { tags: tag } };
    await db.collection(this.collectionName).updateOne(filter, update);
  }

  //------------------previous code ends------------------------

  // Only change the below functions

  // Aggregate total revenue for each product
  async aggregateTotalRevenue() {
    const db = getDB();
    const pipeline = [
      {
        $group: {
          _id: "$title",
          totalRevenue: { $sum: "$amount" },
        },
      },
    ];

    const result = await db
      .collection(this.collectionName)
      .aggregate(pipeline)
      .toArray();
    return result;
  }

  // Group expenses by tags
  async groupExpensesByTags() {
    const db = getDB();
    const pipeline = [
      {
        $group: {
          _id: "$tags",
          expenses: {
            $push: {
              _id: "$_id",
              title: "$title",
              amount: "$amount",
              date: "$date",
              isRecurring: "$isRecurring",
              tags: "$tags",
            },
          },
        },
      },
    ];

    const result = await db
      .collection(this.collectionName)
      .aggregate(pipeline)
      .toArray();
    return result;
  }

  // Group and calculate average by recurring status
  async groupAndCalculateAvgByRecurring() {
    const db = getDB();
    const pipeline = [
      {
        $group: {
          _id: "$isRecurring",
          avgAmount: { $avg: "$amount" },
        },
      },
    ];

    const result = await db
      .collection(this.collectionName)
      .aggregate(pipeline)
      .toArray();
    return result;
  }

  // // Aggregate total revenue for each product
  // async aggregateTotalRevenue() {
  //   try {
  //     const db = getDB();
  //     const itemsCursor = await db.collection(this.collectionName).aggregate([
  //       {
  //         $group: {
  //           _id: "$title",
  //           totalRevenue: { $sum: "$amount" },
  //         },
  //       },
  //       {
  //         $project: {
  //           _id: 0, // Exclude the default _id field
  //           id: "$_id", // Place id before totalRevenue
  //           totalRevenue: 1,
  //         },
  //       },
  //     ]);

  //     const items = await itemsCursor.toArray();

  //     console.log("items :: ", items);
  //     return items;
  //   } catch (error) {
  //     console.error("Error while aggregating total revenue:", error);
  //     throw error; // rethrow the error for handling it outside of this function if needed
  //   }
  // }

  // // Group expenses by tags
  // async groupExpensesByTags() {
  //   try {
  //     const db = getDB();
  //     const result = await db
  //       .collection(this.collectionName)
  //       .aggregate([
  //         {
  //           $group: {
  //             _id: "$tags",
  //             expenses: { $push: "$$ROOT" },
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: "$_id",
  //             // tag: ,
  //             expenses: 1,
  //           },
  //         },
  //       ])
  //       .toArray();

  //     console.log("Grouped expenses by tags:", result);
  //     return result;
  //   } catch (error) {
  //     console.error("Error while grouping expenses by tags:", error);
  //     throw error;
  //   }

  //   // The $group stage groups documents by the "tags" field.
  //   // We use the $$ROOT variable to reference the entire document within the group stage, pushing each document into an array called "expenses" for each tag.
  // }

  // // Group and calculate average by recurring status
  // async groupAndCalculateAvgByRecurring() {
  //   try {
  //     const db = getDB();
  //     const result = await db
  //       .collection(this.collectionName)
  //       .aggregate([
  //         {
  //           $group: {
  //             _id: "$isRecurring",
  //             avgAmount: { $avg: "$amount" }
  //           },
  //         },
  //         {
  //           $project: {
  //             _id: "$_id",
  //             avgAmount:1
  //           },
  //         },
  //       ])
  //       .toArray();

  //     console.log("isRecurring:", result);
  //     return result;
  //   } catch (error) {
  //     console.error("isRecurring:", error);
  //     throw error;
  //   }
  // }
}

export default ExpenseRepository;
