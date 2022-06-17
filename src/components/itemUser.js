import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Color from '../common/Color';
const ItemUser = ({item, index}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(
    item.approved === false ? 'null' : item.type,
  );
  const [items, setItems] = useState([
    {label: ' nhân viên', value: 'staff'},
    {label: ' vận chuyển', value: 'shipper'},
    {label: ' quản lý', value: 'admin'},
    {label: ' không', value: 'null'},
  ]);
  const [isAproved, setIsAproved] = useState(false);
  const checkApproved = () => {
    if (value === 'null') return false;
    return true;
  };
  const checkType = () => {
    if(value === 'null'){
      return 'null'
    }
    return value
  }
  // console.log(value);
  const updatePosition = async () => {
    await firestore().collection('UserAdmin').doc(item.uid).update({
      type: checkType(),
      approved: checkApproved(),
    });
  };
  useEffect(() => {
    firestore()
      .collection('UserAdmin')
      .doc(item.uid)
      .onSnapshot(doc => {
        if (doc.data().approved === true) {
          setIsAproved(true);
        } else {
          setIsAproved(false);
        }
      });
  }, []);
  const convertPosition = () => {
    if(item?.request === 'staff')
      return 'Nhân viên'
    else if(item?.request === 'shipper')
      return 'vận chuyển'
    else return 'quản lý'
  }
  return (
    <TouchableOpacity style={[styles.container, {zIndex: -index}]} activeOpacity={1} >
      <View style={{paddingLeft: 15}}>
        <Text>Tên: {item?.username}</Text>
        <Text>Email: {item?.email}</Text>
        <Text>Số điện thoại: {item?.phone}</Text>
      </View>
      <View
        style={{
          height: 2,
          backgroundColor: '#ccc',
          marginVertical: 10,
          marginHorizontal: 20,
        }}></View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
        }}>
        <View>
          {isAproved === false ? (
            <Text style={{color: Color.custom}}>Yêu cầu: {item?.request}</Text>
          ) : (
            <Text style={{color: Color.custom}}>Vị trí:{items.find(option => option.value === value).label}</Text>
          )}
        </View>
        <View>
          <DropDownPicker
            placeholder=" Chọn"
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={value => {
              setValue(value);
            }}
            theme="LIGHT"
            // badgeColors='#F2F2F2'
            setItems={setItems}
            // closeOnBackPressed='#F2F2F2'
            style={{borderColor: '#ccc', width: 130}}
            onChangeValue={() => {
              updatePosition();
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemUser;

const styles = StyleSheet.create({
  container: {
    // height: 70,
    paddingVertical: 20,
    paddingHorizontal: 10,
    // justifyContent: 'space-between',
    // borderColor: 'black',
    // borderWidth: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});
