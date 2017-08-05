import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    There are { props.todos.length } todos.
    { props.todos.map((todo, i) => <ListItem  key={i} 
                                              index={i} 
                                              todo={todo} 
                                              crossed={props.crossed}
                                              deleted={props.deleted}/>)}
  </div>
)

export default List;