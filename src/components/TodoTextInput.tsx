import * as React from 'react'
import classnames from 'classnames'

export interface IProps {
  text?: string
  newTodo?: any
  onSave?: any
  editing?: any
  placeholder?: any
}

export default class TodoTextInput extends React.Component<IProps, any> {
  state = {
    text: this.props.text || ''
  }

  handleSubmit = (e: any) => {
    const text = e.target.value.trim()
    if (e.which === 13) {
      this.props.onSave(text)
      if (this.props.newTodo) {
        this.setState({ text: '' })
      }
    }
  }

  handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value })
  }

  handleBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!this.props.newTodo) {
      this.props.onSave(e.target.value)
    }
  }

  render() {
    return (
      <input
        className={classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus={true}
        value={this.state.text}
        onBlur={this.handleBlur}
        onChange={this.handleChange}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
