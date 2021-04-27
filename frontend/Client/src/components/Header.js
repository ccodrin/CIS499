import React, { Component } from 'react'
import {Link} from 'react-scroll'

export default class Header extends Component {

    state = {
        backgroundColor: 'transparent',
        color: 'white'
      }
    
      listenScrollEvent = e => {
        if (window.scrollY > 300) {
          this.setState({backgroundColor: 'rgba(45, 48, 45, 0.970)', color: 'white'})
        } else {
          this.setState({backgroundColor: 'transparent', color: 'white'})
        }
      }
    
      componentDidMount() {
        window.addEventListener('scroll', this.listenScrollEvent)
      }
   
    render() {
        return (

            <div className= "container-fluid" id = "headerContainer" style={{backgroundColor: this.state.backgroundColor, color: this.state.color}}>
            <ul style={{display: 'flex', listStyle: 'none', justifyContent: 'space-around'}} id = "headerUl">
          <li><Link activeClass="active" to="home" spy={true} smooth={true} id = "headerLi">Home</Link></li>
          <li><Link  to="about" spy={true} smooth={true} id = "headerLi">About</Link></li>
          <li><Link  to="team" spy={true} smooth={true} id = "headerLi">Team</Link></li>
          <li><Link  to="faq" spy={true} smooth={true} id = "headerLi">FAQ</Link></li>
          <li><Link  to="contact" spy={true} smooth={true} id = "headerLi">Contact</Link></li>
            </ul>
            </div>
        )
    }
}