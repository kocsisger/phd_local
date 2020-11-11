class AdminData {
    SetAdminID(ID) {
      sessionStorage.setItem('AdminID', ID);
    }

    GetAdminID() {
        return sessionStorage.getItem('AdminID');
    }

    SetAdminFirstname(firstname) {
        sessionStorage.setItem('AdminFirstname', firstname);
    }

    GetAdminFirstname() {
        return sessionStorage.getItem('AdminFirstname');
    }

    SetAdminLastname(lastname) {
        sessionStorage.setItem('AdminLastname', lastname);
    }

    GetAdminLastname() {
        return sessionStorage.getItem('AdminLastname');
    }

    SetAdminEmail(email) {
        sessionStorage.setItem('AdminEmail', email);
    }

    GetAdminEmail() {
        return sessionStorage.getItem('AdminEmail');
    }

    SetAdminUserName(username) {
        sessionStorage.setItem('AdminUsername', username);
    }

    GetAdminUserName() {
        return sessionStorage.getItem('AdminUsername');
    }
  }
  
  export default new AdminData();