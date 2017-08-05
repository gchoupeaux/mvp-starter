import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (

  
  <table>
  <tbody className={"list"}>
    <tr>
      <th className = {'btn'} ></th>
      <th>Date Created</th>
      <th>Date Crossed</th> 
      <th>Description</th>
    </tr>
    { props.todos.map((todo, i) => <ListItem  key={i} 
                                              index={i} 
                                              todo={todo} 
                                              crossed={props.crossed}
                                              deleted={props.deleted}/>)}
  </tbody>
  </table>

)

export default List;


// <div>
//     There are { props.todos.length } todos.
//     { props.todos.map((todo, i) => <ListItem  key={i} 
//                                               index={i} 
//                                               todo={todo} 
//                                               crossed={props.crossed}
//                                               deleted={props.deleted}/>)}
//   </div>