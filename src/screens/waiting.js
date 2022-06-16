import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {signOut} from '../utils/Auth';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import ItemInOder from '../components/itemInOrders';
import ItemInOrders from '../components/itemInOrders';
import OderDetail from '../components/OderDetail';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ActivityIndicator} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
const Tab = createMaterialTopTabNavigator();
const Waiting = () => {
  const [arrProducts, setArrProducts] = useState([]);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const changeStatus = async () => {
    console.log(arrProducts[0].orderID);
    if (convertButton() === 'Xác nhận' || convertButton() === 'Hoàn thành')
      Alert.alert('Xác nhận', 'Bạn xác nhận thay đổi trạng thái đơn hàng', [
        {
          text: 'Không',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Có',
          onPress: async () => {
            await firestore()
              .collection('Orders')
              .doc(arrProducts[0].orderID)
              .update({
                state:
                  convertButton() === 'Xác nhận'
                    ? 'shipping'
                    : convertButton() === 'Hoàn thành'
                    ? 'completed'
                    : convertButton() === 'Đã hoàn thành'
                    ? 'completed'
                    : 'cancelled',
              })
              .then(() => {setModalVisible(false)});
          },
        },
      ]);
  };
  const convertButton = () => {
    return arrProducts[0]?.state === 'waiting'
      ? 'Xác nhận'
      : arrProducts[0]?.state === 'shipping'
      ? 'Hoàn thành'
      : arrProducts[0]?.state === 'cancelled'
      ? 'Đã hủy'
      : 'Đã hoàn thành';
  };
  useEffect(() => {
    firestore()
      .collection('Orders')
      .where('state', '==', 'waiting')
      .onSnapshot(query => {
        const temp = [];
        query.forEach(doc => {
          temp.push(doc.data());
        });
        temp.sort((a, b) => {
          return b.createdAt - a.createdAt;
        });
        setData(temp);
      });
    setLoading(false);
  }, []);
  // if (loading) {
  //   return <ActivityIndicator />;
  // }
  return (
    <View>
      {loading && (
        <ActivityIndicator
          size={'large'}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        />
      )}
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
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              <Text style={{marginTop: 10, fontSize: 16, marginRight: 15}}>
                {' '}
                Tổng cộng:
                <Text style={{color: '#000'}}> {arrProducts[0]?.total}</Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  changeStatus();
                }}
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
