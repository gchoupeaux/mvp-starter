import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import Add from './components/Add.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      todos: []
    }
  }

  add (description) {
    var todo = {username: 'Gui',
                description: description, 
                crossed: false,
                deleted: false,
                dateCreated: new Date(),
                dateCrossed: null,
                dateDeleted: null};

    $.post('/todo', todo, 
      function(data){
      console.log('posted: ', data);
    })
    .fail(function() {
      console.log('NOT posted');
    });
  }

  crossed (todo, index) {
    
    var app = this;
    var datas = this.state.todos;

    datas[index].crossed = !todo.crossed;
    if (todo.crossed){
      datas[index].dateCrossed = new Date();
    } else {
      datas[index].dateCrossed = null;
    }

    $.post('/todo/crossed', datas[index], 
      function(data){
      app.setState({
        todos: datas
      });
      console.log('posted: ', data);
    })
    .fail(function() {
      console.log('NOT posted');
    });
  }

  componentWillMount() {   

    var app = this;
 
    $.get('/todo', function(data){
      console.log('got: ', data);
      app.setState({
        todos: data
      })
    })
    .fail(function() {
      console.log('NOT got');
    });
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: '/items', 
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  render () {
    return (<div>
      <h1>To Do List</h1>
      <List todos={this.state.todos} crossed={this.crossed.bind(this)}/>
      <Add add={this.add.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));