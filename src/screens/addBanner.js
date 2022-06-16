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
    Alert,
  } from 'react-native';
  import React, {useState,useEffect} from 'react';
  import {useNavigation, useRoute} from '@react-navigation/native';
  import Color from '../common/Color';
  import ImagePicker from 'react-native-image-crop-picker';
  import Icon from 'react-native-vector-icons/Ionicons';
  import firestore from '@react-native-firebase/firestore';
  import storage from '@react-native-firebase/storage';
  import fireauth from '@react-native-firebase/auth';
  
  const AddBanner = () => {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [enable, setEnable] = useState(false);
    const createAlert = title =>
      Alert.alert('Có lỗi', title, [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
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
      if(title!=''&&content!=''&&image!=null)
        setEnable(true)
      else
        setEnable(false)
    },[title,content,image])
    const add=async()=>{
    const rd=Math.floor(Math.random() * 1000) + 1;
    const id=fireauth().currentUser.uid+rd;
    const uri = image;
    if(image!=null){
      try {
        await storage().ref(`imageBanner/${title+'.png'}`).putFile(uri)
    } catch (e) {
        console.log(e)
    }
    await  firestore()
    .collection('Banners')
    .doc(id)
    .set({
      
    })
    .then(() => {
      
    });
  }}
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
              style={{position: 'absolute', left: 10, top: 10}}
              onPress={() => {
                navigation.goBack();
              }}
            />
            {image != null && (
              <View>
                <Image
                  source={{uri: image}}
                  style={{height: 250, width: 450}}
                  resizeMode="center"
                />
                <Icon
                  name="camera-outline"
                  size={24}
                  style={{position: 'absolute', right: -10, bottom: -40}}
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
            <Text style={{color: 'black'}}>Tiêu đề quảng cáo</Text>
            <TextInput
              value={title}
              style={{
                borderColor: '#C5C5C5',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
              }}
              placeholder="Nhập tiêu đề quảng cáo"
              onChangeText={setTitle}
            />
            <Text style={{color: 'black', marginTop: 8}}>Nội dung</Text>
            <TextInput
              value={content}
              style={{
                borderColor: '#C5C5C5',
                borderWidth: 1,
                borderRadius: 10,
                marginTop: 10,
              }}
              maxLength={6}
              placeholder="Nhập nội dung"
              onChangeText={setContent}
            />
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
      </KeyboardAvoidingView>
    );
  }
  
  export default AddBanner;
  
  const styles = StyleSheet.create({});
  