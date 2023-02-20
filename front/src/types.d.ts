export interface ArchiveHandlerProps{
  id:string;
}

export namespace List{

  export type Title = string;
  export type Position = number;
  export type ID = string;

  export interface Item{
    title:Title;
    position:Position;
    id:ID;
  }

  export namespace Props{

    export interface DragAndDrop{
      prevPos:number;
      newPos:number;
    }

  }

  export namespace Actions{
    export type Create = (value:Title)=>void;
    export type Archive = (id:ID)=>void;
    export type Remove = (list:Item)=>void;

    export type ReplacePositions = ({ prevPos, newPos }:Props.DragAndDrop)=>void;
    export type GetListAndChangePosition = ({ prevPos, newPos }:Props.DragAndDrop)=>Item;
  }

}

export namespace Folder{

  interface Props{
    item:List.Item
  }

  interface Item{
    title:string;
    id:string;
    childrens:Array<List.Item>
  }
}
