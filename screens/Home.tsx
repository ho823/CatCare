import { StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native';
import { RootTabScreenProps } from '../types';
import logoGreen from '../assets/images/logo-green.png';
import hiCat from '../assets/images/hi-cat.png';


export default function Home({ navigation }: RootTabScreenProps<'Home'>) {
  return (
    <View style={styles.page}>
      <View style={styles.imgContent}>
          <Image style={styles.img} source={logoGreen} />
      </View>

      <View style={styles.allBtn}>
      <View style={styles.btnContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Animal')}>
          <Text>Animal profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Vaccine')}>
          <Text>Vaccine and meds</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.btnContent}>
        <TouchableOpacity onPress={() => navigation.navigate('Historical')}>
          <Text>Veterinary historic</Text>
        </TouchableOpacity>
      </View>
      </View>
        <Image style={styles.hiCatImg} source={hiCat} />
    </View>
  );
}

const styles = StyleSheet.create({
  allBtn: {
    alignItems: 'center',
    flex: 3,
    marginTop: 30

  },
  btnContent: {
    marginBottom: 35,
    backgroundColor: '#FCE3E3',
    borderRadius: 12,
    padding: 15,
    width: 250,
    textAlign: 'center'
  },

  imgContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15
  },
  img: {
    width: 179,
    height: 120
  },
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    fontFamily: 'arial'
  },
  hiCatImg: {
    width: 196,
    height: 152,
    alignSelf: 'flex-end'
  }
});