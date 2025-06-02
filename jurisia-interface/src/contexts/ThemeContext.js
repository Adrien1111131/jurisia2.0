import React, { createContext, useState, useEffect } from 'react';

// Création du contexte de thème
export const ThemeContext = createContext();

// Fournisseur du contexte de thème
export const ThemeProvider = ({ children }) => {
  // Récupérer le thème depuis le localStorage ou utiliser 'dark' par défaut
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('jurisia-theme');
    return savedTheme || 'dark';
  });

  // Mettre à jour le thème dans le localStorage et appliquer la classe au body
  useEffect(() => {
    localStorage.setItem('jurisia-theme', theme);
    document.body.className = theme;
  }, [theme]);

  // Fonction pour basculer entre les thèmes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
