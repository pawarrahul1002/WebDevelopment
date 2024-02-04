import { getDB } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      await collection.insertOne(expense);
      return expense;
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);

      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  // Get all expenses
  async getAllExpenses() {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      const expenses = await collection.find().toArray();
      // console.log(expenses);
      return expenses;
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      await collection.updateOne(
        {
          _id: new ObjectId(id),
        },
        {
          $push: { tags: tag },
        }
      );
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(minAmount, maxAmount, isRecurring) {
    try {
      const db = getDB();
      const collection = db.collection(this.collectionName);
      let filterExpression = {};
  
      if (minAmount) {
        filterExpression.amount = { $gte: parseFloat(minAmount) };
      }
      if (maxAmount) {
        filterExpression.amount = {
          ...filterExpression.amount,
          $lte: parseFloat(maxAmount),
        };
      }
      if (isRecurring !== undefined) {
        filterExpression.isRecurring = isRecurring;
      }
  
      console.log("FE", filterExpression);
      return await collection.find(filterExpression).toArray();
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }
  
}

export default ExpenseRepository;
