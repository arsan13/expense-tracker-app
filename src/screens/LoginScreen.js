import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {primary} from '../utils/GlobalStyle';

const LoginScreen = ({navigation, handleToken}) => {
  let initialState = {email: '', password: ''};
  const [data, setData] = useState(initialState);

  const handleChange = (key, value) => {
    setData({...data, [key]: value});
  };

  const handleSubmit = () => {
    console.log(data);
    setData(initialState);
    handleToken('my Token');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
      />
      <Text style={styles.text}>Expense Tracker</Text>

      <FormInput
        // labelValue={email}
        onChangeText={text => handleChange('email', text)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        // labelValue={password}
        onChangeText={text => handleChange('password', text)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormButton buttonTitle="Sign In" onPress={() => handleSubmit()} />

      <TouchableOpacity
        style={styles.forgotButton}
        onPress={() => navigation.navigate('Sign-up')}>
        <Text style={styles.navButtonText}>
          Don't have an acount? Create here
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: primary,
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: primary,
    fontFamily: 'Lato-Regular',
  },
});
