import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FormInput from '../components/FormInput';
import FormButton from '../components/FormButton';
import {primaryColor, globalStyle} from '../utils/GlobalStyle';
import {postService} from '../utils/Api';
import Loading from '../components/Loading';

const SignupScreen = ({navigation}) => {
  const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [data, setData] = useState(initialState);
  const [errMsg, setErrMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (key, value) => {
    setData({...data, [key]: value});
  };

  const handleSubmit = async () => {
    setIsLoading(true);

    // Validation
    if (validate() === false) {
      setIsLoading(false);
      return;
    }

    delete data.confirmPassword;

    const res = await postService('REGISTER_API', '', data);
    if (res.token !== undefined) {
      setData(initialState);
      setIsLoading(false);
      navigation.goBack();
    } else {
      if (res !== 'Network Error') setErrMsg('Email alreday exists.');
      else setErrMsg('You are not connected to the internet.');
      setIsLoading(false);
    }
  };

  const validate = () => {
    if (
      data.firstName.trim().length === 0 ||
      data.lastName.trim().length === 0 ||
      data.email.trim().length === 0
    ) {
      setErrMsg('All the fields are mandatory');
      return false;
    }

    //Email
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(data.email) === false) {
      setErrMsg('Incorrect email address');
      return false;
    }

    if (data.password.length < 6) {
      setErrMsg('Password must be of atleast 6 characters');
      return false;
    }
    if (data.password !== data.confirmPassword) {
      setErrMsg('Passwords must match');
      return false;
    }

    return true;
  };

  return (
    <>
      {isLoading ? (
        <View style={styles.container}>
          <Loading />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <AntDesign name="adduser" size={25} color={primaryColor} />
            <Text style={styles.text}>Create an account</Text>
          </View>

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
            placeholderText="Last Name"
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

          <FormInput
            // labelValue={confirmPassword}
            onChangeText={text => handleChange('confirmPassword', text)}
            placeholderText="Confirm Password"
            iconType="lock"
            secureTextEntry={true}
          />

          {errMsg.trim().length !== 0 && (
            <Text style={globalStyle.error}>{errMsg}</Text>
          )}

          <FormButton buttonTitle="Sign Up" onPress={() => handleSubmit()} />

          <TouchableOpacity
            style={styles.navButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.navButtonText}>Have an account? Sign In</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 25,
    marginLeft: 5,
    color: primaryColor,
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: primaryColor,
    fontFamily: 'Lato-Regular',
  },
});
