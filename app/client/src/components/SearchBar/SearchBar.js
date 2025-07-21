import './SearchBar.css'

export default function SearchBar({placeholder="Enter Text"}){
  return <div id="search-bar">
    <input type="text" placeholder={placeholder} id="search-input">
    </input>
    <button id="search-button">
      <img src="/button_icons/Search_Icon.png" alt="Search" />
    </button>
  </div>
}