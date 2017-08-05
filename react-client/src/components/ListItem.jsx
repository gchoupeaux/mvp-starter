import React from 'react';
import $ from 'jquery';

const ListItem = (props) => (
  <tr style={{display: props.todo.deleted ? 'none':''}}>
    <td className = {'btn'}>
      <button onClick={() => {props.deleted(props.todo, props.index)}}>x</button>
    </td>
    <td>{ props.todo.dateCreated.slice(0,25) }</td>
    <td>{ props.todo.dateCrossed.slice(0,25) }</td>
    <td className={'description'} style={{textDecoration: props.todo.crossed ? 'line-through':'none',
                                        color: props.todo.crossed ? 'black':'white'}} 
        onClick={() => {props.crossed(props.todo, props.index)}}>{ props.todo.description }</td>
    
  </tr>
)

export default ListItem; 



// <div>
//   <span style={{textDecoration: props.todo.crossed ? 'line-through':'none', 
//                 display: props.todo.deleted ? 'none':'',
//                 cursor:'pointer'}} 
//         onClick={() => {props.crossed(props.todo, props.index)}}>
//     { props.todo.description }
//   </span>
//   <button style={{display: props.todo.deleted ? 'none':''}} 
//           onClick={() => {props.deleted(props.todo, props.index)}}>x</button>
//   </div>
//() => {props.todo.dateCrossed.length?props.todo.dateCrossed.slice(0,25):'                       '}
//, cursor:'pointer'
