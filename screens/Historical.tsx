import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Modal, ScrollView } from 'react-native';
import logoGreen from '../assets/images/logo-green.png';
import { Ionicons } from '@expo/vector-icons';
import { IHistorical } from '../types';

export default function Historical() {
  const [error, setError] = useState() as any;
  const [historic, setHistoric] = useState<IHistorical[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [animalId, setAnimalId] = useState(0);

  useEffect(() => {
    const getHistoric = async () => {
      try {
        const historical = await axios.get(`http://localhost:7070/api/historical`);
        setHistoric(historical.data);
      } catch (err) {
        setError(err);
        console.log('error get', err)

      }
    };
    getHistoric();

  }, []);

 
   const postADescription = (e: React.SyntheticEvent) => {
    e.preventDefault();
      axios.post(`http://localhost:7070/api/historical/`, {
        date,
        description,
        animalId
      })
      .then(response => {
        setHistoric([...historic, response.data])
      })
      setDate("")
      setDescription("")
      setAnimalId(0)
      setModalVisible(false)
  };  


  const postDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDate(e.target.value);
  };

  const postDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  };

  const postAnimalId = (e: any) => {
    setAnimalId(e.target.value);
  };


const deleteAnHistoric = (id: number) => {
 setHistoric((prevState: IHistorical[]) => prevState.filter((item:IHistorical) => item.id !== id))
}

const deleteOneHistoric = (id: number) => {
  //e.preventDefault();
  axios.delete(`http://localhost:7070/api/historical/${id}`)
  .then((response) => {
    deleteAnHistoric(id)
  })
  .catch((err) => {
    console.log(err)
  })  
}

  return (
    <ScrollView style={styles.page}>
      <View style={styles.imgContent}>
          <Image style={styles.img} source={logoGreen}/>
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
            <form onSubmit={postADescription}>
              <input type="text" placeholder="Date" name="date" onChange={postDate} value={date} />
              <input type="text" placeholder="Description" name="description" onChange={postDescription} value={description} />
              <input type="number" placeholder="Id of animal" name="animalId" onChange={postAnimalId} value={animalId} />
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

      <View style={styles.historic}>
      {historic.map((historic: IHistorical, index: number) =>
      <View key={index} style={styles.element}>
        <Text style={styles.date}>{historic.date}</Text>
        <Text style={styles.description}>{historic.description}</Text>
        <TouchableOpacity style={styles.action} onPress={() => setModalVisible(true)}>
            <Ionicons  style={styles.icon} name="add-circle-outline"></Ionicons>
          </TouchableOpacity>
          <TouchableOpacity style={styles.action} onPress={() => deleteOneHistoric(historic.id)}>
            <Ionicons style={styles.icon} name="trash-outline"></Ionicons>
          </TouchableOpacity>
      </View>
      )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
  title: {
    fontSize: 18,
  },
  date: {
    fontSize: 14,
    marginRight: 10,
  },
  historic: {
    flex: 3,
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 50
  },
  element: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  description: {
    fontSize: 14,
    backgroundColor: 'rgba(249, 149, 79, 0.31)',
    borderRadius: 3,
    padding: 6,
    display: 'flex',
    alignItems: 'center',
    width: 300,
    flexWrap: 'wrap'
  },
  action: {
    marginRight: 8,
    marginLeft: 6,
  },
  icon: {
    fontSize: 20
  },
  updateBtn: {
    marginLeft: 8
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
});
