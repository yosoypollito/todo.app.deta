import { RootState } from "@redux/store"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

import type { Folder, List } from "src/types"

const initialState:Folder.Item = {
  title:"main",
  id:"main",
  childrens:[{
    title:"1",
    position:0,
    id:"0"
  },
  {
    title:"2",
    position:1,
    id:"1"
  }]
}

const folderSlice = createSlice({
  name:"Folder",
  initialState,
  reducers:{
    addList:(state, action: PayloadAction<string>) => {
      const newList = [...state.childrens,{
        title:action.payload,
        position:state.childrens.length,
        id:state.childrens.length.toString()
      }];

      state.childrens = newList;
    },
    sortLists:(state, action: PayloadAction<Array<List.Item>>)=>{
      state.childrens = action.payload.sort((a,b)=>a.position - b.position);
    },
    delList:(state, action: PayloadAction<number>)=>{
      state.childrens.splice(action.payload, 1);
    }
  }
})

export const selectCurrentFolder = (state:RootState)=>state.folder;

export const { addList, sortLists, delList } = folderSlice.actions;

export default folderSlice.reducer;
