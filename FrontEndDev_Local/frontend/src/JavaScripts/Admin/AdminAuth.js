class Auth {
    loggedIn(Status) {
      sessionStorage.setItem("LoginStatusAdmin", Status);
    }
  
    isAuthenticated() {
      return sessionStorage.getItem("LoginStatusAdmin");
    }
  }
  
  export default new Auth();
  