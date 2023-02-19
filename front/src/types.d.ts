export interface ListItem {
  title:string;
  position:number;
  id:string;
}

export interface FolderProps{
  item:FolderItem
}

export interface DragAndDropProps{
  prevPos:number; 
  newPos:number;
}

export interface Folder{
  title:string;
  id:string;
  childrens:Array<ListItem>
}
