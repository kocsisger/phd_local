import React, { Component } from 'react';
import axios from 'axios';
import '../../../Style/App.css';

class PostRegAdminForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            startDate: undefined,
            endDate: undefined,
            id: undefined,
            errorChange: false,
            startDateError: false,
            succes: false,
            serverError: false,
        }
    }

    changeHandlerStartDate = (e) => {
        if(this.state.id === undefined){
            this.setState({
                startDate: e.target.value,
                endDate : this.props.semesterData.endDate,
                errorChange: false,
                startDateError: false,
                succes: false,
                serverError: false,
                id: this.props.semesterData._id
            })
        }
        this.setState({
            [e.target.name]: e.target.value,
            errorChange: false,
            succes: false,
            startDateError: false,
            serverError: false
        })
    }

    changeHandlerEndDate = (e) => {
        if(this.state.id === undefined){
            this.setState({
                endDate : e.target.value,
                startDate : this.props.semesterData.startDate,
                errorChange: false,
                startDateError: false,
                succes: false,
                serverError: false,
                id: this.props.semesterData._id
            })
        } else {
            this.setState({
                [e.target.name]: e.target.value,
                startDateError: false,
                succes: false,
                serverError: false,
                errorChange: false
            })
        }
    }

    SubmitHandler = e => {
        e.preventDefault();
        if (this.state.id === undefined) {
            this.setState({ errorChange : true, startDateError: false, serverError: false, succes: false })
        } else if(this.state.startDate >= this.state.endDate){
            this.setState({ startDateError : true, succes: false, serverError: false, errorChange : false})
        } else {
            axios.post('http://localhost:50111/api/editsemester', this.state)
                .then(response => {
                    this.setState({succes: true, errorChange : false, serverError: false, startDateError: false})
                })
                .catch(error => {
                    this.setState({serverError: true, succes: false, errorChange : false, startDateError: false})
                })
        }
    }

    render() {
        var content;
        const errorC = this.state.errorChange ? <span className="error-mess">&#x2612; No change detected!</span> : null;
        const errorS = this.state.startDateError ? <span className="error-mess">&#x2612; The start date cannot be greater than or equal with the end date!</span> : null;
        const succesM =  this.state.succes ? <span className="succes-mess">&#9745; Success Subject Registration period created!</span> : null;
        const errorServer =  this.state.serverError ? <span className="error-mess">&#x2612; Server error occurred! Subject Registration period creation failed!</span> : null;
        if (this.props.semesterData._id !== undefined) {
            const { startDate, endDate } = this.state
            content = <form onSubmit={this.SubmitHandler}>
                <ul className="list-input">
                    <li>
                        <div>
                            <span className="txt1">
                                Period Start Date:
                            </span>
                        </div>
                        <div className="wrap-inputa">
                            <input className="inputa" type="date" name="startDate" defaultValue={this.props.semesterData.startDate} createref={startDate} onChange={this.changeHandlerStartDate} required />
                        </div>
                    </li>
                </ul>
                <br />
                <div>
                </div>
                <ul className="list-input">
                    <li>
                        <span className="txt1">
                            Period End Date:
                        </span>
                        <div className="wrap-inputa">
                            <input className="inputa" type="date" name="endDate" defaultValue={this.props.semesterData.endDate} createref={endDate} onChange={this.changeHandlerEndDate} required />
                        </div>
                    </li>
                </ul>
                <br />
                <ul className="list-input">
                    <li>
                        <div className="container-login-form-btna">
                            <button type="submit" className="login-form-btna">
                                Register
                            </button>
                        </div>
                    </li></ul>
            </form>
        } else {
            content = <ul className="list-input">
                <li>
                    <div className="container-login-form-btna">
                        <h5>Loading...</h5>
                    </div>
                </li>
            </ul>;
        }

        return (
            <div>
                <br />
                { errorServer }
                { succesM }
                { errorC }
                { errorS }
                <br />
                { content}
            </div>
        )
    }
}

export default PostRegAdminForm;