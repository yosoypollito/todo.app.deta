const FoldersHandler = ()=>(
  <button>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.25" fill="none">
      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
      <path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" />
      <path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />
    </svg>
  </button>
)

const ArchiveHandler = ()=>(
  <button>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth="1.25" fill="none">
  <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
  <rect x="3" y="4" width="18" height="4" rx="2" />
  <path d="M5 8v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-10" />
  <line x1="10" y1="12" x2="14" y2="12" />
</svg>
  </button>
)

import styles from "@components/folders.module.css"

export default function Folders(){

  return(
    <div className={styles.folders}>
      <FoldersHandler/>
      <ArchiveHandler/>
    </div>
  )
}
