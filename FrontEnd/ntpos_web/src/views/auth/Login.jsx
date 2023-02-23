import React, { useState, useEffect } from "react";
import './login.scss'
import bg from '../../assets/images/bg.svg'
import avatar from '../../assets/images/avatar.svg'
import wave from '../../assets/images/wave.png'
import PropTypes from 'prop-types';

// async function loginUser(credentials) {
//     return fetch('http://localhost:8080/login', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(credentials)
//     })
//         .then(data => data.json())
// }

export default function Login({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        const inputs = document.querySelectorAll(".input");
        function addcl() {
            let parent = this.parentNode.parentNode;
            parent.classList.add("focus");
        }
        function remcl() {
            let parent = this.parentNode.parentNode;
            if (this.value == "") {
                parent.classList.remove("focus");
            }
        }
        inputs.forEach(input => {
            input.addEventListener("focus", addcl);
            input.addEventListener("blur", remcl);
        });
    });
    // const handleSubmit = async e => {
    //     e.preventDefault();
    //     const token = await loginUser({
    //         username,
    //         password
    //     });
    //     setToken(token);
    // }
    function handleSubmit() {
        console.log(username);
        console.log(password);
    }

    return <section>
        <img class="wave" src={wave} />
        <div class="container">
            <div class="img">
                <img src={bg} />
            </div>
            <div class="login-content">
                <form action="#">
                    <img src={avatar} />
                    <h2 class="title">Welcome</h2>
                    <div class="input-div one">
                        <div class="i">
                            <i class="fas fa-user"></i>
                        </div>
                        <div class="div">
                            <h5>Username</h5>
                            <input type="text" class="input" onChange={e => setUserName(e.target.value)} />
                        </div>
                    </div>
                    <div class="input-div pass">
                        <div class="i">
                            <i class="fas fa-lock"></i>
                        </div>
                        <div class="div">
                            <h5>Password</h5>
                            <input type="password" class="input" onChange={e => setPassword(e.target.value)} />
                        </div>
                    </div>
                    <a href="#">Forgot Password?</a>
                    <input type="submit" onClick={handleSubmit} class="btn" value="Login" />
                </form>
            </div>
        </div>
    </section>;
}
// Login.propTypes = {
//     setToken: PropTypes.func.isRequired
// };