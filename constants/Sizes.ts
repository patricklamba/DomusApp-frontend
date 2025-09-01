// constants/Sizes.ts
// Dimensions et espacements basés sur votre design

export const Sizes = {
  // Espacements
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
    xxxl: 60,
  },
  
  // Rayons de bordure
  radius: {
    sm: 8,
    md: 12,     // Standard pour inputs/boutons (comme dans votre app)
    lg: 16,
    xl: 20,
    round: 50,
  },
  
  // Hauteurs des composants
  input: {
    height: 60,           // Hauteur standard inputs (comme votre app)
    minHeight: 50,
  },
  
  button: {
    height: 60,           // Hauteur standard boutons (comme votre app)
    minHeight: 50,
  },
  
  // Tailles des emojis (caractéristique de votre design)
  emoji: {
    small: 24,
    medium: 40,           // Pour les cards de rôle
    large: 60,            // Pour les headers d'écrans
    xlarge: 80,           // Pour la page d'accueil
  },
  
  // Headers
  header: {
    height: 60,
    paddingTop: 60,       // Padding top des écrans
  },
  
  // Dimensions des écrans
  screen: {
    paddingHorizontal: 24, // Padding horizontal standard
    paddingVertical: 20,
  },
  
  // Tailles des icônes
  icon: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40,
  }
} as const;