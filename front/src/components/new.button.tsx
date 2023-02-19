import styles from "@components/new.button.module.css"

import { useRef, useState } from "react";

import { createList } from "@redux/features/folder.actions";

export default function New(){

  const inputRef = useRef<HTMLInputElement>(null);

  const [inputState, setInputState] = useState({
    focus:false,
    value:""
  })

  const updateState = (newState:{
    focus?:boolean;
    value?:string;
  })=>setInputState({
    ...inputState,
    ...newState
  })

  const clearInput = ()=>updateState({
    value:""
  })

  const valueChange = (e:React.ChangeEvent<HTMLInputElement>)=>updateState({
    value:e.target.value
  })

  const focusInput = ()=>{
    inputRef && inputRef.current?.focus();
    setInputState({
      ...inputState,
      focus:true
    });
  };

  const noFocus = ()=>updateState({
    focus:false
  });

  const newList = (e:React.KeyboardEvent<HTMLInputElement>)=>{
    if(e.key != "Enter" || !inputState.focus || inputState.value == "") return;

    createList(inputState.value)
    clearInput();
  }

  return(
    <div className={styles.new}>
      <input ref={inputRef} onBlur={noFocus} onKeyDown={newList} onChange={valueChange} value={inputState.value}/>
      <button onClick={focusInput} title="New" className={styles.button__new}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.25" fill="none">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
    </div>
  )
}
