import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";

function App() {
  // useStateの型指定はジェネリクスで！
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  // オブジェクトの型宣言（interfaceとどちらが良いか。。）
  type Todo = {
    inputValue: string;
    id: number;
    checked: boolean;
  };

  // 引数の型を推論して⇩のように！
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // ⇩もvscodeの型推論を使用
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    // ページのリロードを防止
    e.preventDefault();
    const newTodo: Todo = {
      id: todos.length,
      inputValue: inputValue,
      checked: false,
    };

    setTodos((prevTodos) => {
      return [newTodo, ...todos];
    });
    setInputValue("");
  };

  const handleEdit = (id: number, inputValue: string) => {
    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleChecked = (id: number, checked: boolean) => {
    const newTodos: Todo[] = todos.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <h2>Todoリスト with TypeScript</h2>
          <input
            type="text"
            onChange={(e) => handleChange(e)}
            className="inputText"
          />
          <input type="submit" value="作成" className="submitButton" />
        </form>
        <ul className="todoList">
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.inputValue}
                onChange={(e) => handleEdit(todo.id, e.target.value)}
                className="inputText"
                disabled={todo.checked}
              />
              <input
                type="checkbox"
                value={todo.inputValue}
                onChange={() => handleChecked(todo.id, todo.checked)}
              />
              <button onClick={() => handleDelete(todo.id)}>消</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
