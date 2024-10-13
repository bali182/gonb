import { FC, useState } from 'react'
import { NotesGrid } from '../controls/NotesGrid/NotesGrid'

export const PageBasics: FC = () => {
  const [notes, setNotes] = useState(() => ['C2', 'D2', 'E3', 'G4'])
  return (
    <div style={{ padding: 10 }}>
      <NotesGrid value={notes} onChange={setNotes} />
    </div>
  )
}
