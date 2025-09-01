// constants/Typography.ts
// Styles de typographie basés sur votre design

export const Typography = {
  // Tailles de police
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    xxxl: 40,
  },
  
  // Poids des polices (comme dans votre app)
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,  // Pour les labels
    bold: '700' as const,      // Pour les boutons
    extrabold: '800' as const, // Pour les titres principaux
  },
  
  // Hauteurs de ligne
  lineHeight: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
  }
} as const;

// Styles composés (basés sur votre app)
export const TextStyles = {
  // Titres d'écrans (comme "Log In", "Create Account")
  screenTitle: {
    fontSize: Typography.fontSize.xxl,
    fontWeight: Typography.fontWeight.extrabold,
    lineHeight: Typography.lineHeight.tight,
  },
  
  // Sous-titres d'écrans
  screenSubtitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.lineHeight.normal,
  },
  
  // Titre principal (page d'accueil)
  heroTitle: {
    fontSize: Typography.fontSize.xxxl,
    fontWeight: Typography.fontWeight.extrabold,
    lineHeight: Typography.lineHeight.tight,
  },
  
  // Labels de formulaire
  label: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  // Texte des boutons
  button: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
  },
  
  // Texte des inputs
  input: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.normal,
  },
  
  // Liens
  link: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  // Corps de texte
  body: {
    fontSize: Typography.fontSize.md,
    fontWeight: Typography.fontWeight.normal,
    lineHeight: Typography.lineHeight.normal,
  },
  
  // Texte des cards de rôle
  roleTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
  },
  
  roleDescription: {
    fontSize: Typography.fontSize.sm,
    fontWeight: Typography.fontWeight.normal,
  }
} as const;