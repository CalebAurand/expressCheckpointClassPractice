let db = require('../model/db');

//function to return a summary list of all items on the response
const itemsSummary = (req, res) => {
  console.log("items summary Get controller function");

  let sql = "select id, task, is_done from todos";

  db.query(sql, function(err, results){
    if(err){
      //handle the error
      console.log("could not execute the query", err);
      res.sendStatus(400);
    } else {
      res.json(results);
    };
  });
};


//function to return the detail of a single item on the response
const itemDetails = function(req, res){
  console.log("itemDetails");
  let id = req.params.id;
  
  //when a sql statement uses ?, this is called parameterized SQL
  let sql = "select id, task, description, is_done from todos where id = ?";
  let params = []; // this array will hold the params for our SQL statement
  params.push(id); // this is the first param in the sql statement

  //BAD WAY!!!!!!!!!!!!!, susceptible to sql injection DO NOT DO IT THIS WAY!!!!!!!!!!!!!
  //>>>let badsql = "select id, task, description, is_done from todos where id = "+id;

  //back to good way here
  db.query(sql, params, function(err, results){
    if(err){
      console.log("failed to execute query:", err);
      res.sendStatus(500); // it is not the clients fault the query failed
    } else {
      if(results.length == 1){
        res.json(results[0]);
      } else if (results.length > 1) {
        console.log("found more than one result for id", id);
        res.sendStatus(500);
      } else {
        // if the result is 0, 
        res.sendStatus(404);
      }
    };
  })
};

/**this is the expected json body syntax
 * {
 *    "task": "akljasdfljkd", -- this cannot be empty
 *    "description": "a;lkjaskdfj"
 * }
 */

//function to create a new item
const createItem = function(req, res){
  console.log("createItem");
  
  let input = req.body;
  let task = input.task;
  let description = input.description;

  if(!task){
    res.status(400).send("task is required");
    return;
  };

  // we are using parameterized sql again, to avoid sql injection
  // we should always used parameterized sql when accepting input from the client
  // and using it in the sql statement, Because we DO NOT TRUST THE CLIENT
  let sql = "insert into todos (task, description) values (?, ?)";
  let params = [task, description];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("could not execute sql insert", err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204); // we do not have anything to return, but we want to let the client know that we have received their input OK
    };
  })
};

/*
  {
    "task": "adlkjdklj", -- required
    "description": "askdfjlakdjf;ajdfsl;akjsdf",
    "is_done": true / false
  }
*/

//function to update an item
const updateItem = function(req, res){
  console.log("updateItem");

  //get the id from the path parameter
  let id = req.params.id;
  let body = req.body;
  let task = body.task;
  let description = body.description;
  let isDone = body.is_done;

  //make sure task is set in the body
  if(!task){
    res.status(400).send("task is required");
    return;
  };

  if(isDone != true && isDone != false){
    res.status(400).send("is_done must be either true or false");
    return;
  };

  let isDoneInt;
  if(isDone == true){
    isDoneInt = 1;
  } else {
    isDoneInt = 0;
  };

  let sql = "update todos set task = ?, description = ?, is_done = ? where id = ?";
  let params = [task, description, isDoneInt, id];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("could not execute update sql");
      res.sendStatus(500); //this is not the clients fault
    } else {
      res.sendStatus(204); //no data to send back, but we want to let the client know that everything went ok
    };
  });


};

//function to delete an item
const deleteItem = (req, res) =>{
  console.log("deleteItem");

  let id = req.params.id;

  let sql = "delete from todos where id = ?";
  let params = [id];

  db.query(sql, params, function(err, results){
    if(err){
      console.log("failed to delete item"+id, err);
      res.sendStatus(500);
    } else {
      res.sendStatus(204); // nothing to send back, but the ok status
    };
  });


};


module.exports = {
  itemDetails,
  itemsSummary,
  createItem,
  updateItem,
  deleteItem
};