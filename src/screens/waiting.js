import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {signOut} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ItemInOder from '../components/itemInOrders';
import ItemInOrders from '../components/itemInOrders';
import OderDetail from '../components/OderDetail';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Post from './Post';
import Notification from './Notification';
import {ActivityIndicator} from 'react-native';
const Tab = createMaterialTopTabNavigator();
const Waiting = () => {
  const [arrProducts, setArrProducts] = useState([]);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  // const getData = async () => {
  //   await

  // };

  useEffect(() => {
    // getData();
    firestore()
      .collection('Orders')
      .where('state', '==', 'waiting')
      // .orderBy('createdAt', 'desc')
      .onSnapshot(query => {
        const temp = [];
        // console.log(query.data())
        query.forEach(doc => {
          temp.push(doc.data());
        });
        temp.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        setData(temp);
        // console.log(temp)
        setLoading(false)
      });
  }, []);
  if (loading) {
    return <ActivityIndicator />;
  }
  return (
    <View>
      <ScrollView>
        {data.map((item, index) => {
          return (
            <ItemInOder
              setLoading={setLoading}
              key={index}
              item={item}
              setModalVisible={setModalVisible}
              setArrProducts={setArrProducts}
            />
          );
        })}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {arrProducts.map((item, index) => {
              return (
                <View key={index}>
                  <OderDetail item={item} />
                </View>
              );
            })}
            <View height={70} />
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}>
            <Text>close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

export default Waiting;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    shadowColor: '#000',
    elevation: 5,
    height: '95%',
  },
  closeBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    bottom: 15,
    transparent: true,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
