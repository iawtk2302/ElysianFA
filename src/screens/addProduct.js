import {StyleSheet, Text, View, Image, TextInput,KeyboardAvoidingView,Modal,ScrollView,TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import React, {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import Color from '../common/Color';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage';
import DropDownPicker from 'react-native-dropdown-picker';
const AddProduct = () => {
  const navigation=useNavigation();
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [image,setImage]=useState(null)
  const [modalVisible, setModalVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Trà sữa', value: 'Trà sữa'},
    {label: 'Trà', value: 'Trà'},
    {label: 'Đá xay', value: 'Đá xay'},
    {label: 'Latte', value: 'Latte'},
    {label: 'Sinh tố', value: 'Sinh tố'},
    {label:'Cà phê', value: 'Cà phê'},
    {label: 'Sữa chua', value: 'Sữa chua'},
    {label: 'Nước ép', value: 'Nước ép'},
  ]);
  const createAlert = (title) =>
    Alert.alert(
      "Có lỗi",
      title,
      [
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ]
    );
  const openCamera = () => {
    ImagePicker.openCamera({
        height:350,
        width:350
    }).then(image => {
        setImage(image.path)
        setModalVisible(false)
    }).catch((e) => { }
    );
}
const openGalery = () => {
    ImagePicker.openPicker({
        mediaType:'photo',
        cropperCircleOverlay: true
    }).then(image => {
        setImage(image.path)
        setModalVisible(false)
    }).catch((e) => { }
    );
}
const showToast = () => {
  ToastAndroid.show("Cập nhật thành công", ToastAndroid.LONG);
};
const update = async () => {
    if(price*1<20000||price*1>200000){
        createAlert("Giá tiền không hợp lệ!")
        return
    }
  const uri = image;
  if(route.params.item.linkImage!=image){
    try {
      await storage().ref(`imageProduct/${name+'.png'}`).putFile(uri)
  } catch (e) {
      console.log(e)
  }
  await firestore()
      .collection('Products')
      .doc()
      .set({
          name:name,
          price:price,
          linkImage:await storage().ref(`imageProduct/${name+'.png'}`).getDownloadURL()
      })
      .then(() => {
      });
  }
  else{
    await firestore()
      .collection('Products')
      .doc()
      .update({
          name:name,
          price:price,
      })
      .then(() => {
        showToast()
      });
  }
  
}
  return (
    <KeyboardAvoidingView
        behavior = "padding"
        keyboardVerticalOffset={-300}
      style={{flex:1,backgroundColor:'white'}}>
        <ScrollView showsVerticalScrollIndicator={false} style={{flex:1}}>
        <View style={{height: 450, backgroundColor: '#FEF2D6',alignItems:'center',justifyContent:'center'}}>
        <Icon name='close-outline' size={24} style={{position:'absolute',left:10,top:10}} onPress={()=>{navigation.goBack()}}/>
        {image!=null&&<View>
        <Image
          source={{uri: image}}
          style={{height: 350, width: 350}}
          resizeMode='center'
        /> 
        <Icon name='camera-outline' size={24} style={{position:'absolute',right:-10,bottom:-40}} onPress={()=>{setModalVisible(true)}}/>
            </View>}
            {image==null&&<View>
                <Icon name='camera-outline' size={200} onPress={()=>{setModalVisible(true)}}/>
            </View>}
      </View>
      <View style={{paddingHorizontal: 16, paddingTop:10}}>
        <Text style={{color: 'black'}}>Tên thức uống</Text>
        <TextInput
          value={name}
          style={{borderColor: '#C5C5C5', borderWidth: 1, borderRadius: 10}}
          placeholder="Nhập tên thức uống"
          onChangeText={setName}
        />
        <Text style={{color: 'black', marginTop:8}}>Giá tiền</Text>
        <TextInput
          value={price}
          style={{borderColor: '#C5C5C5', borderWidth: 1, borderRadius: 10}}
          placeholder="Nhập giá tiền"
          keyboardType="numeric"
          onChangeText={setPrice}
        />
        <Text style={{color: 'black', marginTop:8}}>Loại sản phẩm</Text>
        <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
    />
        <TouchableOpacity style={{backgroundColor:Color.custom,height:50,borderRadius:10, alignItems:'center',justifyContent:'center', marginTop:50}} onPress={()=>{update()}}>
        <Text style={{color:'white'}}>Thêm</Text>
      </TouchableOpacity>
      </View>
    </ScrollView> 
    <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}>
                <View style={{ flex: 1, flexDirection: 'column-reverse' }}>
                    <View style={{ height: 300, backgroundColor: 'white' }}>
                        <Text style={{ fontSize: 20, fontWeight: '500', color: 'black', alignSelf: 'center', marginTop: 10 }}>Cập nhật ảnh</Text>
                        <Text style={{ fontSize: 14, alignSelf: 'center', marginTop: 4 }}>Chọn ảnh thức uống</Text>
                        <TouchableOpacity style={{ height: 50, backgroundColor: Color.custom, borderRadius: 10, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }} onPress={() => { openCamera() }}>
                            <Text style={{ color: 'white' }}>Chụp ảnh</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 50, backgroundColor: Color.custom, borderRadius: 10, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }} onPress={() => { openGalery() }}>
                            <Text style={{ color: 'white' }}>Chọn ảnh từ thư viện</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 50, backgroundColor: Color.custom, borderRadius: 10, marginHorizontal: 16, alignItems: 'center', justifyContent: 'center', marginVertical: 6 }} onPress={() => { setModalVisible(false) }}>
                            <Text style={{ color: 'white' }}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
    </KeyboardAvoidingView>  
  );
};

export default AddProduct;

const styles = StyleSheet.create({});
