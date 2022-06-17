import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../common/Color';
import {useNavigation, useRoute} from '@react-navigation/native';
import ItemProduct from '../components/itemProduct';
import ItemUser from '../components/itemUser';
const SearchEmployee = () => {
  const navigation = useNavigation();
  const router = useRoute();
  // console.log(router.params.data.params)
  const [data, setData] = useState([]);
  const inputRef = useRef();
  function removeAccents(str) {
    var AccentsMap = [
      'aàảãáạăằẳẵắặâầẩẫấậ',
      'AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ',
      'dđ',
      'DĐ',
      'eèẻẽéẹêềểễếệ',
      'EÈẺẼÉẸÊỀỂỄẾỆ',
      'iìỉĩíị',
      'IÌỈĨÍỊ',
      'oòỏõóọôồổỗốộơờởỡớợ',
      'OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ',
      'uùủũúụưừửữứự',
      'UÙỦŨÚỤƯỪỬỮỨỰ',
      'yỳỷỹýỵ',
      'YỲỶỸÝỴ',
    ];
    for (var i = 0; i < AccentsMap.length; i++) {
      var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
      var char = AccentsMap[i][0];
      str = str.replace(re, char);
    }
    return str;
  }
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  const convertPosition = text => {
    // console.log(text)
    const staff = 'nhan vien';
    const shipper = 'van chuyen';
    const admin = 'quan ly';
    if (staff.includes(text)) return 'staff';
    if (shipper.includes(text)) return 'shipper';
    if (admin.includes(text)) return 'admin';
    // if(item?.type === 'staff')
    //   return 'Nhân viên'
    // else if(item?.type === 'shipper')
    //   return 'vận chuyển'
    // else return 'quản lý'
    return null;
  };
  const search = text => {
    const arrSearch = [];
    if (text != '') {
      const temp = router.params.data.params.filter(
        e => e.username.toLowerCase().indexOf(text.toLowerCase()) > -1,
      );
      temp.forEach(element => {
        arrSearch.push(element);
      });

      try {
        const temp1 = router.params.data.params.filter(
          e =>
            e?.type.toLowerCase().indexOf(convertPosition(text).toLowerCase()) >
            -1,
        );
        temp1.forEach(e => {
          if (!arrSearch.includes(e)) arrSearch.push(e);
        });
      } catch (error) {}
      // console.log(router.params.data.params)
      
       try {
        const temp1 = router.params.data.params.filter(
          e =>
            e?.request.toLowerCase().indexOf(convertPosition(text).toLowerCase()) >
            -1,
        );
        temp1.forEach(e => {
          if (!arrSearch.includes(e)) arrSearch.push(e);
        });
      } catch (error) {}
      setData(arrSearch);
    } else {
      setData([]);
    }
  };
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <View
        style={{
          height: 65,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'row',
          marginHorizontal: 16,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 40,
            backgroundColor: '#F5F5F5',
            borderRadius: 5,
            width: '85%',
          }}>
          <Icon name="search-outline" size={24} style={{marginLeft: 15}} />
          <TextInput
            placeholder="Tìm kiếm"
            style={{width: '88%'}}
            onChangeText={search}
            ref={inputRef}
          />
        </View>
        <Text
          style={{width: '15%', paddingLeft: 10, color: Color.custom}}
          onPress={() => {
            navigation.goBack();
          }}>
          Hủy
        </Text>
      </View>
      <View style={{height: 0.7, backgroundColor: '#F5F5F5'}} />
      <ScrollView>
        {data.map((item, index) => {
          return <ItemUser item={item} index={index} key={item.uid} />;
        })}
        <View style={{height: 180}}></View>
      </ScrollView>
      {/* <FlatList
        style={{marginTop:10}}
        data={data}
        renderItem={({item, index})=><ItemUser item={item} index={index} key={item.uid}/>}
        keyExtractor={item=>item+item.name}
        /> */}
    </View>
  );
};

export default SearchEmployee;

const styles = StyleSheet.create({});
