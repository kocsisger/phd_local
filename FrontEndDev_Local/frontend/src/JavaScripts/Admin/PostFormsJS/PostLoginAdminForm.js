import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';
import '../../../Style/adminpage.css';
import auth from "../AdminAuth";
import AdminData from '../AdminDataGetSet';

class PostLoginAdminForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            pass: ''
        }
    }

    state = {
        redirect: false,
        error: false
    }

    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value,
            error:false })
    }
    SubmitHandler = e => {
        e.preventDefault()
        axios.post('http://localhost:50111/api/adminlogin', this.state)
            .then(response => {
                AdminData.SetAdminFirstname(response.data.firstname);
                AdminData.SetAdminLastname(response.data.lastname);
                AdminData.SetAdminEmail(response.data.email);
                AdminData.SetAdminID(response.data._id);
                AdminData.SetAdminUserName(response.data.username);
                auth.loggedIn(response.data.token);
                this.setState({ redirect: true })
            })
            .catch(error => {
                this.setState({error : true})
            })
    }

    render() {
        const { username, pass } = this.state;
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to='/UserSubjectsAdmin' />;
        }
        return (
            <form onSubmit={this.SubmitHandler}>
                {this.state.error &&
                    <div className="login-error">
                        &#x2612; Incorrect username or password.
                        </div>
                }
                <div>
                    <span className="txt1">
                        Username
						</span>
                </div>

                <div className="wrap-input">
                    <input className="input" type="text" name="username" value={username} onChange={this.changeHandler} required />
                </div>

                <br />

                <div>
                    <span className="txt1">
                        Password
						</span>
                </div>

                <div className="wrap-input">
                    <input className="input" type="password" name="pass" value={pass} onChange={this.changeHandler} required />
                </div>
                <div className="container-login-form-btn">
                    <button type="submit" className="login-form-btn">
                        Login
						</button>
                </div>
                <ul className="list-containeru">
                    <li>
                        <a className="link-forget" href="/ForgotPass">Forgot your password? </a>
                    </li>
                </ul>
            </form>
        )
    }
}

export default PostLoginAdminForm;
