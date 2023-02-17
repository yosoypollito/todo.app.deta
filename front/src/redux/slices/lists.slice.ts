import { RootState } from "@redux/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { ListItem, ListsState, DraggingElement } from "src/types"

const initialState:ListsState = {
  lists:[
    {
      title:"1",
      position:0,
    },
    {
      title:"2",
      position:1,
    }
  ],
  dragging:{
    position:{
      x:0,
      y:0
    }
  }
}

const listsSlice = createSlice({
  name:"lists",
  initialState,
  reducers:{
    addList:(state, action: PayloadAction<string>) => {
      const newList = [...state.lists,{
        title:action.payload,
        position:state.lists.length
      }];

      state.lists = newList;
    },
    sortLists:(state, action: PayloadAction<Array<ListItem>>)=>{
      state.lists = action.payload.sort((a,b)=>a.position - b.position);
    },
    delList:(state, action: PayloadAction<number>)=>{
      state.lists.splice(action.payload, 1);
    },
    updateDragging:(state, action: PayloadAction<DraggingElement>)=>{
      state.dragging = action.payload;
    }
  }
})

export const selectLists = (state:RootState)=>state.lists.lists;

export const { addList, sortLists, delList, updateDragging } = listsSlice.actions;

export default listsSlice.reducer;
