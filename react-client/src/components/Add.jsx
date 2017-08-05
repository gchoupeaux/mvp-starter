import React from 'react';
import $ from 'jquery';

const Add = (props) => (
  <div>
    Todo: <input type="text" name="Description"></input>
    <button onClick={() => {props.add($('input').val())}}>Add Todo</button>
  </div>
)

export default Add;
                    