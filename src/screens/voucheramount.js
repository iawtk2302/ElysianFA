import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    KeyboardAvoidingView,
    Modal,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
  } from 'react-native';
  import React, {useState,useEffect} from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import Color from '../common/Color';
  import ImagePicker from 'react-native-image-crop-picker';
  import Icon from 'react-native-vector-icons/Ionicons';
  import firestore from '@react-native-firebase/firestore';
  import storage from '@react-native-firebase/storage';
  import fireauth from '@react-native-firebase/auth';
  import DatePicker from 'react-native-date-picker'
  const AddVoucherAmount = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [amount,setAmount]=useState('');
    const [percent,setPercent]=useState('');
    const [max,setMax]=useState('');
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [enable, setEnable] = useState(false);
    const [date, setDate] = useState(new Date())
    const [open, setOpen] = useState(false)
    const [date1, setDate1] = useState(new Date())
    const [open1, setOpen1] = useState(false)
    const openCamera = () => {
      ImagePicker.openCamera({
        height: 350,
        width: 350,
      })
        .then(image => {
          setImage(image.path);
          setModalVisible(false);
        })
        .catch(e => {});
    };
    const openGalery = () => {
      ImagePicker.openPicker({
        mediaType: 'photo',
        cropperCircleOverlay: true,
      })
        .then(image => {
          setImage(image.path);
          setModalVisible(false);
        })
        .catch(e => {});
    };
    useEffect(()=>{
      if(title!=''&&content!=''&&amount!=''&&max!=''&&percent!=''&&image!=null)
        setEnable(true)
      else
        setEnable(false)
    },[title,content,image,max,percent,amount])
    const add=async()=>{
    const rd=Math.floor(Math.random() * 1000) + 1;
    const id=fireauth().currentUser.uid+rd+title;
    const uri = image;
    if(image!=null){
      try {
        await storage().ref(`imageVoucher/${title+'.png'}`).putFile(uri)
    } catch (e) {
        console.log(e)
    }
    await  firestore()
    .collection('Vouchers')
    .doc(id)
    .set({
      title:title,
      content:content,
      image:await storage().ref(`imageVoucher/${title+'.png'}`).getDownloadURL(),
      count:amount,
      max:parseInt(max),
      percent:parseFloat(percent)/100,
      type:'amount',
      start:date,
      end:date1,
    })
    .then(() => {
      setTitle('')
      setContent('')
      setImage(null)
      setAmount('')
      setMax('')
      setPercent('')
      setDate(new Date())
      setDate1(new Date())
      setEnable(false)
      ToastAndroid.show('Thêm thành công', ToastAndroid.LONG);
    });
  }}
  const onChangeAmount=(e)=>{
    const reg = new RegExp('^[0-9]+$');
    if(reg.test(e))
    setAmount(e)
    if(e=='')
    setAmount(e)
  }
  const onChangePercent=(e)=>{
    const reg = new RegExp('^[0-9]+$');
    if(reg.test(e))
    {
        if(parseInt(e)<=100&&parseInt(e)>0)
        setPercent(e)
    }
    if(e=='')
    setPercent(e)
  }
  const onChangeMax=(e)=>{
    const reg = new RegExp('^[0-9]+$');
    if(reg.test(e))
    {
        if(parseInt(e)<=50000&&parseInt(e)>0)
        setMax(e)
    }
    if(e=='')
    setMax(e)
  }
    return (
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-300}
        style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          nestedScrollEnabled={true}>
          <View
            style={{
              height: 250,
              backgroundColor: '#FEF2D6',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="close-outline"
              size={24}
              style={{position: 'absolute', left: 10, top: 10,zIndex:10,backgroundColor:'white',borderRadius:40}}
              onPress={() => {
                navigation.goBack();
              }}
            />
            {image != null && (
              <View>
                <Image
                  source={{uri: image}}
                  style={{height: 250, width: 400}}
                  resizeMode="center"
                />
                <Icon
                  name="camera-outline"
                  size={24}
                  style={{position: 'absolute', right: 15, bottom: 10}}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
              </View>
            )}
            {image == null && (
              <View>
                <Icon
                  name="camera-outline"
                  size={200}
                  onPress={() => {
                    setModalVisible(true);
                  }}
                />
              </View>
            )}
          </View>
          <View style={{paddingHorizontal: 16, paddingTop: 10}}>
            <Text style={{color: 'black'}}>Tiêu đề khuyến mãi</Text>
            <TextInput
              value={title}
              style={{
                borderColor: '#C5C5C5',
                borderWidth: 1,
                borderRadius: 10,
                marginVertical:10
              }}
              placeholder="Nhập tiêu đề khuyến mãi"
              onChangeText={setTitle}
            />
            <Text style={{color: 'black'}}>Nội dung</Text>
            <TextInput
              value={content}
              style={{
                borderColor: '#C5C5C5',
                borderWidth: 1,
                borderRadius: 10,
                height:150,
                textAlignVertical:'top',
                marginVertical:10
              }}
              multiline={true}
              placeholder="Nhập nội dung"
              onChangeText={setContent}
            />
            <Text style={{color: 'black'}}>Điều kiện số lượng sản phẩm</Text>
            <TextInput
              value={amount}
              style={{
                borderColor: '#C5C5C5',
                borderWidth: 1,
                borderRadius: 10,
                marginVertical:10
              }}
              maxLength={1}
              keyboardType='number-pad'
              placeholder="Nhập điều kiện số lượng sản phẩm"
              onChangeText={onChangeAmount}
            />
            <Text style={{color: 'black'}}>Phần trăm khuyến mãi</Text>
            <TextInput
              value={percent}
              keyboardType='number-pad'
              style={{
                borderColor: '#C5C5C5',
                borderWidth: 1,
                borderRadius: 10,
                marginVertical:10
              }}
              maxLength={3}
              placeholder="Nhập phần trăm khuyến mãi"
              onChangeText={onChangePercent}
            />
            <Text style={{color: 'black'}}>Số tiền khuyến mãi tối đa</Text>
            <TextInput
              value={max}
              style={{
                borderColor: '#C5C5C5',
                borderWidth: 1,
                borderRadius: 10,
                marginVertical:10
              }}
              maxLength={6}
              keyboardType='number-pad'
              placeholder="Nhập số tiền khuyến mãi tối đa"
              onChangeText={onChangeMax}
            />
            <Text style={{color: 'black'}}>Thời gian bắt đầu</Text>
            <View style={{flexDirection:'row', borderColor:'#C5C5C5',borderWidth:1, borderRadius:10,alignItems:'center',marginVertical:10}}>
                <View style={{height:45,backgroundColor:'white', borderRadius:10,flex:0.95,justifyContent:'center'}}>
                    <Text style={{marginLeft:10}}>{date.toUTCString()}</Text>
                </View>
                <Icon name='calendar-outline' size={24} onPress={()=>{setOpen(true)}}/>
            </View>
            <Text style={{color: 'black'}}>Thời gian kết thúc</Text>
            <View style={{flexDirection:'row', borderColor:'#C5C5C5',borderWidth:1, borderRadius:10,alignItems:'center',marginVertical:10}}>
                <View style={{height:45,backgroundColor:'white', borderRadius:10,flex:0.95,justifyContent:'center'}}>
                    <Text style={{marginLeft:10}}>{date1.toUTCString()}</Text>
                </View>
                <Icon name='calendar-outline' size={24} onPress={()=>{setOpen1(true)}}/>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: enable?Color.custom:'#C5C5C5',
                height: 50,
                borderRadius: 10,
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 40,
              }}
              disabled={!enable}
              onPress={() => {
                add();
              }}>
              <Text style={{color: 'white'}}>Thêm</Text>
            </TouchableOpacity>
            <View style={{height:30}}/>
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={{flex: 1, flexDirection: 'column-reverse'}}>
            <View style={{height: 300, backgroundColor: 'white'}}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  color: 'black',
                  alignSelf: 'center',
                  marginTop: 10,
                }}>
                Cập nhật ảnh
              </Text>
              <Text style={{fontSize: 14, alignSelf: 'center', marginTop: 4}}>
                Chọn ảnh thức uống
              </Text>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: Color.custom,
                  borderRadius: 10,
                  marginHorizontal: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 6,
                }}
                onPress={() => {
                  openCamera();
                }}>
                <Text style={{color: 'white'}}>Chụp ảnh</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: Color.custom,
                  borderRadius: 10,
                  marginHorizontal: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 6,
                }}
                onPress={() => {
                  openGalery();
                }}>
                <Text style={{color: 'white'}}>Chọn ảnh từ thư viện</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  height: 50,
                  backgroundColor: Color.custom,
                  borderRadius: 10,
                  marginHorizontal: 16,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 6,
                }}
                onPress={() => {
                  setModalVisible(false);
                }}>
                <Text style={{color: 'white'}}>Hủy</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <DatePicker
        modal
        minimumDate={date}
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false)
          setDate(date)
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />
      <DatePicker
        modal
        minimumDate={date1}
        open={open1}
        date={date1}
        onConfirm={(date) => {
          setOpen1(false)
          setDate1(date)
        }}
        onCancel={() => {
          setOpen1(false)
        }}
      />
      </KeyboardAvoidingView>
    );
  }
  
  export default AddVoucherAmount;
  
  const styles = StyleSheet.create({});
  