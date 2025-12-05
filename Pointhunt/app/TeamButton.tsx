import { Text, TouchableOpacity } from 'react-native'
import React from 'react';

// Guest
export default function TeamButton({
  index,
  change,
  topnum,
  styles,
}: {
  index: number;
  change: (value: number) => void;
  topnum: number;
  styles: any;
}) {
  return (
    <>
      {index !== topnum ? (
        <TouchableOpacity
          style={styles}
          onPress={() => {
            change(index);
          }}
        >
          <Text>Lag {index}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles}
          onPress={() => {
            change(0);
          }}
        >
          <Text>Välj Lag</Text>
        </TouchableOpacity>
      )}
    </>
  );
}
