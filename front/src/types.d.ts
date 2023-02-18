export interface ListItem {
  title:string;
  position:number;
  id:string;
}

export interface ListProps{
  item:ListItem
}

export interface DragAndDropProps{
  prevPos:number; 
  newPos:number;
}

export interface ListsState {
  lists:Array<ListItem>;
}
