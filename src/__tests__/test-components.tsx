import * as React from 'react';
import { Text, Button } from 'react-native';

import { createUseStyle, useThemeDispatch, useTheme } from './theme';

const useStyles = createUseStyle((theme) => ({
  container: {
    color: theme.colors.primary,
    fontSize: theme.typography.h1.fontSize,
  },
}));

const useStylesWithParams = createUseStyle(
  (theme, { fontSize }: { fontSize: number }) => ({
    container: {
      color: theme.colors.primary,
      fontSize,
    },
  }),
);

export const TextComponent = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
  const styles = useStyles();
  return (
    <Text testID={`text-${id}`} style={styles.container}>
      {children}
    </Text>
  );
};

export const TextComponentWithParams = ({
  children,
  id,
  fontSize,
}: {
  children: React.ReactNode;
  id: number;
  fontSize: number;
}) => {
  const styles = useStylesWithParams({ fontSize });
  return (
    <Text testID={`text-${id}`} style={styles.container}>
      {children}
    </Text>
  );
};

export const BaseStyleTextComponent = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: number;
}) => {
  const styles = useStyles();
  return (
    <Text testID={`text-${id}`} style={styles.customBS.text}>
      {children}
    </Text>
  );
};

export const SwitchStylesButton = ({
  onPress,
}: {
  onPress: (data: {
    useTheme: ReturnType<typeof useTheme>;
    useThemeDispatch: ReturnType<typeof useThemeDispatch>;
  }) => void;
}) => {
  const useThemeProps = useTheme();
  const useThemeDispatchProps = useThemeDispatch();

  const handlePress = React.useCallback(() => {
    onPress({
      useTheme: useThemeProps,
      useThemeDispatch: useThemeDispatchProps,
    });
  }, [onPress, useThemeDispatchProps, useThemeProps]);

  return (
    <Button
      title="Change styles"
      testID="changeStylesButton"
      onPress={handlePress}
    />
  );
};
