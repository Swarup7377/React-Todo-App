import React, { useRef } from "react";
import { AiFillEdit } from "react-icons/ai";
import { IoCheckmarkDoneSharp, IoClose } from "react-icons/io5";

const TodoItem = (props) => {
  const { item, updateTodo } = props;

  const inputRef = useRef(true);

  // Function to enable editing mode for the todo item
  const changeFocus = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  // Function to update the todo item when Enter key is pressed
  const update = (id, value, e) => {
    if (e.which === 13) {
      //here 13 is key code for enter key
      updateTodo({ id, item: value });
      inputRef.current.disabled = true;
    }
  };

  return (
    <li key={item.id} className="card">

      {/* Textarea for displaying and editing the todo item */}
      <textarea
        ref={inputRef}
        disabled={inputRef}
        defaultValue={item.item}
        onKeyPress={(e) => update(item.id, inputRef.current.value, e)}
      />
      <div className="btns">

        {/* Buttons for editing, completing, and removing the todo item */}
        <button onClick={() => changeFocus()}>
          <AiFillEdit />{" "}
        </button>

        {/* Button to mark the todo item as completed */}
        {item.completed === false && (
          <button 
          style={{color:"green"}}
          onClick={() => props.completeTodo(item.id)}>
            <IoCheckmarkDoneSharp />
          </button>
        )}

        {/* Button to remove the todo item */}
        <button 
        style={{color:"red"}}
        onClick={() => props.removeTodo(item.id)}>
          {" "}
          <IoClose />
        </button>{" "}
      </div>
      
      {/* Display 'Done' if the todo item is completed */}
      {item.completed && <span className="completed">Done</span>}
    </li>
  );
};

export default TodoItem;
