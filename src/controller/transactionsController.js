import {sql} from "../config/db.js";

//Get Controller
export async function getTransactionsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const transactions = await sql`
        SELECT * FROM transactions WHERE user_id = ${userId} ORDER BY creaed_at DESC
      `;
      res.status(200).json(transactions);

    } catch (error) {
        console.error("Error getting the transactions:", error);
        res.status(500).json({ message: "Internal server error" });
      
    }
 };

//Post Controller 
export async function createTransaction(req, res){
    
        //title,user_id,ammount,category
        try {
          const { title, user_id, amount, category } = req.body;
    
          if(!title || !user_id || !category || amount === undefined) {
            return res.status(400).json({ message: "All fields are required" });
          }
           
          const transaction = await sql`
            INSERT INTO transactions(user_id, title, amount, category)
            VALUES (${user_id}, ${title}, ${amount}, ${category})
            RETURNING *
          `;
          
          console.log(transaction);
          res.status(201).json(transaction[0]);
    
        } catch (error) {
          console.error("Error creating transaction:", error);
          res.status(500).json({ message: "Internal server error" });
          
        }
 };

//Delete Controller
export async function deleteTransaction(req, res) {
  try {
    const {id} = req.params;

    if (isNaN(parseInt(id))) {
      return res.status(400).json({ message: "Invalid transaction ID" });
    }

    const result = await sql`
      DELETE FROM transactions WHERE id = ${id} RETURNING *
    `;

    if (result.length === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.status(200).json({ message: "Transaction deleted successfully", transaction: result[0] });

  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).json({ message: "Internal server error" });
    
  }  
};

// Summary Controller
export async function getSummaryByUserId(req, res) {
    try {
      const { userId } = req.params;
      const balanceResult = await sql`
       SELECT COALESCE(SUM(amount), 0) AS balance FROM transactions WHERE user_id = ${userId}
      `;

      const incomeResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS income FROM transactions WHERE user_id = ${userId} AND amount > 0
      `;
      const expenseResult = await sql`
        SELECT COALESCE(SUM(amount), 0) AS expenses FROM transactions WHERE user_id = ${userId} AND amount < 0
      `;
      
      res.status(200).json({
        balance: balanceResult[0].balance,
        income: incomeResult[0].income,
        expenses: expenseResult[0].expenses
      });


    } catch (error) {
      console.error("Error getting transactions:", error);
      res.status(500).json({ message: "Internal server error" });
      
    }
}



