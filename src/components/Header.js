import { Link } from "react-router-dom";
import React from 'react'
import logo from '../logo.svg';

const Header = () => {
    return(
        <div style={{width:"100%", height:"80px", backgroundColor:'#242424', borderBottom:'1px solid #363636', display:'flex'}}>
            <img src={logo} style={{padding: 20}} alt="Logo" />
            <Link to="/" style={{fontSize:20, color: '#ffffff', fontFamily:'Gill Sans', alignSelf:'center', marginLeft:'20px', textDecoration: 'none'}}>Special Crabs</Link>   
            <Link to="/stats" style={{fontSize:20, color: '#ffffff', fontFamily:'Gill Sans', alignSelf:'center', marginLeft:'20px', textDecoration: 'none'}}>Stats Table</Link>  
        </div>
    )
}

export default Header;