import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {Button} from 'react-native-elements';
import Axios from 'axios';

export interface LoginProps {
}

export interface LoginState {
}

export default class LoginComponent extends React.Component<LoginProps, LoginState> {
     constructor(props: LoginProps) {
    super(props);
    this.state = {
    };
  }

  login() {
    Axios.post('https://www.aukweb.net/members/?action=logout', 'memno=17370&password=xr9hng&login=Login')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getMember() {
    Axios.get('https://www.aukweb.net/members/results')
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  logOut() {
    let data = new FormData();
    data.append("logout", "Logout");
    Axios.post('https://www.aukweb.net/members/?action=logout',data)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  public render() {
    return (
      <View style={{paddingTop:50}}>
         <Text>Login Component</Text>
         <Button onPress={this.login} title="Login"></Button>
         <Button onPress={this.getMember} title="Member"></Button>
         <Button onPress={this.logOut} title="Logout"></Button>
      </View>
    );
  }
}