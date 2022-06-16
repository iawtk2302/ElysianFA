import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Keyboard,
  Button,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {signUp} from '../utils/Auth';
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../components/input';
const SignUp = ({navigation}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState([]);
  const [items, setItems] = useState([
    {label: ' staff', value: 'staff'},
    {label: ' shipper', value: 'shipper'},
  ]);
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
    const emailFormat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
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
    if(!inputs.email.match(emailFormat)){
      console.log('ngu')
      return; 
    }
    if (
      inputs.email != '' &&
      inputs.password != '' &&
      inputs.confirmpassword != '' &&
      inputs.username != ''
    ) {
      if (inputs.password == inputs.confirmpassword) {
        signUp(inputs);
        // console.log(inputs)
      } else {
        ToastAndroid.show('Check password and confirmpassword', 3);
      }
    } else {
      ToastAndroid.show('Nhập đầy đủ thông tin', 3);
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
        <Text style={styles.lbSignUp}>Đăng ký</Text>
      </View>
      <Text style={styles.lbCreate}>Tạo tài khoản</Text>
      {/* <View style={styles.name_lastname}>
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
      </View> */}
      <View style={{height: 250, marginTop: 20}}>
        <Input
          placeholder="Tên của bạn"
          onChangeText={text => handleOnChange(text, 'username')}
          error={errors.username}
          onFocus={() => handleErrors(null, 'username')}
        />
        <Input
          placeholder="Email"
          keyboardType="email-address"
          onChangeText={text => handleOnChange(text, 'email')}
          error={errors.email}
          onFocus={() => handleErrors(null, 'email')}
        />
        <Input
          placeholder="Mật khẩu"
          password
          onChangeText={text => handleOnChange(text, 'password')}
          error={errors.password}
          onFocus={() => handleErrors(null, 'password')}
        />
        <Input
          placeholder="Xác nhận mật khẩu"
          password
          onChangeText={text => handleOnChange(text, 'confirmpassword')}
          error={errors.confirmpassword}
          onFocus={() => handleErrors(null, 'confirmpassword')}
        />
      </View>
      <DropDownPicker
        placeholder=" Chọn chức vụ"
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={value => {
          setValue(value);
        }}
        theme='LIGHT'
        // badgeColors='#F2F2F2'
        setItems={setItems}
        // closeOnBackPressed='#F2F2F2'
        style={{borderColor: '#4FC4F5', }}
        onChangeValue={() => {
          setInputs(prevState => ({...prevState, ['type']: value}));
          // setGenderFill(true);
        }}
      />
      <TouchableOpacity
        style={styles.btnSignUp}
        activeOpacity={0.8}
        onPress={validate}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#fff'}}>
          Đăng ký
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
