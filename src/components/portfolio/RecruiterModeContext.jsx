import React, { createContext, useContext, useState, useEffect } from 'react';

const RecruiterModeContext = createContext();

export function RecruiterModeProvider({ children }) {
  const [recruiterMode, setRecruiterMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('recruiter-mode', recruiterMode);
  }, [recruiterMode]);

  const toggle = () => setRecruiterMode((p) => !p);

  return (
    <RecruiterModeContext.Provider value={{ recruiterMode, toggle }}>
      {children}
    </RecruiterModeContext.Provider>
  );
}

export function useRecruiterMode() {
  return useContext(RecruiterModeContext);
}