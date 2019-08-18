import db from '../db/db';

class todosController{
  getAllTodos(req,res) {
    return res.status(200).send({
      success: 'true',
      message: 'all todos retrieved successfully',
      todos: db,
    });
  }

  getTodo(req,res) {
    const id =parseInt(req.params.id, 10);
    db.map((todo) => {
      if(todo.id === id) {
        return res.status(200).send({
          success:'true',
          message:'todo was retrieved successfully',
          todo,
        });
      }
    });
    return res.status(404).send ({
      success: 'false',
      message: 'sorry, this todo does not exist',
    });
  }

    createTodo (req, res) {
      if (!req.body.title){
        return res.status(400).send({
          success: 'false',
          message:'hey, we need you to give a title',
        });
      } else if (!req.body.description) {
        return res.status(400).send({
          success: 'false',
          message: 'I need you to give a description please..:)',
        });
      }
      const todo = {
        id: db.length + 1,
        title: req.body.title,
        description: req.body.description,
      };
      db.push(todo);
      return res.status(201).send({
        success: 'true',
        message: 'Congratulations, you just added a todo. Check it out below',

        todo,
      });
    }

      updateTodo(req,res) {
        const id = parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;
        db.map((todo,index) => {
          if(todo.id === id) {
            todoFound = todo;
            itemIndex = index;
          }
        });

        if(!todoFound) {
          return res.status(404).send({
            success: 'false',
            message: 'sorry, todo was not found',
          });
        }
        if(!req.body.title) {
          return res.status(400).send({
            success: 'false',
            message: 'kindly pass in a title to your request',
          });
        }else if (!req.body.description) {
          return res.status(400).send({
            success: 'false',
            message: 'a description is required please...',
          });
        }

        const newTodo = {
          id: todoFound.id,
          title: req.body.title || todoFound.title,
          description: req.body.description || todoFound.description,
        };

        db.splice(itemIndex, 1, newTodo);

        return res.status(201).send({
          success: 'true',
          message: 'a new todo has been added successfully',
          newTodo,
        });
      }

      deleteTodo(req, res) {
        const id =parseInt(req.params.id, 10);
        let todoFound;
        let itemIndex;

        db.map((todo, index) => {
          if (todo.id ===id) {
            todoFound = todo;
            itemIndex = index;
          }
        });

        if (!todoFound) {
          return res.status(404).send({
            success: 'false',
            message: 'sorry, the todo was not found',
          });
        }

        db.splice(itemIndex, 1);

        return res.status(200).send({
          success: 'true',
          message: 'todo was successfully deleted',
        });
      }
}

const todoController = new todosController();
export default todoController;
