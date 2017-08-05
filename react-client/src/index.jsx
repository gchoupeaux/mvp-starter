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

  add (description, e) {

    // can't add an allready existing todo
    if (!this.state.todos.some(todo => todo.description === description)){
      var todo = {username: 'Gui',
                  description: description, 
                  crossed: false,
                  deleted: false,
                  dateCreated: new Date().toString(),
                  dateCrossed: '                        ',
                  dateDeleted: '                        '};
      
      var app = this;
      var datas = this.state.todos;

      datas.push(todo);

      $.post('/todo', todo, 
        function(data){
        app.setState({
          todos: datas
        });
        console.log('posted: ', data);
      })
      .fail(function() {
        console.log('NOT posted');
      });
    } else {
      alert('This todo allready exists.')
    }
  }

  crossed (todo, index) {
    
    var app = this;
    var datas = this.state.todos;

    datas[index].crossed = !todo.crossed;
    if (todo.crossed){
      datas[index].dateCrossed = new Date().toString();
    } else {
      datas[index].dateCrossed = '                        ';
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

  deleted (todo, index) {

    // can't delete if not crossed
    if (todo.crossed){
      var app = this;
      var datas = this.state.todos;

      //datas[index].deleted = true;
      //datas[index].dateDeleted = new Date().toString();

      $.post('/todo/deleted', datas[index], 
        function(data){
        datas.splice(index,1);
        app.setState({
          todos: datas
        });
        console.log('posted: ', data);
      })
      .fail(function() {
        console.log('NOT posted');
      });
    } else {
      alert('Must be crossed before deletion.')
    }
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
      <h4>Hi Gui! You have { this.state.todos.length } todos.</h4>
      <Add add={this.add.bind(this)}/>
      <List todos={this.state.todos} crossed={this.crossed.bind(this)} deleted={this.deleted.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));