import { StyleSheet, Image, View, Text, Modal, Pressable, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import logoDark from '../assets/images/logo-dark.png';
import rabbitCat from '../assets/images/rabbit-hat-cat.png';
import { IAnimal } from '../types';

export default function AnimalSheet() {
  const [error, setError] = useState() as any;
  const [animal, setAnimal] = useState<IAnimal[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [age, setAge] = useState(0);
  const [weight, setWeight] = useState(0);
  const [name, setName] = useState('');
  const [idAnimal, setIdAnimal] = useState(0);


  useEffect(() => {
    const getAnimal = async () => {
      try {
        const animals = await axios.get(`http://localhost:7070/api/animal`);
        setAnimal(animals.data);
      } catch (err) {
        setError(err);
      }
    };
    getAnimal();

  }, []);

  const updateAnimal = (id: number) => {
    axios.put(`http://localhost:7070/api/animal/${id}`, {
      name,
      age,
      weight
    })
    .then(response => {
      console.log('response', response.data)
    })
    .catch(error => {
      setError(error)
    })
};

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    updateAnimal(idAnimal);
  }
  
  const putName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const putAge = (e: any) => {
    setAge(e.target.value);
  };

  const putWeight = (e: any) => {
    setWeight(e.target.value);
  };


  return (
    <View style={styles.page}>
      <View style={styles.imgContent}>
        <Image style={styles.img} source={logoDark}/>
      </View>

      <View>
        <Image style={styles.imgRabbitCat} source={rabbitCat}/>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
        setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer1}>
          <View>
            <form onSubmit={handleSubmit}>
              <input type="text" placeholder="Name" name="name" onChange={putName} value={name} />
              <input type="number" placeholder="Age" name="age" onChange={putAge} value={age} />
              <input type="number" placeholder="Weight" name="weight" onChange={putWeight} value={weight} />
              <input type="submit" />
            </form>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.hideModal}>Close <Ionicons style={styles.close} name="close-circle-outline"></Ionicons></Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.whiteElm}>
        {animal.map((animal: IAnimal, index: number) =>
        <View key={index}>
        <View style={styles.cardAnimal}>
          <Text style={styles.name}>{animal.name}        
            <TouchableOpacity style={styles.containerIcon}
              onPress={() => {setModalVisible(true); setIdAnimal(animal.id)}}>
              <Ionicons style={styles.icon} name="color-wand-outline"></Ionicons>
            </TouchableOpacity>
          </Text>
          <View style={styles.info}>
            <Text style={styles.square}>{animal.age} years</Text>
            <Text style={styles.square}>{animal.weight} kg</Text>
            <Text style={styles.square}>{animal.sex}</Text>
            <Text style={styles.square}>{animal.race}</Text>
          </View>
        </View>
        </View>
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
    flex: 1,
    backgroundColor: '#FCE3E3',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 15
  },
  img: {
    width: 179,
    height: 120
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
    justifyContent: 'space-around',

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
    color: 'white',
    fontSize: 16
  },
  containerIcon: {
    marginLeft: 8
  },
  icon: {
    fontSize: 20
  },
  modalContainer1: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    height: 250,
    justifyContent: 'center',
    padding: 50
  },
  hideModal: {
    color: 'white',
    marginTop: 10
  },
  close: {
    fontSize: 30
  },
  imgRabbitCat: {
    width: 211,
    height: 178,
    position: 'absolute',
    top: -143,
    right: 0
  }
  
});
