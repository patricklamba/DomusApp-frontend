// components/ui/Input.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  ViewStyle, 
  TextStyle,
  TextInputProps 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { TextStyles } from '@/constants/Typography';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: ViewStyle;
  labelStyle?: TextStyle;
  required?: boolean;
  leftElement?: React.ReactNode;  // Pour le +244 comme dans votre app
  rightElement?: React.ReactNode;
}

export default function Input({
  label,
  error,
  containerStyle,
  inputStyle,
  labelStyle,
  required = false,
  leftElement,
  rightElement,
  ...textInputProps
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const inputContainerStyle: ViewStyle = {
    flexDirection: 'row',
    alignItems: 'center',
    height: Sizes.input.height,
    backgroundColor: Colors.surface,
    borderRadius: Sizes.radius.md,
    paddingHorizontal: Sizes.spacing.md,
    borderWidth: focused ? 2 : 0,
    borderColor: focused ? Colors.border.selected : 'transparent',
  };

  const inputTextStyle: TextStyle = {
    flex: 1,
    ...TextStyles.input,
    color: Colors.text.primary,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={[styles.label, labelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Text>
      )}
      
      <View style={[inputContainerStyle, inputStyle]}>
        {leftElement}
        
        <TextInput
          style={inputTextStyle}
          placeholderTextColor={Colors.text.placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          {...textInputProps}
        />
        
        {rightElement}
      </View>
      
      {error && (
        <Text style={styles.error}>{error}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Sizes.spacing.lg,
  },
  label: {
    ...TextStyles.label,
    color: Colors.text.primary,
    marginBottom: Sizes.spacing.sm,
  },
  required: {
    color: Colors.error,
  },
  error: {
    fontSize: 14,
    color: Colors.error,
    marginTop: Sizes.spacing.xs,
    marginLeft: Sizes.spacing.xs,
  },
});