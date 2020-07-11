import React from 'react';
import './Item.css'
const todoItem = (props) => {
    return (
      <div className="todo">
        <div style={{
          display: props.completed ? "block" : "none"
        }}
        className="todo_completed"></div>
        <div className="todo_check">
          <input type="radio" onClick={props.clickCheck} />
          {/* <i className="fa fa-check"></i> */}
        </div>
        <div className="todo_item">{props.content}</div>
        <div className="todo_del" onClick={props.clickDel}>
          <i className="fa fa-minus-circle"></i>
        </div>
      </div>
    );
}

export default todoItem