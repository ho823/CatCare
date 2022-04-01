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
        <View>
          <Text style={styles.name} key={animal.id}>{animal.name}</Text>
          <Text style={styles.square}>{animal.age}</Text>
          <Text style={styles.square}>{animal.weight}</Text>
          <Text style={styles.square}>{animal.sex}</Text>
        </View>
        <View>
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
  },
  img: {
    height: 150,
    width: 150,
  },
  whiteElm: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    flex: 2,
  },
  name: {
    fontSize: 24,
  },
  square: {
    backgroundColor: '#F9954F',
    borderRadius: 8,
    height: 30,
    width: 30,
  }
});
