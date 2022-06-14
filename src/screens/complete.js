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
  
  const Complete = () => {
    const [arrCompleted, setArrCompleted] = useState([]);
    const [data, setData] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const getData = async () => {
      
      await firestore()
        .collection('Orders')
        .where('state', '==', 'completed')
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
          setData(temp);
          // console.log(temp)
        });
        
    };
  
    useEffect(() => {
      getData();
    }, []);
    return (
      <View>
        <ScrollView>
          {data.map((item, index) => {
            return (
              <ItemInOder
              key={index}
                item={item}
                setModalVisible={setModalVisible}
                setArrProducts={setArrCompleted}
              />
            );
          })}
        </ScrollView>
        <Modal animationType="slide" transparent={true} visible={modalVisible}>
          <View style={styles.modalContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {arrCompleted.map((item, index) => {
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
  
  export default Complete
  
  const styles = StyleSheet.create({})