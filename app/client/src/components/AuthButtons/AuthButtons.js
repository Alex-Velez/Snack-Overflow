import './AuthButtons.css'

export default function AuthButtons({ setModal }) {


    return <div className="auth-buttons">
        <div className='auth-buttons-upper'>
            <h1>
                Sign up now to shop and track your orders!
            </h1>
        </div>
        <div className='auth-buttons-lower'>
            <button className='signup-button' onClick={() => setModal("signup")}>
                Sign Up
            </button>
            <button className='login-button' onClick={() => setModal("login")}>
                Log In
            </button>
        </div>
    </div>
}