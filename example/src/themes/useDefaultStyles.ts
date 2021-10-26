import { StyleSheet } from 'react-native';
import { createUseStyle } from './Themes';

export default createUseStyle((t) =>
  StyleSheet.create({
    flexCenter: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    flex: {
      flex: 1,
    },
    center: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  }),
);
