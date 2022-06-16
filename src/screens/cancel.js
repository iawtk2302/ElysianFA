import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {signOut} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ItemInOder from '../components/itemInOrders';
import ItemInOrders from '../components/itemInOrders';
import OderDetail from '../components/OderDetail';
import {ActivityIndicator} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
const Cancel = () => {
  const [arrCancel, setArrCancel] = useState([]);
  const [datacancel, setDatacancel] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    
    await firestore()
      .collection('Orders')
      .where('state', '==', 'cancelled')
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
        setDatacancel(temp);
        // console.log(temp)
      });
      
  };
  const convertButton = () => {
    return arrCancel[0]?.state === 'waiting'
      ? 'Xác nhận'
      : arrCancel[0]?.state === 'shipping'
      ? 'Hoàn thành'
      : arrCancel[0]?.state === 'cancelled'
      ? 'Đã hủy'
      : 'Đã hoàn thành';
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <View>
      <ScrollView>
        {datacancel.map((item, index) => {
          return (
            <ItemInOder
            setLoading={setLoading}
            key={index}
              item={item}
              setModalVisible={setModalVisible}
              setArrProducts={setArrCancel}
            />
          );
        })}
      </ScrollView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {arrCancel.map((item, index) => {
              return (
                <View key={index}>
                  <OderDetail item={item} />
                </View>
              );
            })}
            <View style={{flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'flex-end'}}>
              <Text style={{marginTop: 10, fontSize: 16, marginRight: 15}}> Tổng cộng: 
                <Text style={{color: '#000'}}> {arrCancel[0]?.total}</Text>
              </Text>
              <TouchableOpacity
              activeOpacity={1}
                // onPress={() => {
                //   ToastAndroid.show("Đơn hàng đã bị hủy", 3)
                // }}
                style={{
                  backgroundColor: '#F84F4F',
                  // alignSelf: 'flex-end',
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 10,
                  marginRight: 10,
                  marginTop: 10,
                }}>
                <Text>{convertButton()}</Text>
              </TouchableOpacity>
            </View>
            <View height={70} />
          </ScrollView>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(false);
            }}
            style={styles.closeBtn}>
            <IonIcons
              name="close-circle"
              style={{fontSize: 50, color: '#B81F32'}}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

export default Cancel

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