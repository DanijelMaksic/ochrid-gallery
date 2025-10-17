'use client';

import { createContext, useContext, useState } from 'react';

const NoteErrorContext = createContext();

function NoteErrorProvider({ children }) {
   const [noteError, setNoteError] = useState(null);

   return (
      <NoteErrorContext.Provider value={{ noteError, setNoteError }}>
         {children}
      </NoteErrorContext.Provider>
   );
}

function useNoteError() {
   const context = useContext(NoteErrorContext);
   if (context === undefined)
      throw new Error(
         'NoteErrorContext was used outside of NoteErrorContext.Provider'
      );
   return context;
}

export { NoteErrorProvider, useNoteError };
