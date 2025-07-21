import Header from "../Header/Header.js"
import './Page.css'

export default function Page({activeUser, children}){
  return <div className='page-body'>
    <Header user={activeUser}/>
    <section className='main-content'>
      {children}
    </section>
  </div>
}