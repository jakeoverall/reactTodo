/** @jsx React.DOM */
var people = [{
  name: "Jake"
},{
  name: "Tyler"
},{
  name: "Ean"
},{
  name: "Paul"
}]


var todoList = React.createClass({displayName: 'todoList',
  getInitialState: function(){
    return {
      data: [{
        task:"Wash Car",
        dueBy: "9-10-2014",
        assignedTo: "Ean"
      },{
        task:"Clean Room",
        dueBy: "9-11-2014",
        assignedTo: "Jake"
      },{
        task:"Feed Dog",
        dueBy: "9-11-2014",
        assignedTo: "Tyler"
      },{
        task:"re-write polls",
        dueBy: "9-13-2014",
        assignedTo: "Paul"
      }],
    }
  },
  addItem: function(item){
    console.log(item)
    this.state.data.push(item);
    this.setState({data: this.state.data});
  },
  removeItem: function(indice){
    this.state.data.splice(indice, 1);
    this.setState({data: this.state.data});
  },
  render: function () {
    var that = this;
    var items = this.state.data.map(function (task, i){
      return (
        item({data: task, indice: i, remove: that.removeItem})
       );
    });
    return (
      React.DOM.div({class: "todoList"}, 
      addItemForm({onAddItem: this.addItem}), 
        React.DOM.ul(null, 
          items
        )
      )
      );
  }
});

var item = React.createClass({displayName: 'item',
  render: function(){
    var that = this;
    return (
        React.DOM.li({class: "list-item"}, 
         this.props.data.task, " - ", this.props.data.assignedTo, " due: ", this.props.data.dueBy, 
         React.DOM.button({onClick: that.props.remove.bind(null, this.props.indice)}, "X")
        )
      );
  }
});

var addItemForm = React.createClass({displayName: 'addItemForm',
  handleSubmit: function(e){
    e.preventDefault();
    var task = this.refs.task.getDOMNode().value.trim();
    var person = this.refs.person.getDOMNode().value;
    var dueBy = new Date().toISOString();

    if(!task){
      return
    }
    this.props.onAddItem({task: task, assignedTo: person, dueBy: dueBy})
    this.refs.task.getDOMNode().value = ''
    this.refs.person.getDOMNode().value = '--- select  ---'
  },
  getInitialState: function(){
    return {data: people};
  },
  render: function(){
    var people = this.state.data.map(function(person){
      return (
        React.DOM.option(null, person)
      )
    })
    return (
      React.DOM.form(null, 
        React.DOM.input({ref: "task"}), 
        React.DOM.select({ref: "person"}, 
        React.DOM.option(null, "--- select  ---"), 
          people
        ), 
        React.DOM.button({onClick: this.handleSubmit}, "Add Item")
      )
      )
  }
})

React.renderComponent(
  todoList(null),
  document.getElementById('todoList')
);