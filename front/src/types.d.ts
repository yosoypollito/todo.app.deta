export interface ListItem {
  title:string;
  position:number;
}

export interface ListProps{
  item:ListItem
}



export interface DragAndDropProps{
  prevPos:number; 
  newPos:number;
}

export interface DraggingElement{
  position:{
    x:number;
    y:number;
  }
}

export interface ListsState {
  lists:Array<ListItem>;
  dragging:DraggingElement
}
