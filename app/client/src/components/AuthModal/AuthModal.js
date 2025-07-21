import './AuthModal.css';
import './AuthForm.css';
import ReactDOM from 'react-dom'
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

export default function AuthModal({type, handleLogin, handleSignUp, error}){
  
  
  const innerContent = () => {
    if(type === "login"){
      return <LoginForm handleLogin={handleLogin} error={error}/>
    }
    else if(type === "signup"){
      return <SignupForm handleSignup={handleSignUp} error={error}/>
    }
    else return <></>
  }
  
  return ((type && (type === "login" || type === "signup")) ? ReactDOM.createPortal(<div className='auth-modal'>
    <div className='auth-modal-content'>
      {innerContent()}
    </div>
  </div>,
  document.body) : null)
}