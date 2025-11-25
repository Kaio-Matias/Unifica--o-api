import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Step1 = () => {
  return (
    <View style={styles.stepContent}>
      <Text style={styles.developmentText}>Em Desenvolvimento</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  stepContent: {
    padding: 20,
  },
  developmentText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666666',
    textAlign: 'center',
    marginTop: 60,
    fontFamily: 'Intelo',
  },
});
