// constants/Colors.ts
// Palette de couleurs basée sur votre ancienne application

export const Colors = {
  // Couleurs principales
  primary: '#3498db',      // Bleu principal (boutons login, liens)
  secondary: '#2ecc71',    // Vert (boutons register, success)
  
  // Couleurs de fond
  background: '#FFFFFF',   // Fond principal
  surface: '#F5F5F5',     // Fond inputs, cards
  overlay: 'rgba(0, 0, 0, 0.6)', // Overlay image background
  
  // Texte
  text: {
    primary: '#333333',    // Texte principal
    secondary: '#666666',  // Texte secondaire
    placeholder: '#A0A0A0', // Placeholder inputs
    white: '#FFFFFF',      // Texte sur fond sombre
  },
  
  // États
  disabled: {
    primary: '#B0C4DE',    // Bouton bleu désactivé
    secondary: '#A5D6A7',  // Bouton vert désactivé
  },
  
  // Feedback
  success: '#2ecc71',
  error: '#e74c3c',
  warning: '#f39c12',
  info: '#3498db',
  
  // Borders et sélections
  border: {
    light: '#E1E1E1',
    selected: '#3498db',
    focus: '#E1F5FE',
  },
  
  // Angola specific (pour les futures features locales)
  angola: {
    red: '#FF0000',        // Couleur drapeau
    black: '#000000',      // Couleur drapeau
    yellow: '#FFFF00',     // Couleur drapeau
  }
} as const;

export type ColorValue = string;