import * as React from 'react'
import TodoTextInput from './TodoTextInput'

interface IProps {
  addTodo: any
}

const Header: React.FC<IProps> = ({ addTodo }) => {
  const handleSave = (text: string) => {
    if (text.length !== 0) {
      addTodo(text)
    }
  }

  return (
    <header className="header">
      <h1>todos</h1>
      <TodoTextInput newTodo onSave={handleSave} placeholder="What needs to be done?" />
    </header>
  )
}
export default Header
