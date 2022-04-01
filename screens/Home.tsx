import { StyleSheet, Text, View, Image } from 'react-native';
import { RootTabScreenProps } from '../types';
import logoGreen from '../assets/images/logo-green.png';
import hiCat from '../assets/images/hi-cat.png';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View >
      <Image source={logoGreen} />
      <Text>CatCare</Text>
      <Image source={hiCat} />
    </View>
  );
}

