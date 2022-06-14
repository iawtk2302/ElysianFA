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
  
  const Shipping = () => {
    const [arrShipping, setArrShipping] = useState([]);
    const [data1, setData1] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const getData = async () => {
      
      await firestore()
        .collection('Orders')
        .where('state', '==', 'shipping')
        // .orderBy('createdAt', 'desc')
        .onSnapshot(query => {
          const temp = []
          // console.log(query.data())
          query.forEach(doc => {
            temp.push(doc.data());
          });
          temp.sort((a,b) => {
            return b.createdAt - a.createdAt
          })
          setData1(temp);
          // console.log(temp)
        });
        
    };
  
    useEffect(() => {
      getData();
    }, []);
    return (
      <View>
        <ScrollView>
          {data1.map((item, index) => {
            return (
              <ItemInOder
              key={index}
                item={item}
                setModalVisible={setModalVisible}
                setArrProducts={setArrShipping}
              />
            );
          })}
        </ScrollView>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {arrShipping.map((item, index) => {
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
  }
  
  export default Shipping
  
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
  })