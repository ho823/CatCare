import { StyleSheet, Text, View, Image } from 'react-native';
import logoGreen from '../assets/images/logo-green.png';



export default function Vaccine() {
  return (
    <View >
      <View style={styles.imgContent}>
        <Image style={styles.img} source={logoGreen} />
        <Text style={styles.logoTitle}>CatCare</Text>
      </View>

      <View>
        <Text style={styles.title}>Vaccine</Text>
        <Text style={styles.name}>Name of vaccine</Text>
        <View style={styles.bgVaccine}>
        <svg xmlns="http://www.w3.org/2000/svg" 
        data-name="Layer 1" 
        viewBox="0 0 24 24">
          <path 
          fill="#572B29" 
          d="M21.71,2.29a1,1,0,0,0-1.42,0L18.17,4.41l-.71-.7a1,1,0,0,0-1.41,0L14.64,5.12l-.71-.71a1,1,0,0,0-1.42,0L4.74,12.19,4,11.49A1,1,0,0,0,2.62,12.9l3.53,3.54L4.42,18.18l-.71-.72a1,1,0,0,0-1.42,1.42l2.83,2.83a1,1,0,0,0,.71.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.42l-.71-.7,1.74-1.74,3.53,3.53a1,1,0,0,0,.71.3,1,1,0,0,0,.7-1.71l-.7-.71,7.78-7.77a1,1,0,0,0,0-1.42l-.71-.71L20.29,8a1,1,0,0,0,0-1.41l-.7-.71,2.12-2.12A1,1,0,0,0,21.71,2.29ZM7.57,15,6.15,13.61l1.41-1.42L9,13.61Zm2.82,2.83L9,16.44,10.39,15l1.42,1.42ZM13.22,15,9,10.78l4.24-4.24.71.7h0l3.53,3.54ZM17.46,8,16.05,6.54l.71-.71.7.7h0l.7.7Z"/>
        </svg>
        </View>
        <Text style={styles.date}>Date</Text>
      </View>

      <View>
        <Text style={styles.title}>Meds</Text>
        <Text style={styles.name}>Name of med</Text>
        <View style={styles.bgMeds}>
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        data-name="Layer 1" 
        viewBox="0 0 24 24">
          <path 
          fill="#FFFFFF" 
          d="M20.54,3.46a5,5,0,1,0,0,7.08A5,5,0,0,0,20.54,3.46ZM14.88,4.88A3,3,0,0,1,17,4a3,3,0,0,1,1.28.3l-4,4A3,3,0,0,1,14.88,4.88Zm4.24,4.24a3,3,0,0,1-3.4.58l4-4A3,3,0,0,1,19.12,9.12ZM8,10a5.93,5.93,0,0,0-4.21,1.73l0,0,0,0A6,6,0,0,0,8,22a6,6,0,0,0,4.14-1.66l.12-.08a1.05,1.05,0,0,1,.07-.11A6,6,0,0,0,8,10ZM5.17,18.83A4,4,0,0,1,4.56,14L10,19.44A4,4,0,0,1,5.17,18.83ZM11.44,18,6,12.56A4,4,0,0,1,8,12a4,4,0,0,1,3.44,6Z"/>
        </svg>
        </View>
        <Text style={styles.date}>Date</Text>
        <Text style={styles.duration}>Duration</Text>
      </View>

    </View>
  );
}
const styles = StyleSheet.create({

  imgContent: {
    flex: 1,
  },
  img: {
    height: 150,
    width: 150,
  },
  logoTitle: {
    color: '#37C391'
  },
  title: {

  },
  name: {

  },
  date: {

  },
  duration: {

  },
  bgMeds: {
    height: 60,
    width: 60,
    borderRadius: 9,
    backgroundColor: '#37C391',
    padding: 5,
  },
  bgVaccine: {
    height: 60,
    width: 60,
    borderRadius: 9,
    backgroundColor: '#F2B6B6',
    padding: 5,
  },
});