import { useState } from 'react'
import './SearchBar.css';

export default function SearchBar({ placeholder = "Enter Text", handleSearch }) {
    const [search, setSearch] = useState('');

    function handleChange(element) {
        setSearch(element.target.value)
    }

    return <form id="search-bar" onSubmit={() => handleSearch(search)}>
        <input type="text" placeholder={placeholder} id="search-input" name="search" value={search} onChange={handleChange}>
        </input>
        <button id="search-button" type='button' onClick={() => handleSearch(search)}>
            <img src="/button_icons/Search_Icon.png" alt="Search" />
        </button>
    </form>
}