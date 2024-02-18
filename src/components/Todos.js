import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { GoPlus } from "react-icons/go";
import { addTodos } from "../redux/reducer";

const mapStateToProps = (state) => {
  return {
    todos: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (obj) => dispatch(addTodos(obj))
  };
};

const Todos = (props) => {
  const [todo, setTodo] = useState("");
  const inputRef = useRef(null);

  // Function to handle changes in the input field
  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  // Function to add a new todo
  const handleAddTodo = () => {
    if(todo.trim() === ""){
      // Show alert message if input is empty
      alert("Please Enter a Task!");
    }
    else{
        // Dispatch the addTodo action with the new todo
        props.addTodo({
          id: Math.floor(Math.random() * 1000),
          item: todo,
          completed: false,
        });
        setTodo("");  // Reset the input value after adding a todo
      }
  };

  // Function to handle Enter key press in the input field
  const handleInput=(e)=>{
    if (e.which === 13){
      //here 13 is key code for enter key
      handleAddTodo();
    }
  }

  // Effect to save updated todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(props.todos));
  }, [props.todos]);

  // Effect to focus on the input field when the component mounts
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div className="addTodos">

      {/* Input field for entering new todos */}
      <input
        type="text"
        onChange={(e) => handleChange(e)}
        onKeyPress={(e)=> handleInput(e)}
        value={todo}
        className="todo-input"
        ref={inputRef}
      />

      {/* Button to add a new todo */}
      <button
        className="add-btn"
        onClick={() => handleAddTodo()}
      >
        <GoPlus/>
      </button>
      <br/>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Todos);
