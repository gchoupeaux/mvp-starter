import React from 'react';
import $ from 'jquery';

const ListItem = (props) => (
  <div>
  <div style={{textDecoration: props.todo.crossed ? 'line-through':'none', cursor:'pointer'}} onClick={() => {props.crossed(props.todo, props.index)}}>
    { props.todo.description }
  
  </div>
  <button>Delete</button>
  </div>
)

export default ListItem;