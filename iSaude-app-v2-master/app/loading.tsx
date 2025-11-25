import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';

export default function LoadingScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/home');
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/images/isaudeicon.png')} style={styles.icon} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2', // Blue background
  },
  icon: {
    width: 200, // Adjusted width for better visibility
    height: 200, // Adjusted height for better visibility
    resizeMode: 'contain', // Ensure the entire image is visible
  },
});