import React from 'react';
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

import { Text } from '../Text/Text';
import useStyle from './styles';

type Props = TouchableOpacityProps & {
  label: string;
  labelStyle?: TextStyle;
};

const Button = ({ label, labelStyle, ...touchableProps }: Props) => {
  const styles = useStyle({ disabled: touchableProps.disabled });

  return (
    <TouchableOpacity
      {...touchableProps}
      style={[styles.container, touchableProps.style]}
    >
      <Text style={[styles.label, labelStyle]}>{label}</Text>
    </TouchableOpacity>
  );
};

export { Button };
