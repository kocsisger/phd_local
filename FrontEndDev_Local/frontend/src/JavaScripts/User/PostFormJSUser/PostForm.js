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
            langchecked: false
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
        
        
    }
    SubmitChangeHandler2 = (teacherId) => {
        const selectedTeacher = this.props.teachernames.find(teacher => teacher._id === teacherId)
        this.setState({
            oktato: selectedTeacher.TeacherName
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
            checked: !this.state.checked
        })
    }

    handleLangChange() {
        this.setState({
            langchecked: !this.state.langchecked
        })
    }


    SubmitHandler = e => {
            e.preventDefault()
            axios.post('http://localhost:50111/api/posts', this.state)
                .then(response => {
                    this.props.onPostSubmit(response.data)
                    window.alert("Successful subject registration!")
                })
                .catch(error => {
                    window.alert("This subject already exists!")
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
                <ul className="flex-outer">
                    <li className="formli">
                        <span>English subject:  <span className="paddinga"></span>
                        <input
                            type="checkbox"
                            className="CheckBoxUser"
                            checked={this.state.langchecked}
                            onChange={this.handleLangChange} /></span>
                    </li>
                    {lang}

                    <li className="formli">
                        <label>Teacher name: </label>
                        <label>{oktato}</label>
                    </li>
                   
                    <li className="formli">
                        <span>Different teacher: <span className="paddinga"></span> <input
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