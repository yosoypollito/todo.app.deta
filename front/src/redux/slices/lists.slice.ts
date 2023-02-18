import { RootState } from "@redux/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { ListItem, ListsState } from "src/types"

const initialState:ListsState = {
  lists:[
    {
      title:"1",
      position:0,
      id:"0"
    },
    {
      title:"2",
      position:1,
      id:"1"
    }
  ]
}

const listsSlice = createSlice({
  name:"lists",
  initialState,
  reducers:{
    addList:(state, action: PayloadAction<string>) => {
      const newList = [...state.lists,{
        title:action.payload,
        position:state.lists.length,
        id:state.lists.length.toString()
      }];

      state.lists = newList;
    },
    sortLists:(state, action: PayloadAction<Array<ListItem>>)=>{
      state.lists = action.payload.sort((a,b)=>a.position - b.position);
    },
    delList:(state, action: PayloadAction<number>)=>{
      state.lists.splice(action.payload, 1);
    }
  }
})

export const selectLists = (state:RootState)=>state.lists.lists;

export const { addList, sortLists, delList } = listsSlice.actions;

export default listsSlice.reducer;
