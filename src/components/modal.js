import { StyleSheet, Text, View, Modal, ScrollView } from 'react-native'
import React from 'react'

export default modal = () => {
const [modalVisible, setModalVisible] = useState(false);
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text>abs</Text>
          {/* {arrProduct.map((item, index) => (
            <View key={index}>
              <OrderDetail item={item} />
            </View>
          ))} */}
          <View height={70} />
        </ScrollView>

      </View>
    </Modal>
  )
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F5F5F5',

    shadowColor: '#000',
    elevation: 5,
    height: '95%',
  },
  closeBtn: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignSelf: 'center',
    bottom: 15,
    transparent: true,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})