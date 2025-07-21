import './IconButton.css'
import { Link } from 'react-router-dom'

export default function IconButton({children, size, link, ...props}){
  let style = {
    "width": `${size}px`,
    "aspectRatio": "1/1"
  }
  
  return (link ? 
  <Link to={link} {...props} className='icon-button' style={style}>
    {children}
  </Link>
  :
  <button {...props} className='icon-button' style={style}>
    {children}
  </button>)
}