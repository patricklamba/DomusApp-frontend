// components/ui/Button.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { TextStyles } from '@/constants/Typography';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  emoji?: string; // Pour ajouter des emojis comme dans votre design
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style,
  textStyle,
  emoji,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      height: size === 'small' ? 50 : size === 'large' ? 70 : Sizes.button.height,
      borderRadius: Sizes.radius.md,
      justifyContent: 'center',
      alignItems: 'center',
      opacity: disabled || loading ? 0.6 : 1,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.disabled.primary : Colors.primary,
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: disabled ? Colors.disabled.secondary : Colors.secondary,
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: disabled ? Colors.disabled.primary : Colors.primary,
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      default:
        return baseStyle;
    }
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      ...TextStyles.button,
      fontSize: size === 'small' ? 16 : size === 'large' ? 20 : TextStyles.button.fontSize,
    };

    switch (variant) {
      case 'primary':
      case 'secondary':
        return {
          ...baseStyle,
          color: Colors.text.white,
        };
      case 'outline':
      case 'ghost':
        return {
          ...baseStyle,
          color: disabled ? Colors.disabled.primary : Colors.primary,
        };
      default:
        return baseStyle;
    }
  };

  const displayTitle = emoji ? `${emoji} ${title}` : title;
  const buttonText = loading ? 'Loading...' : displayTitle;

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyle(), textStyle]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}