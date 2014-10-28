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


var todoList = React.createClass({
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
        <item  data={task} indice={i} remove={that.removeItem}/>
       );
    });
    return (
      <div class="todoList">
      <addItemForm onAddItem={this.addItem}/>
        <ul>
          {items}
        </ul>
      </div>
      );
  }
});

var item = React.createClass({
  render: function(){
    var that = this;
    return (
        <li class="list-item">
         {this.props.data.task} - {this.props.data.assignedTo} due: {this.props.data.dueBy}
         <button onClick={that.props.remove.bind(null, this.props.indice)}>X</button>
        </li>
      );
  }
});

var addItemForm = React.createClass({
  handleSubmit: function(e){
    e.preventDefault();
    var task = this.refs.task.getDOMNode().value.trim();
    var person = this.refs.person.getDOMNode().value;
    var dueBy = new Date().toISOString();

    if(!task || person){
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
        <option>{person}</option>
      )
    })
    return (
      <form>
        <input ref="task"/>
        <select ref="person">
        <option>--- select  ---</option>
          {people}
        </select>
        <button onClick={this.handleSubmit}>Add Item</button>
      </form>
      )
  }
})

React.renderComponent(
  <todoList/>,
  document.getElementById('todoList')
);