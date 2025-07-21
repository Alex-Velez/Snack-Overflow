import { useState } from "react"

export default function Checkbox({handleChange, ...props}){
  const [isChecked, setChecked] = useState(false)
  
  function checkChange(){
    let update = !isChecked;
    setChecked(update);
    handleChange(update);
  }
  
  return <input type="checkbox" {...props} onChange={checkChange}/>
}