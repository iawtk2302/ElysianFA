import {StyleSheet, Text, View, ScrollView, Button} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import ItemUser from '../components/itemUser';
import {useRoute} from '@react-navigation/native';
const Employee = () => {
  const [arrUser, setArrUser] = useState([]);
  const router = useRoute();
  useEffect(() => {
    let isMounted = true;
    firestore()
      .collection('UserAdmin')
      .orderBy('username', 'desc')
      .onSnapshot(query => {
        // setArrUser([])
        const temp = [];
        query.forEach(doc => {
          temp.push(doc.data());
        });
        setArrUser(temp);
        router.params = temp;
      });
    // return () => {
    //   isMounted = false;
    // };
  }, []);
  // const checkName = (item) => {
  //   console.log(item)
  //   return item?.username.includes('a')
  // }
  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        {arrUser.map((item, index) => {
          return <ItemUser key={index} item={item} index={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default Employee;

const styles = StyleSheet.create({});
