import React, { useState } from 'react'
import c from './SearchBar.module.css'
import IconButton from "../ui/IconButton";
import {BsSearch} from 'react-icons/bs';

const SearchBar = (props) => {
  const [typed, setTyped] = useState('')
  
  function onSearch(e){
    e.preventDefault()
    props.onSubmit(typed)
    setTyped('')
  }
  return (
    <form className={`${c.form} ${props.className}`} onSubmit={onSearch}>
      <input type="text" placeholder={props.placeholder} className={props.inputClass} value={typed} onChange={(e)=>setTyped(e.target.value)}/>
      <IconButton><BsSearch /></IconButton>
    </form>
  )
}

export default SearchBar
