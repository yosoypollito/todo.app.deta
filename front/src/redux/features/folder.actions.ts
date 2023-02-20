import store from "@redux/store"

import type { List } from "src/types";

import { addList, sortLists, delList } from "@redux/slices/folder.slice";

export const createList:List.Actions.Create = (value)=>store.dispatch((dispatch)=>{
  dispatch(addList(value))
});

export const replacePositions:List.Actions.ReplacePositions = ({ prevPos, newPos })=>store.dispatch((dispatch,getState)=>{

  const state = getState().folder;
  const newList = [...state.childrens];

  const getListAndChangePos:List.Actions.GetListAndChangePosition = ({ prevPos, newPos })=>{
    const listItem:List.Item = newList[prevPos];
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


export const removeList:List.Actions.Remove = (list)=>store.dispatch((dispatch)=>{

  //Here goes all fetching data for delete in backend
  console.log(list.position)

  dispatch(delList(list.position))
});

export const archiveList:List.Actions.Archive = (id)=>store.dispatch((dispatch,getState)=>{
  //TODO send to archive folder and re-fetch current folder or del list item.
});
