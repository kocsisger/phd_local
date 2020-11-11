import React from "react";
import { Route, Redirect } from "react-router-dom";
import auth from './AdminAuth';
import AdminData from './AdminDataGetSet';
import axios from 'axios';

function refreshPage() {
  window.location.reload(false)
}

async function Check(){
   const token = ({token:auth.isAuthenticated()});
   await axios.post('http://localhost:50111/api/adminlogin/allow/'+ AdminData.GetAdminID(),token).then(() =>{
  }).catch(error => {
    sessionStorage.clear();
    refreshPage();
    })}

export const SecuredRouteAsAdmin = ({
    component: Component,
    ...rest
  }) => {
    return (
      <Route
        {...rest}
        render={props => {
           if (auth.isAuthenticated() != null && AdminData.GetAdminID() != null) {
              Check();
              return <Component {...props} />;
            }  else {
            return (
              <Redirect
                to={{
                  pathname: "/adminlogin",
                }}
              />
            );
          }
        }}
      />
    );
  };