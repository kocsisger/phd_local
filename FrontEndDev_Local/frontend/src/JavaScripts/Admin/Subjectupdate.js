
import '../../Style/Sbchange.css';
import axios from "axios";
import React, { Component } from 'react';

const Params = new URLSearchParams(window.location.search);

class Subjectupdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            tstatus: '',
            subject: '',
            stdName: '',
            state: -1,
            tname: '',
            valid: false,

        }
    }

    async componentDidMount() {

        axios.get('http://localhost:50111/api/posts/' + Params.get('uid') + '/' + Params.get('pid'))
            .then(res => {
                if (res.data === "error" || res.data.length === 0) {
                    this.setState({
                        state: -2
                    })
                    console.log("Cannot find post")
                }
                else {
                    const data = res.data;
                    this.setState({
                        state: data[0].state,
                        tname: data[0].oktato,
                        subject: data[0].targy
                    })

                    axios.get('http://localhost:50111/api/getusers/' + Params.get('uid'))
                        .then(res => {
                            if (res.data === "error" || res.data.length === 0) {
                                this.setState({
                                    state: -2
                                })
                                console.log("Cannot find post")
                            }
                            this.setState({
                                stdName: res.data
                            })


                            axios.get('http://localhost:50111/api/nameandemail/' + Params.get('aid'))
                            .then(res => {
                                const data = res.data;
                                const Name = data[0].TeacherName
                                if (Name === this.state.tname) {
                                    this.setState({
                                        valid: true
                                    })
                                }
                            })



                        })


                   
                }

            })

    }



    SubmitHandler = e => {
        axios.patch('http://localhost:50111/api/subjectupdate/teacher/' + Params.get('uid') + '/' + Params.get('pid') + '/' + Params.get('key'), this.state)
            .then(response => {
                if (response.data === "success") {
                    this.setState({
                        state: 1
                    })
                }


            })
            .catch(error => {
                console.log(error)
            })
        e.preventDefault()
    }



    render() {

        if (this.state.valid && this.state.state === 0) {
            return (

                <div className="centered">
                    <style>{'body { background-color: #EBECF0; }'}</style>
                    <div className="limiter">
                        <div className="container-login">
                            <div className="wrap-login">
                                <span className="login-form-title">
                                    Oktató: {this.state.tname}<br></br>
                                    Hallgató: {this.state.stdName}<br></br>
                                    Tárgy: {this.state.subject}<br></br><br></br>
                                    Elfogadja a tárgyfelvételt?
                                 </span>

                                <form onSubmit={this.SubmitHandler} className="sbtform">
                                    <button className="btnno" type="submit"
                                        onClick={() => {
                                            this.setState({
                                                tstatus: "Declined",

                                            })
                                        }} >
                                        Nem</button>
                                    <button className="btnyes" type="submit" onClick={() => {
                                        this.setState({
                                            tstatus: "Accepted",

                                        })
                                    }}>Igen</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            );
        }
        else if (this.state.valid && (this.state.state === 1 || this.state.state === 2)) {
            return (
                <div className="centered">
                    <style>{'body { background-color: #EBECF0; }'}</style>
                    <div className="limiter">
                        <div className="container-login">
                            <div className="wrap-login">
                                <span className="login-form-title">
                                    Nyilatkozat tétel megtörtént.
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
        else if (this.state.state === -2) {
            return (
                <div className="centered">
                    <style>{'body { background-color: #EBECF0; }'}</style>
                    <div className="limiter">
                        <div className="container-login">
                            <div className="wrap-login">
                                <span className="login-form-title">
                                    Cannot find post.
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        } else {

            return (
                <div className="centered">
                    <style>{'body { background-color: #EBECF0; }'}</style>
                    <div className="limiter">
                        <div className="container-login">
                            <div className="wrap-login">
                                <span className="login-form-title">
                                    Loading
                        </span>
                            </div>
                        </div>
                    </div>
                </div>
            );

        }


    }

}

export default Subjectupdate;
