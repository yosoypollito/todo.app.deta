import type { Folder, List } from "src/types"
import type { DragEvent } from "react"

import { useRef, useState, useEffect } from "react"
import styles from "@components/list.module.css"

import { replacePositions, removeList, Childrens} from "@redux/features/list.actions"

import ArchiveHandler from "@components/archive.handler"
import AddChildren from "@components/add.children"
import DeleteHandler from "@components/delete.handler"

export default function List({ item:listItem}:Folder.Props){

  const { position, title, childrens }:List.Item = listItem;

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

  //Drag And Drop functions
  const DnD = {
    over:(e:DragEvent<HTMLDivElement>)=>{
      e.preventDefault();

      if(e.currentTarget.classList.contains(styles.onDragging)) return;
      e.currentTarget.classList.add(styles.onOverDragging);
    },
    start:(e:DragEvent<HTMLDivElement>)=>{
      e.dataTransfer.setData("position", String(position));
      e.dataTransfer.setDragImage(new Image(),0,0);
    },
    drag:(e:DragEvent<HTMLDivElement>)=>{

      if(e.clientY == 0 || e.clientX == 0) return;
      e.currentTarget.style.top = `${e.clientY - boundary.y + 1}px`;
      e.currentTarget.style.left = `${e.clientX - boundary.x + 1}px`;
      e.currentTarget.classList.add(styles.onDragging);
    },
    end:(e:DragEvent<HTMLDivElement>)=>{
      e.currentTarget.style.top = `initial`;
      e.currentTarget.style.left = `initial`;

      e.currentTarget.classList.remove(styles.onDragging);
    },
    drop:(e:DragEvent<HTMLDivElement>, pos:number)=>{
      e.preventDefault();

      replacePositions({
        prevPos:pos,
        newPos:Number(e.dataTransfer.getData("position"))
      });
    },
    leave:(e:DragEvent<HTMLDivElement>)=>{
      e.currentTarget.classList.remove(styles.onOverDragging);
    },

  }

  return(
    <div draggable {...{
      onDragStart:DnD.start,
      onDrop:(e)=>DnD.drop(e,position),
      onDragLeave:DnD.leave,
      onDragEnd:DnD.end,
      onDragOver:DnD.over,
      onDrag:DnD.drag
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
        <DeleteHandler onClick={()=>removeList(listItem)}/>
        <AddChildren onClick={()=>Childrens.add(listItem)}/>

      </div>
    </div>
  )
}
