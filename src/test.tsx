import * as React from 'react';
import { StyleSheet, Text, View, ViewStyle } from 'react-native';

type TestProps = {
  style?: ViewStyle;
};

const Test = (props: TestProps) => {
  return (
    <View style={[styles.container, props.style]}>
      <Text>Test Component</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export { Test };
