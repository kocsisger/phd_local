class Auth {

    loggedInUser(Status) {
      sessionStorage.setItem('LoginStatusUser',Status);
    }
  
    isAuthenticatedUser() {
      return sessionStorage.getItem('LoginStatusUser');
    }
  }
  
  export default new Auth();
  