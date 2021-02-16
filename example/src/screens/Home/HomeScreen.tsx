import { ScrollView } from 'react-native';
import React from 'react';

import { Button, Text } from '@components';
import { useTheme, useThemeDispatch } from '@themes';
import useStyle from './styles';

const HomeScreen = () => {
  const styles = useStyle();
  const { selectedTheme } = useTheme();
  const { setTheme } = useThemeDispatch();

  const changeTheme = () => {
    const nextTheme = selectedTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text type="h1">h1</Text>
      <Text type="h2">h2</Text>
      <Text type="h3">h3</Text>
      <Text type="h4">h4</Text>
      <Text type="h5">h5</Text>
      <Text type="h6">h6</Text>
      <Text type="subtitle1">subtitle1</Text>
      <Text type="subtitle2">subtitle2</Text>
      <Text type="body1">body1</Text>
      <Text type="body2">body2</Text>
      <Text type="button">button</Text>
      <Text type="caption">caption</Text>
      <Text type="overline">overline</Text>
      <Button label="change theme" onPress={changeTheme} />
    </ScrollView>
  );
};

export default HomeScreen;
