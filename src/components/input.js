import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Input = ({label, iconName, error, password, ...props}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  return (
    <View style={{marginBottom: 19, borderRadius: 10, height: 50, flex: 1}}>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error ? 'red' : '#4FC4F5',
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{color: '#BABBC3', fontSize: 16, marginRight: 5}}
        />
        <TextInput
          secureTextEntry={hidePassword}
          style={{color: '#000', flex: 1, fontSize: 16, paddingVertical: 7}}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{color: '#BABBC3', fontSize: 22}}
          />
        )}
      </View>
      {error && <Text style={{color: 'red', fontSize: 12}}> {error}</Text>}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 14,
    color: '#F3F4FB',
  },
  inputContainer: {
    // flex: 1,
    height: 45,
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderWidth: 1.5,
    borderRadius: 5,
    borderColor: '#4FC4F5',
  },
});

export default Input;
/* */
