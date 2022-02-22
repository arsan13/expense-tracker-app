import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {primaryColor, globalStyle} from '../utils/GlobalStyle';
import {postService} from '../utils/Api';
import Loading from '../components/Loading';

const LoginScreen = ({navigation, handleToken}) => {
  let initialState = {email: '', password: ''};
  const [data, setData] = useState(initialState);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setData({...data, [key]: value});
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validation
    if (data.email.trim() == '' || data.password.trim() == '') {
      setErrMsg('All the fields are mandatory');
      setIsLoading(false);
      return;
    }

    const res = await postService('LOGIN_API', '', data);
    if (res.token !== undefined) {
      setData(initialState);
      setIsLoading(false);
      handleToken('Bearer '.concat(res.token));
    } else {
      if (res !== 'Network Error') setErrMsg('Invalid credentials');
      else setErrMsg('You are not connected to the internet.');
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Loading />
        </View>
      ) : (
        <View style={styles.container}>
          <Image
            source={require('../assets/images/logo.png')}
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

          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.error}>{errMsg}</Text>
          )}

          <FormButton buttonTitle="Sign In" onPress={() => handleSubmit()} />

          <TouchableOpacity
            style={styles.forgotButton}
            onPress={() => navigation.navigate('Sign-up')}>
            <Text style={styles.navButtonText}>
              Don't have an acount? Create here
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
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
    color: primaryColor,
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
    color: primaryColor,
    fontFamily: 'Lato-Regular',
  },
});
