export interface ListItem {
  title:string;
  position:number;
}

export interface ListProps{
  item:ListItem
}

export interface ListsState {
  lists:Array<ListItem>
}

export interface DragAndDropProps{
  prevPos:number; 
  newPos:number;
}
