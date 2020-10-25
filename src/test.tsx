import { Text, View, ViewStyle, StyleSheet } from "react-native";
import * as React from "react";

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
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
});

export { Test };
