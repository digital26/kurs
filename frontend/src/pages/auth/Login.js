import React, {useState, useEffect} from "react";
import {auth, googleAuthProvider} from '../../firebase';
import {toast} from 'react-toastify'; //instalirano 15.3.
import {Button} from "antd";
import { MailOutlined, GoogleOutlined } from '@ant-design/icons';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {createOrUpdateUser} from "../../functions/auth";



const Login = ({history}) => {
    const [email, setEmail] = useState('bozag1994@gmail.com');
    const [password, setPassword] = useState('123456789');
    const [loading, setLoading] = useState(false);

    const {user} = useSelector((state) => ({...state}));
    
    useEffect(() => {
        if(user && user.token) history.push("/");
    }, [user]);

    let dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
       //console.table(email, password);
       try{
            const result = await auth.signInWithEmailAndPassword(email, password);
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();

            createOrUpdateUser(idTokenResult.token)
            .then((res) => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name, 
                        email: user.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id,
                    },
            });
        })
            .catch();
            history.push('/');
       }catch(error){
           console.log(error);
           toast.error(error.message);
           setLoading(false);
       }
    };

    const googleLogin = () => {
        auth.signInWithPopup(googleAuthProvider)
        .then(async (result) => {
            const {user} = result;
            const idTokenResult = await user.getIdTokenResult();
            createOrUpdateUser(idTokenResult.token)
            .then((res) => {
                dispatch({
                    type: 'LOGGED_IN_USER',
                    payload: {
                        name: res.data.name, 
                        email: user.email,
                        token: idTokenResult.token,
                        role: res.data.role,
                        _id: res.data._id,
                    },
            });
        })
            .catch();
        history.push('/');
        })
        .catch((err) => {
            console.log(err);
            toast.error(err.messaage);
        });
    };

    const loginForm = () => {
        return(
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" className="form-control" value={email} 
                onChange={(e) => setEmail(e.target.value)} placeholder="Your email" autoFocus />
            </div>   
            <div className="form-group">
                <input type="password" className="form-control" 
                value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tvoja sifra" autoFocus/>
            </div>
            <br />
            <Button 
                onClick={handleSubmit} 
                type="primary" 
                className="mb-3" 
                block 
                shape="round" 
                icon={<MailOutlined/>} 
                size="large" 
                disabled={!email || password.length <6}> 
                    Login with Email/Password
                </Button>
        </form>
        )};
    return(
        <div className="container p-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    {loading ? (<h4 className="text-danger"> Loading...</h4>) : (<h4> Login </h4>)}

                    {loginForm()}

                    <Button 
                        onClick={googleLogin} 
                        type="danger" 
                        className="mb-3" 
                        block 
                        shape="round" 
                        icon={<GoogleOutlined/>} 
                        size="large" > 
                        Login in with Google
                    </Button>

                    <Link to="/forgot/password" className="pomjeranjeDesno text-danger"> 
                        Zaboravio/la sifru 
                    </Link>
                </div>
            </div>
        </div>    
    );
};


export default Login;