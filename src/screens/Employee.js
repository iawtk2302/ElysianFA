import {StyleSheet, Text, View, ScrollView} from 'react-native';
import React, {useState, useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import ItemUser from '../components/itemUser';
const Employee = () => {
  const [arrUser, setArrUser] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const temp = [];
    firestore()
      .collection('UserAdmin')
      .orderBy('username', 'desc')
      .get()
      .then(query => {
        query.forEach(doc => {
          temp.push(doc.data());
        });
        if (isMounted) setArrUser(temp);
      });
    return () => {
      isMounted = false;
    };
  }, []);
  return (
    <View style={{flex: 1}}>
      {/* <View style={{alignItems: 'center', height: 60, justifyContent: 'center'}}>
        <Text style={{fontSize: 20}}>Nhân viên</Text>
      </View> */}
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
