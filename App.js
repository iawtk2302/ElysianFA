import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './src/screens/Home';
import auth from '@react-native-firebase/auth';
import Navigation from './src/navigators/Navigation';
import Bottomtab from './src/navigators/BottomTab';
import {NavigationContainer} from '@react-navigation/native';
import SignIn from './src/screens/SignIn';
import firestore from '@react-native-firebase/firestore';

const Stack = createNativeStackNavigator();
const App = () => {
  // const [text, setText] = useState();
  // const [text1, setText1] = useState();
  // const [data, setData] = useState({});
  // const log = () => {};
  // const convert = () => {
  //   console.log(data)
  //   firestore()
  //     .collection('Products').add(data)
  //     .then(() => {
  //       console.log('added');
  //     });
  // };
  // useEffect(() => {
  //   SplashScreen.hide();
  //   log();
  // }, []);
  // return (
  //   <View>
  //     <Text style={{}}>{text}</Text>
  //     <View style={{height: 50, borderWidth: 1, borderColor: 'black'}}>
  //       <TextInput multiline={true} placeholder="name" onChangeText={(text) => {setData(prevState => ({...prevState, ['name']: text}))}}/>
  //     </View>
  //     <View style={{height: 50, borderWidth: 1, borderColor: 'black'}}>
  //       <TextInput multiline={true} placeholder="price" onChangeText={(text) => {setData(prevState => ({...prevState, ['price']: text}))}}/>
  //     </View>
  //     <View style={{height: 50, borderWidth: 1, borderColor: 'black'}}>
  //       <TextInput multiline={true} placeholder="linkImage" onChangeText={(text) => {setData(prevState => ({...prevState, ['linkImage']: text}))}}/>
  //     </View>
  //     <View style={{height: 50, borderWidth: 1, borderColor: 'black'}}>
  //       <TextInput multiline={true} placeholder="type" onChangeText={(text) => {setData(prevState => ({...prevState, ['type']: text}))}}/>
  //     </View>

  //     <TouchableOpacity
  //       style={{backgroundColor: 'red'}}
  //       onPress={() => convert(text)}>
  //       <Text>Run</Text>
  //     </TouchableOpacity>
  //   </View>
  // );
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const onAuthStateChanged = user => {
    setCurrentUser(user);
    setIsLoading(false);
  };

  useEffect(() => {
    SplashScreen.hide()
    // console.log("mounded")
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (isLoading) {
    return null;
  }
  // console.log(currentUser)
  if (currentUser)
    return (
      <NavigationContainer>
        <Bottomtab></Bottomtab>
      </NavigationContainer>
    );
  return (
    <Navigation/>
  );
};

export default App;

const styles = StyleSheet.create({});
