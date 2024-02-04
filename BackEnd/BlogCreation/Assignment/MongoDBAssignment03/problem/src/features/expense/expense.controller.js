import ExpenseRepository from "./expense.repository.js";
import ExpenseModel from "./expense.model.js";
export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    try {
      const { title, amount, date, isRecurring, tags } = req.body;
      const newExpense = new ExpenseModel(
        title,
        parseFloat(amount),
        date,
        isRecurring,
        tags
      );

      const addedExpense = await this.expenseRepository.addExpense(newExpense);
      res.status(201).send(addedExpense);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    try{
      const id = req.params.id;
      const data = await this.expenseRepository.getOne(id);
      if (!data) {
        res.status(404).send('Product not found');
      } else {
        return res.status(200).send(data);
      }

    }catch(err)
    {
      return res.status(400).send("Something went wrong");
    }

  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      const addedExpense = await this.expenseRepository.getAllExpenses();
      res.status(200).send(addedExpense);
    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    try {
      const id  =  req.params.id;
      
      const tags  = req.body.tags;
      // console.log("tags :: ",tags);

     await this.expenseRepository.addTagToExpense(id,tags);
     
     return res.status(200).send("Tag added successfully");

    } catch (err) {
      console.log(err);
      return res.status(400).send("Something went wrong");
    }

    
  };
  // http://localhost:3000/api/expenses/filter?minAmount=10&maxAmount=20&isRecurring=false
  // Filter expenses based on given criteria
  filter = async (req, res) => {
    

    try{
      const minAmount = req.query.minAmount;
    const maxAmount = req.query.maxAmount;
    // const isRecurring = Boolean(req.query.isRecurring);
    const isRecurring =  req.query.isRecurring === 'true';
    const result = await this.expenseRepository.filterExpenses(
      minAmount,
      maxAmount,
      isRecurring
    );
    res.status(200).send(result);


      }catch(err){
        console.log(err);
        return res.status(400).send("Something went wrong");
      }


  };
}
