import { useState } from "react";

const errors = {
  "NOMATCH" : "Passwords must match",
  "EMAIL_IN_USE" : "This email is already in use",
  "INVALID_EMAIL" : "This email is invalid",
  "INVALID_PASSWORD" : "Password must be between 8 and 15 characters and may not contain spaces"
}

export default function SignupForm({handleSignup, error, changeModal}){
  const [data, setData] = useState({
    first: "",
    last: "",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const errorMsg = errors[error] ?? "An unknown error has occurred";

  function handleChange(element){
    setData(prev => ({...prev, [element.target.name]: element.target.value}))
  }

  async function submit(element){
    element.preventDefault();
    console.log(data);
    await handleSignup(data);
  }
  
  return <form onSubmit={submit} className="auth-form">
    <div className="name-inputs">
      <label>
        <input type="text" name="first" value={data.first} onChange={handleChange} placeholder="First Name"></input>
      </label>
      <label>
        <input type="text" name="last" value={data.last} onChange={handleChange} placeholder="Last Name"></input>
      </label>
    </div>
    <label>
      <input type="text" name="email" value={data.email} onChange={handleChange} placeholder="Email" className={error === 'EMAIL_IN_USE'? 'error' : ''}></input>
    </label>
    <label>
      <input type="password" name="password" value={data.password} onChange={handleChange} placeholder="Password" className={error === 'NOMATCH' ? 'error' : ''}></input>
    </label>
    <label>
      <input type="password" name="confirmPassword" value={data.confirmPassword} onChange={handleChange} placeholder="Confirm Password" className={error === 'NOMATCH' ? 'error' : ''}></input>
    </label>
    <p className="error-message">{error ? errorMsg : " "}</p>
    <button type="submit">Sign Up</button>
    <div className="auth-form-footer">
      <p>Already have an account?</p>
      <button type="button" onClick={() => changeModal("login")}>Log in</button>
    </div>
  </form>
}