import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity, Pressable, Modal } from 'react-native';
import logoGreen from '../assets/images/logo-green.png';
import { Ionicons } from '@expo/vector-icons';

export default function Historical() {
  const [error, setError] = useState() as any;
  const [historic, setHistoric] = useState([]) as any;
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [animalId, setAnimalId] = useState(0);

  useEffect(() => {
    const getHistoric = async () => {
      try {
        const historical = await axios.get(`http://localhost:7070/api/historical`);
        setHistoric(historical.data);
        console.log('get', historical)
      } catch (err) {
        setError(err);
        console.log('error get', err)

      }
    };
    getHistoric();

  }, []);

 
   const postADescription = (e: any) => {
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


   const postDate = (e: any) => {
    setDate(e.target.value);
  };

  const postDescription = (e: any) => {
    setDescription(e.target.value);
  };

  const postAnimalId = (e: any) => {
    setAnimalId(e.target.value);
  };


const deleteH = (id: number) => {
 setHistoric((prevState: any) => prevState.filter((item:any) => item.id !== id))
}

const deleteOneHistoric = (id: number) => {
  //e.preventDefault();

      axios.delete(`http://localhost:7070/api/historical/${id}`)
    .then((response) => {
      console.log('del', response, response.data)
      deleteH(id)
    })
    .catch((err) => {
      console.log(err)
    })
    
}



  return (
    <View style={styles.page}>
      <View style={styles.imgContent}>
        <Image style={styles.img} source={logoGreen} />
        <Text style={styles.logoTitle}>CatCare</Text>
      </View>
    {/* Post Modal */}
      <Modal
        style={styles.modal}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalContainer1}>
          <View style={styles.modalContainer2}>
            <Text style={styles.textModal}>Hello World!</Text>
            <form onSubmit={postADescription}>
              <input type="text" placeholder="Date" name="date" onChange={postDate} value={date} />
              <input type="text" placeholder="Description" name="description" onChange={postDescription} value={description} />
              <input type="number" placeholder="Id of animal" name="animalId" onChange={postAnimalId} value={animalId} />
              <input type="submit" />
            </form>
            <Pressable
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text>Hide Modal <Ionicons name="close-circle-outline"></Ionicons></Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.historic}>
      {historic.map((historic: any, index: number) =>
      <View key={index} style={styles.element}>
        <Text style={styles.title}>{historic.name}</Text>
        <Text style={styles.date}>{historic.date}</Text>
        <Text style={styles.description}>{historic.description}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Ionicons name="add-circle-outline"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.updateBtn} 
          onPress={() => setModalVisible(true)}>
          <Ionicons name="pencil-outline"></Ionicons>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteOneHistoric(historic.id)}>
        <Ionicons name="trash-outline"></Ionicons>
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
    height: 120,
    width: 120,
  },
  logoTitle: {
    color: '#37C391'
  },
  updateBtn: {
    marginLeft: 8

  },
  modal:{

  },
  modalContainer1: {
    backgroundColor: 'white',

  },
  modalContainer2: {

  },
  textModal: {

  }
  
});
