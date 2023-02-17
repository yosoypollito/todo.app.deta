import panel from "@pages/panel.module.css"

import New from "@components/new.button"
import Folders from "@components/folders"
import List from "@components/list"

import { useAppSelector } from "@redux/hooks"

export default function Panel(){

  const { lists } = useAppSelector(state=>state.lists);

  return(
    <div className={panel.container}>

      <div className={panel.actions}>
        <Folders/>
        <New/>
      </div>

      <div className={panel.watcher}>
        {lists.map((item,i)=><List {...{
          item,
          key:i,
          position:i
          }}/>)}
      </div>

    </div>
  )
}
