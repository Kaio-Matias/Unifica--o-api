import { useRouter } from 'expo-router';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Button title="Logar" onPress={() => { console.log('Login pressed -> navigate to /permissions/location'); router.replace('/permissions/location'); }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EFF1F5',
  },
});