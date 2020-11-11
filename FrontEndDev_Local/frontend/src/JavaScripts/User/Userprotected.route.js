import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from './UserAuth';
import axios from 'axios';
import UserData from './UserDataGetSet';

function refreshPage() {
  window.location.reload(false)
}

async function Check(){
   const token = ({token:auth.isAuthenticatedUser()});
   await axios.post('http://localhost:50111/api/userlogin/allow/'+ UserData.GetUserID(),token).then(() =>{
  }).catch(error => {
    sessionStorage.clear();
    refreshPage();
    })}

export const SecuredRouteAsUser = ({
    component: Component,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => {
            if (auth.isAuthenticatedUser() != null && UserData.GetUserID() != null) {
              Check();
              return <Component {...props} />;
            } else {
              return (
                <Redirect
                  to={{
                    pathname: "/userlogin",
                  }}
                />
              );
            }  
        }}
      />
    );
  };