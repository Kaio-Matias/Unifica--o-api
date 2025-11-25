import { useRouter } from 'expo-router';
import { useEffect } from 'react';

export default function IndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Replace the initial route with /login so the app starts on the login screen
    // This avoids an unconditional redirect to the validation flow which interferes
    // with the intended login -> loading -> permissions flow.
    router.replace('/login');
  }, [router]);

  return null;
}
