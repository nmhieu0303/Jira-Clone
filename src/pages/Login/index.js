import React from 'react'
import { Input, Button, Checkbox, Typography, Divider } from 'antd';
import styles from './style.module.scss'
import { FacebookFilled, GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { withFormik } from 'formik';
import { connect } from 'react-redux'
import * as Yup from 'yup';
import { signinRequestAction } from '../../redux/actions/UserActions';
import {NavLink} from 'react-router-dom'
import { ROUTE_PATHS } from '../../utils/constant/router';

const { Title } = Typography;
const Login = (props) => {
    const { errors, handleSubmit, handleChange } = props;
    return (
        <div className={styles.login}>
            <Title >LOGIN</Title>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input type="email" onChange={handleChange} size="large" placeholder="email" prefix={<UserOutlined />} name="email" />
                {errors.email ? <div className="text-danger">{errors.email}</div> : ''}

                <Input.Password onChange={handleChange} size="large" placeholder="Password" prefix={<LockOutlined />} name="password" autoComplete="off" />
                {errors.password ? <div className="text-danger">{errors.password}</div> : ''}

                <Checkbox>Remember me</Checkbox>
                <Button className="w-100" type="primary" htmlType="submit" size='large'>
                    Submit
                </Button>

                <Divider style={{ marginTop: 0, color: '#929292' }}>or</Divider>

                <div className={styles.btn_social_group}>
                    <Button type="primary" size='large'>
                        <div className={styles.btn_social}>
                            <FacebookFilled className={styles.icon} />
                            <span> Login with Facebook</span>
                        </div>
                    </Button>
                    <Button type="danger" size='large'>
                        <div className={styles.btn_social}>
                            <GoogleOutlined className={styles.icon} />
                            <span> Login with Google</span>
                        </div>
                    </Button>
                </div>

                <div className="mt-3 pb-3 text-center">
                    <NavLink to={ROUTE_PATHS.SIGNUP} >Create a new account?</NavLink>
                </div>
            </form>
        </div>
    );
}

const LoginWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    validationSchema: Yup.object().shape({
        email: Yup.string().required('Email is required!').email('Email is invalid!'),
        password: Yup.string().min(3, 'Password must have at least 3 characters')
            .max(32, `Password doesn't more than 32 characters`)
            .required('Password is required!')
    }),

    handleSubmit: (values, {props}) => {
        props.dispatch(signinRequestAction(values))
    },

    displayName: 'LOGIN',
})(Login);

export default connect()(LoginWithFormik);