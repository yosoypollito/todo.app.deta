import store from "@redux/store"

import type { ListItem, DragAndDropProps } from "src/types";

import { addList, sortLists, delList } from "@redux/slices/folder.slice";

export const createList = (value:string)=>store.dispatch((dispatch)=>{
  dispatch(addList(value))
});

export const changeListPosition = ({ prevPos, newPos }:DragAndDropProps)=>store.dispatch((dispatch,getState)=>{

  const state = getState().folder;
  const newList = [...state.childrens];

  const getListAndChangePos = ({ prevPos, newPos }:DragAndDropProps)=>{
    const listItem:ListItem = newList[prevPos];
    return {
      ...listItem,
      position:newPos
    }
  }

  const newListItemPos = getListAndChangePos({ prevPos, newPos });

  const prevListItemPos = getListAndChangePos({
    newPos:prevPos,
    prevPos:newPos
  });


  newList[prevPos] = newListItemPos;
  newList[newPos] = prevListItemPos;

  //for newlistitem and prevlistitem should send fetch to change the new positions using id;

  dispatch(sortLists(newList))
})


export const removeList = ({ position }:ListItem)=>store.dispatch((dispatch)=>{

  //Here goes all fetching data for delete in backend
  console.log(position)

  dispatch(delList(position))
})

