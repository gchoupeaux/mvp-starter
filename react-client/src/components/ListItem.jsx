import React from 'react';
import $ from 'jquery';

const ListItem = (props) => (
  <div>
  <span style={{textDecoration: props.todo.crossed ? 'line-through':'none', 
                display: props.todo.deleted ? 'none':'',
                cursor:'pointer'}} 
        onClick={() => {props.crossed(props.todo, props.index)}}>
    { props.todo.description }
  </span>
  <button style={{display: props.todo.deleted ? 'none':''}}
          onClick={() => {props.deleted(props.todo, props.index)}}>x</button>
  </div>
)

export default ListItem; 