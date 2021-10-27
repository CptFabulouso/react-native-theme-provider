import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import useStyle from './styles';
import { Button, ClassText, Text } from '@components';
import { useTheme, useThemeDispatch } from '@themes';

const HomeScreen = () => {
  const styles = useStyle();
  const { selectedTheme } = useTheme();
  const { setTheme } = useThemeDispatch();
  const [val, updateVal] = useState(1);

  const changeTheme = () => {
    const nextTheme = selectedTheme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  const updateScreen = () => {
    updateVal((current) => current + 1);
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
      <ClassText type="body1">body1</ClassText>
      <ClassText type="body2">body2</ClassText>
      <ClassText type="button">button</ClassText>
      <ClassText type="caption">caption</ClassText>
      <ClassText type="overline">overline</ClassText>
      <Button label="change theme" onPress={changeTheme} />
      <Button label="update screen" onPress={updateScreen} />
      <Text type="h5">{`update cycle: ${val}`}</Text>
    </ScrollView>
  );
};

export default HomeScreen;
