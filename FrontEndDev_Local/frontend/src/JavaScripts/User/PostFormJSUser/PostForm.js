import React, { Component } from 'react';
import axios from 'axios';
import '../../../Style/App.css';
import Userdata from '../../User/UserDataGetSet';

class PostForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: Userdata.GetUserID(),
            targy: '',
            oktato: '',
            checked: false,
            langchecked: false,
            error: false,
            succes: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleLangChange = this.handleLangChange.bind(this);
    }

    componentDidMount() {
        this.SubmitChangeHandler(this.props.Subjectitems[0]._id)
    }


    changeHandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    SubmitChangeHandler = (targyId) => {
        if (this.state.checked) {
            this.setState({
                checked: !this.state.checked
            })
        }
        const selectedTargy = this.props.Subjectitems.find(targy => targy._id === targyId)
        if(!this.state.langchecked)
        {
            this.setState({
                oktato: selectedTargy.Teacher,
                targy: selectedTargy.Subject,
            })
        }
        else{
            this.setState({
                oktato: selectedTargy.Teacher,
                targy: selectedTargy.SubjectEN,
            })
        }
        this.setState({
            succes:false,
            error:false
        })
        
        
    }
    SubmitChangeHandler2 = (teacherId) => {
        const selectedTeacher = this.props.teachernames.find(teacher => teacher._id === teacherId)
        this.setState({
            oktato: selectedTeacher.TeacherName,
            succes:false,
            error:false
        })
    }



    handleChange() {
        if (this.state.checked) {
            const selectedTargy = this.props.Subjectitems.find(targy => targy.Subject === this.state.targy)
            if(!this.state.langchecked)
        {
            this.setState({
                oktato: selectedTargy.Teacher,
                targy: selectedTargy.Subject,
            })
        }
        else{
            this.setState({
                oktato: selectedTargy.Teacher,
                targy: selectedTargy.SubjectEN,
            })
        }
        }
        this.setState({
            checked: !this.state.checked,
            succes:false,
            error:false
        })
    }

    handleLangChange() {
        this.setState({
            langchecked: !this.state.langchecked,
            succes:false,
            error:false
        })
    }


    SubmitHandler = e => {
            e.preventDefault()
            axios.post('http://localhost:50111/api/posts', this.state)
                .then(response => {
                    this.props.onPostSubmit(response.data)
                    this.setState({succes : true, error:false})
                })
                .catch(error => {
                    this.setState({error : true, succes:false})
                })
    }

    render() {
        const { oktato } = this.state;
        const content = this.state.checked
            ? <li >
                <label className="formlabel">Teacher Name</label>
                <select className="kekselect" onChange={(e) => this.SubmitChangeHandler2(e.target.value)} value={this.state.value} required>
                    <option value="" selected disabled hidden> -- Please choose a teacher! -- </option>
                    {this.props.teachernames.map(item => (
                        <option key={item._id} name="oktato" value={item._id}>{item.TeacherName}</option>
                    ))}
                </select>
            </li>

            : null;

        const errorMessage = this.state.error ? <span className="error-mess">&#x2612; This subject already exist or the teacher name is not valid!</span> : null;
        const succesMessage = this.state.succes ? <span className="succes-mess">&#9745; Success subject registration!</span> : null;

        const lang = this.state.langchecked
            ?
            <li className="formli">
                <label className="formlabel">Subject title: </label>
                <select className="kekselect" onChange={(e) => this.SubmitChangeHandler(e.target.value)} value={this.state.value} required>
                    {this.props.Subjectitems.map(item => (
                        <option key={item._id} name="targy" value={item._id}>{item.SubjectEN}</option>
                    ))}
                </select>

            </li>

            :
            <li className="formli">
                <label className="formlabel">Subject title: </label>
                <select className="kekselect" onChange={(e) => this.SubmitChangeHandler(e.target.value)} value={this.state.value} required>
                    {this.props.Subjectitems.map(item => (
                        <option key={item._id} name="targy" value={item._id}>{item.Subject}</option>
                    ))}
                </select>

            </li>
            ;
        return (
            <form onSubmit={this.SubmitHandler} className="formclass">
                {errorMessage}
                {succesMessage}
                <ul className="flex-outer">
                    <li className="formli">
                        <span>English subject: <input
                            type="checkbox"
                            className="CheckBoxUser"
                            checked={this.state.langchecked}
                            onChange={this.handleLangChange} /></span>
                    </li>
                    {lang}

                    <li className="formli">
                        <label>Teacher Name: </label>
                        <label>{oktato}</label>
                    </li>
                   
                    <li className="formli">
                        <span>Different teacher: <input
                            type="checkbox"
                            className="CheckBoxUser"
                            checked={this.state.checked}
                            onChange={this.handleChange} /></span>
                    </li>
                    {content}
                    <li className="formli">
                        <span><button className="submitbutton" type="submit">Register</button></span>
                    </li>
                </ul>
            </form>
        )
    }

}
export default PostForm;