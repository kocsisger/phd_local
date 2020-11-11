
class UserData {
    GetUserFirstName() {
      return sessionStorage.getItem('UserFirstName');
    }
  
    SetUserFistName(firstname) {
      sessionStorage.setItem('UserFirstName', firstname);
    }

    GetUserLastName() {
      return sessionStorage.getItem('UserLastName');
    }
  
    SetUserLastName(lastname) {
      sessionStorage.setItem('UserLastName', lastname);
    }

    GetUserEmail() {
      return sessionStorage.getItem('UserEmail');
    }
  
    SetUserEmail(UserEmail) {
      sessionStorage.setItem('UserEmail', UserEmail);
    }

    GetUserPhoneNumber() {
      return sessionStorage.getItem('PhoneNumber');
    }
  
    SetUserPhoneNumber(Phone) {
      sessionStorage.setItem('PhoneNumber', Phone);
    }

    GetUserUserName() {
      return sessionStorage.getItem('UserUserName');
    }
  
    SetUserUserName(UserUserName) {
      sessionStorage.setItem('UserUserName', UserUserName);
    }

    GetUserDoctoralProgram() {
      return sessionStorage.getItem('DoctoralProgram');
    }
  
    SetUserDoctoralProgram(DoctoralProgram) {
      sessionStorage.setItem('DoctoralProgram', DoctoralProgram);
    }

    GetUserNeptunCode() {
      return sessionStorage.getItem('NeptunCode');
    }
  
    SetUserNeptunCode(NeptunCode) {
      sessionStorage.setItem('NeptunCode', NeptunCode);
    }

    GetUserSupervisor() {
      return sessionStorage.getItem('Supervisor');
    }
  
    SetUserSupervisor(Supervisor) {
      sessionStorage.setItem('Supervisor', Supervisor);
    }

    GetUserCourseType() {
      return sessionStorage.getItem('CourseType');
    }
  
    SetUserCourseType(CourseType) {
      sessionStorage.setItem('CourseType', CourseType);
    }

    GetUserSemester() {
      return sessionStorage.getItem('Semester');
    }
  
    SetUserSemester(Semester) {
      sessionStorage.setItem('Semester', Semester);
    }

    GetUserProgramDirector() {
      return sessionStorage.getItem('ProgramDirector');
    }
  
    SetUserProgramDirector(ProgramDirector) {
      sessionStorage.setItem('ProgramDirector', ProgramDirector);
    }

    GetUserID() {
      return sessionStorage.getItem('ID');
    }
  
    SetUserID(ID) {
      sessionStorage.setItem('ID', ID);
    }

  }
  
  export default new UserData();