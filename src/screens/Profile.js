import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import { signOut } from '../utils/Auth';
import auth from '@react-native-firebase/auth';

const Profile = () => {
  // const imgUrl = `https://firebasestorage.googleapis.com/v0/b/login-ae9b3.appspot.com/o/image1.png?alt=media&token=6f54d373-d440-4e7f-88cf-7053e46d7386`
  const [info, setInfo] = useState();
  const getInfo = async () => {
    // auth().currentUser = "aaa"
    // await auth().currentUser.updateProfile({displayName: 'khanh', photoURL: 'https://firebasestorage.googleapis.com/v0/b/login-ae9b3.appspot.com/o/image1.png?alt=media&token=6f54d373-d440-4e7f-88cf-7053e46d7386'});
    // console.log(auth().currentUser);
    // // auth().currentUser.delete();  
    // // database()
    // // .ref(`/user/${auth().currentUser.uid}/name`)
    // // .on('value', snapshot => {
    // //   console.log('User data: ', snapshot.val());
    // //   setInfo(snapshot.val())
    // // });
    // setInfo(auth().currentUser.displayName);
  };
  return (
    <View>
      <Text>{info}</Text>
      <TouchableOpacity
        onPress={signOut}
        style={{backgroundColor: 'red', height: 40, justifyContent: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: '#fff',
            textAlign: 'center',
          }}>
          Sign Out
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={getInfo}
        style={{backgroundColor: 'grey', height: 40, justifyContent: 'center'}}>
        <Text
          style={{
            fontWeight: 'bold',
            fontSize: 16,
            color: '#fff',
            textAlign: 'center',
          }}>
          GetInfo
        </Text>
      </TouchableOpacity>
      <Image style={{height: 100, width: 100}} source={{uri: auth().currentUser.photoURL}}></Image>
    </View>
  );
}

export default Profile

const styles = StyleSheet.create({})