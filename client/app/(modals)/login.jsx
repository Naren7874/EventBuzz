import Colors from '@/constants/Colors';
import { useOAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { View, StyleSheet, TextInput, Text, TouchableOpacity } from 'react-native';
import { useWarmUpBrowser } from '@/hooks/useWarmUpBrowser';

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: googleAuth } = useOAuth({ strategy: 'oauth_google' });

  const onSelectAuth = async () => {
    try {
      const { createdSessionId, setActive } = await googleAuth();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
        router.push('/');
      }
    } catch (err) {
      console.error('OAuth error', err);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ gap: 20 }}>
        <TouchableOpacity style={styles.btnOutline} onPress={onSelectAuth}>
          <FontAwesome name="google" size={24}/>
          <Text style={styles.btnOutlineText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 26,
  },
  btnOutline: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: Colors.grey,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  btnOutlineText: {
    color: '#000',
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
});
