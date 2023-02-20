import type { Folder, List } from "src/types"
import type { DragEvent } from "react"

import { useRef, useState, useEffect } from "react"
import styles from "@components/list.module.css"

import { replacePositions, removeList} from "@redux/features/folder.actions"

import ArchiveHandler from "@components/archive.handler"

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

export default function List({ item:listItem}:Folder.Props){

  const { position, title }:List.Item = listItem;

  const parent = useRef<HTMLDivElement>(null);

  useEffect(()=>{
    if(parent.current != null){
      setBoundary(parent.current.getBoundingClientRect())
    }
  },[]);

  const [boundary, setBoundary] = useState({
    x:0,
    y:0,
    left:0,
    top:0
  });

  const onDragStart = (e:DragEvent<HTMLDivElement>)=>{
    e.dataTransfer.setData("position", String(position));
    e.dataTransfer.setDragImage(new Image(),0,0);
  }

  const onDrag = (e:DragEvent<HTMLDivElement>)=>{

    if(e.clientY == 0 || e.clientX == 0) return;
    e.currentTarget.style.top = `${e.clientY - boundary.y}px`;
    e.currentTarget.style.left = `${e.clientX - boundary.x}px`;

    e.currentTarget.classList.add(styles.onDragging);
  }

  const onDragEnd = (e:DragEvent<HTMLDivElement>)=>{
    e.currentTarget.style.top = `initial`;
    e.currentTarget.style.left = `initial`;
    
    e.currentTarget.classList.remove(styles.onDragging);
  }

  const onDrop = (e:DragEvent<HTMLDivElement>, pos:number)=>{
    e.preventDefault();

    replacePositions({
      prevPos:pos,
      newPos:Number(e.dataTransfer.getData("position"))
    });
  }

  const onDragLeave = (e:DragEvent<HTMLDivElement>)=>{
    e.currentTarget.classList.remove(styles.onOverDragging);
  }

  const onDragOver = (e:DragEvent<HTMLDivElement>)=>{
    e.preventDefault();
    if(e.currentTarget.classList.contains(styles.onDragging)) return;
    e.currentTarget.classList.add(styles.onOverDragging);
  }

  return(
    <div draggable {...{
      onDragStart,
      onDrop:(e)=>onDrop(e,position),
      onDragLeave,
      onDragEnd,
      onDragOver,
      onDrag
      }} className={styles.list} key={title} ref={parent}>

      <div className={styles.information}>
        <input defaultValue={title}/>
      </div>

      <div className={styles.content}>
      </div>

      <div className={styles.actions}>

        <ArchiveHandler {...{
          id:listItem.id
        }}/>
        <DeleteButton onClick={()=>removeList(listItem)}/>

      </div>
    </div>
  )
}
