import React from 'react';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import UserStores from './stores/UserStores';

class LoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      buttonDisabled: false
    }
  }

  setInputValue(property, val){
    val = val.trim();
    if(val.length > 12){
      return;
    }
    this.setState({
      [property]: val
    })
  }
  
  resetForm(){
    this.setState({
      username: '',
      password: '',
      buttonDisabled: false
    })
  }

  async doLogin(){
    if(!this.state.username){
      return;
    }
    if(!this.state.password){
      return;
    }

    this.setState({
      buttonDisabled: true
    })

    try {
      let res = await fetch('/login',{
        method: 'post',
        headers:{
          'Accept':'application/json',
          'Content-Type':'application/json'
        },
        body: JSON.stringify({
          username: this.state.username,
          password: this.state.password
        })
      });

      let result = await res.json();
      if (result && result.success){
        UserStores.isLoggedIn = true;
        UserStores.username = result.username;
      }else if (result && result.success === false){
        this.resetForm();
        alert(result.msg);
      }

    } catch (e) {
      console.log(e);
      this.resetForm();
    }
  }

  render(){
    return (
      <div className="loginForm">
        Firstname
        <InputField
          type = 'text'
          placeholder = 'Firstname'
          value={this.state.username ? this.state.username:''}
          onChange={(val) => this.setInputValue('username', val)}
        />


        Lastname
        <InputField
          type = 'text'
          placeholder = 'Firstname'
          value={this.state.username ? this.state.username:''}
          onChange={(val) => this.setInputValue('username', val)}
        />

        Email
        <InputField
          type = 'text'
          placeholder = 'Firstname'
          value={this.state.username ? this.state.username:''}
          onChange={(val) => this.setInputValue('username', val)}
        />

        Password
        <InputField
          type = 'password'
          placeholder = 'Password'
          value={this.state.password ? this.state.password:''}
          onChange={(val) => this.setInputValue('password', val)}
        />

        PhoneNumber
        <InputField
          type = 'text'
          placeholder = 'Firstname'
          value={this.state.username ? this.state.username:''}
          onChange={(val) => this.setInputValue('username', val)}
        />

        <SubmitButton 
          text='Login'
          disabled = {this.state.buttonDisabled}
          onClick = {() => this.doLogin()}
        />
      </div>
    );
  }
}

export default LoginForm;
