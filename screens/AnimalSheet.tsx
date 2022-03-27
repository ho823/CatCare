import { StyleSheet, Image, View, Text } from 'react-native';
import axios from 'axios';;
import { useEffect, useState } from 'react';
import logoDark from '../assets/images/logo-dark.png';
import { withSafeAreaInsets } from 'react-native-safe-area-context';

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
      </View>
      <View style={styles.whiteElm}>
        {animal.map((animal: any) =>
        <>
        <View>
          <Text key={animal.id}>{animal.name}</Text>
          <Text>{animal.age}</Text>
          <Text>{animal.weight}</Text>
          <Text>{animal.sex}</Text>
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
  }
});
