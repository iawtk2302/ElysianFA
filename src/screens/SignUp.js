import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Button,
  ToastAndroid
} from 'react-native';
import React, {useState} from 'react';
import {signUp} from '../utils/Auth';
// import auth from '@react-native-firebase/auth';
import Input from '../components/input';
const SignUp = ({navigation}) => {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    name: '',
    lastname: '',
    username: '',
    confirmpassword: '',
  });
  const [errors, setErrors] = useState({});
  const validate = () => {
    Keyboard.dismiss();
    if (!inputs.email) {
      handleErrors('please input email', 'email');
    }
    if (!inputs.password) {
      handleErrors('Please input password', 'password');
    }
    if (!inputs.name) {
      handleErrors('Please input name', 'name');
    }
    if (!inputs.username) {
      handleErrors('Please input username', 'username');
    }
    if (!inputs.confirmpassword) {
      handleErrors('Please input confirm password', 'confirmpassword');
    }
    if (!inputs.lastname) {
      handleErrors('Please input lastname', 'lastname');
    }
    if (
      inputs.email != '' &&
      inputs.password != '' &&
      inputs.confirmpassword != '' &&
      inputs.name != '' &&
      inputs.username != '' &&
      inputs.lastname != ''
    ) {
      if (inputs.password == inputs.confirmpassword) {
        signUp(inputs);
      } else {
        ToastAndroid.show("Check password and confirmpassword", 3)
      }
    }
    else {
      ToastAndroid.show("Nhập đầy đủ thông tin", 3)
    }
  };
  const handleErrors = (errorsMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorsMessage}));
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/back.png')} style={styles.back} />
        </TouchableOpacity>
        <Text style={styles.lbSignUp}>Sign up</Text>
      </View>
      <Text style={styles.lbCreate}>Create your account</Text>
      <View style={styles.name_lastname}>
        <Input
          style={{marginLeft: -5}}
          placeholder="Your Name"
          onChangeText={text => handleOnChange(text, 'name')}
          error={errors.name}
          onFocus={() => handleErrors(null, 'name')}
        />
        <View style={{margin: 8}} />
        <Input
          style={{marginLeft: -5}}
          placeholder="Your Last name"
          onChangeText={text => handleOnChange(text, 'lastname')}
          error={errors.lastname}
          onFocus={() => handleErrors(null, 'lastname')}
        />
      </View>
      <View style={{height: 250, marginTop: 2}}>
        <Input
          placeholder="Username"
          onChangeText={text => handleOnChange(text, 'username')}
          error={errors.username}
          onFocus={() => handleErrors(null, 'username')}
        />
        <Input
          placeholder="Email"
          keyboardType='email-address'
          onChangeText={text => handleOnChange(text, 'email')}
          error={errors.email}
          onFocus={() => handleErrors(null, 'email')}
        />
        <Input
          placeholder="Password"
          password
          onChangeText={text => handleOnChange(text, 'password')}
          error={errors.password}
          onFocus={() => handleErrors(null, 'password')}
        />
        <Input
          placeholder="Confirm password"
          password
          onChangeText={text => handleOnChange(text, 'confirmpassword')}
          error={errors.confirmpassword}
          onFocus={() => handleErrors(null, 'confirmpassword')}
        />
      </View>
      <TouchableOpacity
        style={styles.btnSignUp}
        activeOpacity={0.8}
        onPress={validate}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
          Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  back: {
    height: 24,
    width: 24,
  },
  lbSignUp: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 120,
    color: '#000',
  },
  lbCreate: {
    marginTop: 50,
    color: '#000',
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  name_lastname: {
    flexDirection: 'row',
    marginTop: 30,
  },
  btnSignUp: {
    backgroundColor: '#4FC4F5',
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
});
