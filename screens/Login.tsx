import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import {Button} from 'react-native-elements';
import Axios from 'axios';
import { apiAudax, IapiAudax } from '../services/apiAudax';
import { Login } from '../models/login';

export interface LoginProps {
}

export interface LoginState {
  loggedIn : boolean
}

export default class LoginComponent extends React.Component<LoginProps, LoginState> {

    audaxService : IapiAudax;

    constructor(props: LoginProps) {     
    super(props);
    this.state = {
      loggedIn : false
    };
    this.audaxService  = new apiAudax();
    this.login = this.login.bind(this);
  }

   login() {
    let customerDetails = new Login();
    customerDetails.login = 'Login';
    customerDetails.membershipNumber = '17370';
    customerDetails.password = 'xr9hng';
    this.audaxService.login(customerDetails).then((data)=>{ this.setState({loggedIn : data});});
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
         <Button onPress={()=>{this.login()}} title="Login"></Button>
         <Button onPress={this.getMember} title="Member"></Button>
         <Button onPress={()=>{this.logOut()}} title="Logout"></Button>
         <Text>The state is : {this.state.loggedIn.toString()} *</Text>        
      </View>
    );
  }
}