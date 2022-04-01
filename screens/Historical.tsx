import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text } from 'react-native';
import logoGreen from '../assets/images/logo-green.png';
import { Ionicons } from '@expo/vector-icons';

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
    <View >
      <View style={styles.imgContent}>
        <Image style={styles.img} source={logoGreen} />
        <Text style={styles.logoTitle}>CatCare</Text>
      </View>

      <View>
        <Text style={styles.title}>Historical of veterany visit</Text>
        <Text style={styles.date}>Date</Text>
        <Text style={styles.description}>Description
          <button>
            <Ionicons name="pencil-outline"></Ionicons>
          </button>
        </Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,

  },
  description: {
    fontSize: 14,
    backgroundColor: 'rgba(249, 149, 79, 0.31)',
    borderRadius: 3

  },
  imgContent: {
    flex: 1,
  },
  img: {
    height: 150,
    width: 150,
  },
  logoTitle: {
    color: '#37C391'
  }
});
