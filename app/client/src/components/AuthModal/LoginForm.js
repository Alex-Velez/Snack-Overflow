import {use, useState} from "react"

export default function LoginForm({handleLogin, error}){
  const [data, setData] = useState({
    email: "",
    password: ""
  })

  function handleChange(element){
    setData(prev => ({...prev, [element.target.name]: element.target.value}))
  }

  async function submit(element){
    element.preventDefault();
    console.log(data);
    await handleLogin(data);
  }
  
  return <form onSubmit={submit} className="auth-form">
    <label>
      <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" className={error ? 'error' : ''}></input>
    </label>
    <label>
      <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" className={error ? 'error' : ''}></input>
    </label>
    <p className="error-message">{error ? "Email or password not found" : ""}</p>
    <button type="submit">Log In</button>
  </form>
}