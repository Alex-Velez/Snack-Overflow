import {use, useState} from "react"

export default function LoginForm({handleLogin, error, changeModal}){
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
  const badUser = error === "BAD_USER_LOOKUP";
  const errMsg = badUser ? "Email or password not found" : "An unknown error has occurred";
  
  return <form onSubmit={submit} className="auth-form">
    <label>
      <input type="email" name="email" value={data.email} onChange={handleChange} placeholder="Email" className={badUser  ? 'error' : ''}></input>
    </label>
    <label>
      <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" className={badUser ? 'error' : ''}></input>
    </label>
    <p className="error-message">{error ? errMsg : ""}</p>
    <button type="submit">Log In</button>
    <div className="auth-form-footer">
      <p>Don't have an account?</p>
      <button type="button" onClick={() => changeModal("signup")}>Sign Up</button>
    </div>
  </form>
}