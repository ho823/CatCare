import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, Button, TouchableOpacity } from 'react-native';
import logoGreen from '../assets/images/logo-green.png';
import { Ionicons } from '@expo/vector-icons';
import Modal from '../components/Modal';

export default function Historical() {
  const [error, setError] = useState() as any;
  const [historic, setHistoric] = useState([]);

  useEffect(() => {
    const getHistoric = async () => {
      try {
        const historical = await axios.get(`http://localhost:7070/api/historical`);
        setHistoric(historical.data);
        console.log(historical)
      } catch (err) {
        setError(err);
        console.log(err)

      }
    };
    getHistoric();

  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.imgContent}>
        <Image style={styles.img} source={logoGreen} />
        <Text style={styles.logoTitle}>CatCare</Text>
      </View>

      <View style={styles.historic}>
      {historic.map((historic: any) =>
      <View key={historic.id} style={styles.element}>
        <Text style={styles.title}>{historic.name}</Text>
        <Text style={styles.date}>{historic.date}</Text>
        <Text style={styles.description}>{historic.description}
        <TouchableOpacity 
          style={styles.updateBtn} 
          onPress={() => console.log('click')}>
          <Ionicons name="pencil-outline"></Ionicons>
        </TouchableOpacity>

        </Text>
      </View>
      )}
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    marginRight: 10

  },
  description: {
    fontSize: 14,
    backgroundColor: 'rgba(249, 149, 79, 0.31)',
    borderRadius: 3,
    padding: 6,

  },
  historic: {
    flex: 2,
    backgroundColor: '#FFFFFF',
    margin: 20,
  },
  element: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25
  },
  imgContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'

  },
  img: {
    height: 150,
    width: 150,
  },
  logoTitle: {
    color: '#37C391'
  },
  updateBtn: {
    marginLeft: 8

  }
  
});
