import React from 'react';
import { observer } from 'mobx-react';
import UserStores from './stores/UserStores';
import LoginForm from './LoginForm';
import InputField from './InputField';
import SubmitButton from './SubmitButton';
import './App.css';

class App extends React.Component {

  async componentDidMount(){

    try {
      let res = await fetch('/isLoggedIn',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success){
        UserStores.loading = false;
        UserStores.isLoggedIn = true;
        UserStores.username = result.username;
      }else{
        UserStores.loading = false;
        UserStores.isLoggedIn = false;
      }


    } catch (e) {
        UserStores.loading = false;
        UserStores.isLoggedIn = false;
    }

  }


  async doLogout(){

    try {
      let res = await fetch('/logout',{
        method: 'post',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        }
      });

      let result = await res.json();

      if (result && result.success){
        UserStores.isLoggedIn = false;
        UserStores.username = '';
      }


    } catch (e) {
        console.log(e);
    }

  }

  render(){

    if(UserStores.loading){
      return(
        <div className="app">
          <div className="container">
            Loading, Please wait..
          </div>
        </div>
      )
    }else{
      if (UserStores.isLoggedIn){
        return(
          <div className="app">
            <div className="container">
              Welcome {UserStores.username};

              <SubmitButton
                text={'Log out'}
                disabled = {false}
                onClick = { ()=> this.doLogout()}
              />
            </div>
          </div>
        )
      }
    }

    return (
      <div className="app">
          <div className="container">
              <LoginForm />
          </div>
      </div>
    );
  }
}

export default observer(App);
