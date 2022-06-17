import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {googleLogin, signIn, onFacebookButtonPress} from '../utils/Auth';
import Input from '../components/input';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useNavigation} from '@react-navigation/native';
import { Font } from '../common/Font';
import Color from '../common/Color';
const SignIn = () => {
  const navigation = useNavigation();
  GoogleSignin.configure({
    webClientId:
      '242687886098-tqvu3kpcru4uo0lhdg47otfetdrb6slj.apps.googleusercontent.com',
  });

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
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
    if (inputs.email != '' && inputs.password != '') {
      signIn(inputs.email, inputs.password);
    }
  };
  const handleErrors = (errorsMessage, input) => {
    setErrors(prevState => ({...prevState, [input]: errorsMessage}));
  };
  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}));
  };
  return (
    <SafeAreaView style={{paddingHorizontal: 16,backgroundColor:'white',flex:1}}>
      <View style={styles.header}>
        <Text style={styles.AppName}>Elysian</Text>
      </View>
      <View style={{height: 130}}>
        <Input
          placeholder="Email"
          iconName="email"
          keyboardType="email-address"
          onChangeText={text => handleOnChange(text, 'email')}
          error={errors.email}
          onFocus={() => handleErrors(null, 'email')}
        />

        <Input
          placeholder="Mật khẩu"
          iconName="lock"
          password
          onChangeText={text => handleOnChange(text, 'password')}
          error={errors.password}
          onFocus={() => handleErrors(null, 'password')}
        />
      </View>
      {/* <Text style={styles.forgotpassword}>Forget password</Text> */}
      {/* Button Sign in */}
      <TouchableOpacity
        style={styles.btnLogin}
        activeOpacity={0.8}
        onPress={validate}>
        <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>
          Đăng nhập
        </Text>
      </TouchableOpacity>
      {/* <Text style={styles.OtherSignIn}>- Or sign in with -</Text>
      <TouchableOpacity
        style={styles.gg}
        activeOpacity={0.7}
        onPress={googleLogin}>
        <Image style={styles.imggg} source={require('../assets/google.png')} />
        <View style={styles.txtgg}>
          <Text style={{color: '#000', fontSize: 16}}>Sign in with google</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.gg}
        activeOpacity={0.7}
        onPress={onFacebookButtonPress}>
        <Image
          style={styles.imggg}
          source={require('../assets/facebook.png')}
        />
        <View style={styles.txtgg}>
          <Text style={{color: '#000', fontSize: 16}}>
            Sign in with facebook
          </Text>
        </View>
      </TouchableOpacity> */}
      <View style={styles.footer}>
        <Text style={{fontSize: 16}}>Bạn chưa có tài khoản? </Text>
        <Text
          style={{fontSize: 16, color: Color.custom, fontWeight:'600'}}
          onPress={() => navigation.navigate('SignUp')}>
          Đăng ký
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    marginTop: 70,
    marginBottom: 38,
    justifyContent: 'center',
  },
  AppName: {
    fontSize: 64,
    fontFamily: Font,
  },
  forgotpassword: {
    alignSelf: 'flex-end',
    marginTop: -10,
    color: Color.custom,
    fontSize: 16,
  },
  btnLogin: {
    height: 45,
    backgroundColor: Color.custom,
    padding: 10,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 30,
  },
  OtherSignIn: {
    fontSize: 16,
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: -10,
  },
  gg: {
    marginTop: 20,
    flexDirection: 'row',
    backgroundColor: '#ffff',
    borderRadius: 5,
    borderColor: "#C5C5C5",
    borderWidth: 1.5,
    height: 42,
    alignItems: 'center',
    paddingLeft: 48,
  },
  imggg: {
    width: 24,
    height: 24,
  },
  txtgg: {
    color: '#000',
    fontSize: 16,
    marginLeft: 35,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
  },
});
export default SignIn;
