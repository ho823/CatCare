import { StyleSheet, Image, View, Text } from 'react-native';
import axios from 'axios';;
import { useEffect, useState } from 'react';
import logoDark from '../assets/images/logo-dark.png';
import rabbitCat from '../assets/images/rabbit-hat-cat.png';

export default function AnimalSheet() {
  const [error, setError] = useState() as any;
  const [animal, setAnimal] = useState([]);

  useEffect(() => {
    const getAnimal = async () => {
      try {
        const animals = await axios.get(`http://localhost:7070/api/animal`);
        setAnimal(animals.data);
        console.log(animals)
      } catch (err) {
        setError(err);
        console.log(err)

      }
    };
    getAnimal();

  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.imgContent}>
        <Image style={styles.img} source={logoDark} />
        <Text>CatCare</Text>
        <Image source={rabbitCat} />
      </View>
      <View style={styles.whiteElm}>
        {animal.map((animal: any) =>
        <>
        <View style={styles.cardAnimal}>
          <Text style={styles.name} key={animal.id}>{animal.name}</Text>
          <View style={styles.info}>
            <Text style={styles.square}>{animal.age} years</Text>
            <Text style={styles.square}>{animal.weight} kg</Text>
            <Text style={styles.square}>{animal.sex}</Text>
          </View>
        </View>
        </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FCE3E3',
  },
  imgContent: {
    backgroundColor: '#FCE3E3',
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    height: 120,
    width: 120,
  },
  whiteElm: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 2,
  },
  cardAnimal:{
    padding: 20

  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-around'

  },
  name: {
    fontSize: 24,
    marginBottom: 15,
    textAlign: 'center'
  },
  square: {
    backgroundColor: '#F9954F',
    padding: 8,
    borderRadius: 8,
    height: 80,
    width: 80,
  }
});
