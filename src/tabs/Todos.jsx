import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    query: '',
    todos: [],
  };
  handleSubmit = userInput => {
    this.addTodo(userInput);
  };
  addTodo = text => {
    const todo = { id: nanoid(), text };
    this.setState(prev => ({
      todos: [...prev.todos, todo],
    }));
  };

  deletetodo = idTodo => {
    this.setState(prev => ({
      todos: prev.todos.filter(({ id }) => id !== idTodo),
    }));
  };

  render() {
    const { todos } = this.state;
    return (
      <>
        <SearchForm handleSubmit={this.handleSubmit} />;
        <Grid>
          {todos.map(({ id, text }, index) => (
            <GridItem key={id}>
              <Todo
                id={id}
                text={text}
                index={index + 1}
                deletetodo={this.deletetodo}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
