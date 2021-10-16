import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {primary} from '../utils/GlobalStyle';

const SignupScreen = ({navigation}) => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const [data, setData] = useState(initialState);

  const handleChange = (key, value) => {
    setData({...data, [key]: value});
  };

  const handleSubmit = () => {
    console.log(data);
    setData(initialState);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        // labelValue={firstName}
        onChangeText={text => handleChange('firstName', text)}
        placeholderText="First Name"
        iconType="form"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        // labelValue={lastName}
        onChangeText={text => handleChange('lastName', text)}
        placeholderText="lastName"
        iconType="form"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        // labelValue={email}
        onChangeText={text => handleChange('email', text)}
        placeholderText="Email"
        iconType="mail"
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

      {/* <FormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      /> */}

      <FormButton buttonTitle="Sign Up" onPress={() => handleSubmit()} />

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.navButtonText}>Have an account? Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: primary,
    fontFamily: 'Lato-Regular',
  },
});
