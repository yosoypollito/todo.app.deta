import styles from "@components/list.module.css"

import type { ListProps, ListItem } from "src/types"
import type { DragEvent } from "react"


const DeleteButton = (props:React.HTMLAttributes<HTMLButtonElement>)=>{
  return (
    <button {...{
      ...props
      }}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.25" fill="none">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <line x1="4" y1="7" x2="20" y2="7" />
        <line x1="10" y1="11" x2="10" y2="17" />
        <line x1="14" y1="11" x2="14" y2="17" />
        <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
        <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
      </svg>
    </button>
  )
}

const ArchiveHandler = ()=>(
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.25" fill="none">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <rect x="3" y="4" width="18" height="4" rx="2" />
      <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
      <line x1="10" y1="12" x2="14" y2="12" />
    </svg>
  </button>
)

import { changeListPosition, removeList} from "@redux/features/lists.actions"

import { useState } from "react"

export default function List({ item:listItem}:ListProps){

  const { position, title }:ListItem = listItem;

  const [dragging, setDragging] = useState(false);

  const onDragStart = (e:DragEvent<HTMLDivElement>)=>{
    e.dataTransfer.setData("position", String(position));
  }

  const onDragOver = (e:DragEvent<HTMLDivElement>)=>{
    e.preventDefault();
    console.log(e.target);
    console.log(e.currentTarget);
  }

  const onDrop = (e:DragEvent<HTMLDivElement>, pos:number)=>{
    e.preventDefault();

    changeListPosition({
      prevPos:pos,
      newPos:Number(e.dataTransfer.getData("position"))
    })

  }

  return(
    <div draggable onDragStart={onDragStart} onDrop={(e)=>onDrop(e,position)} onDragOver={onDragOver} className={styles.list} key={title}>

      <div className={styles.information}>
        <input defaultValue={title}/>
      </div>

      <div className={styles.content}>
      </div>

      <div className={styles.actions}>

        <ArchiveHandler/>
        <DeleteButton onClick={()=>removeList({
          position
        })}/>

      </div>
    </div>
  )
}