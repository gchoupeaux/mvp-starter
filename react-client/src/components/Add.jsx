import React from 'react';
import $ from 'jquery';

const Add = (props) => (
  <div id={"add"}>
    <input type="text" name="Description" placeholder="What else to add?"
    onKeyUp={(e) => {if (e.keyCode === 13) props.add($('input').val())}}></input>
    <button id={"addbtn"} onClick={() => {props.add($('input').val(), )}}>Add</button>
  </div>
)

export default Add;
                    