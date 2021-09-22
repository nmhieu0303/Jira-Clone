import { LockOutlined, MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Input, Typography } from 'antd';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import { signupRequestAction } from '../../redux/actions/UserActions';
import { ROUTE_PATHS } from '../../utils/constant/router';
import styles from './style.module.scss';

const { Title } = Typography;
const SignUp = (props) => {
    const dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            email: '',
            passWord: '',
            passWordConfirm: '',
            name: '',
            phoneNumber: ''
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().required('Email is required!').email('Email is invalid!'),
            passWord: Yup.string().min(3, 'Password must have at least 3 characters')
                .max(32, `Password doesn't more than 32 characters`)
                .required('Password is required!'),
            passWordConfirm: Yup.string().oneOf([Yup.ref('passWord'), null], 'Passwords must match').required('Password confirm is required!'),
            phoneNumber: Yup.string().min(10, 'Phone number must have at least 10 characters').required('Phone number is required!'),
            name: Yup.string().min(3, 'Name must have at least 3 characters').required('Name is required!'),

        }),
        onSubmit: (values) => {
            dispatch(signupRequestAction(values))
        }
    })

    return (
        <div className={styles.login}>
            <Title >SIGN UP</Title>
            <form className={styles.form} onSubmit={formik.handleSubmit}>
                <Input type="text" onChange={formik.handleChange} size="large" placeholder="Your name" prefix={<UserOutlined />} name="name" />
                {formik.errors.name && formik.touched.name ? <div className="text-danger">{formik.errors.name}</div> : ''}

                <Input type="text" onChange={formik.handleChange} size="large" placeholder="Phone number" prefix={<PhoneOutlined />} name="phoneNumber" />
                {formik.errors.phoneNumber && formik.touched.phoneNumber ? <div className="text-danger">{formik.errors.phoneNumber}</div> : ''}

                <Input type="email" onChange={formik.handleChange} size="large" placeholder="Email" prefix={<MailOutlined />} name="email" />
                {formik.errors.email && formik.touched.email ? <div className="text-danger">{formik.errors.email}</div> : ''}

                <Input.Password onChange={formik.handleChange} size="large" placeholder="Password" prefix={<LockOutlined />} name="passWord" autoComplete="off" />
                {formik.errors.passWord && formik.touched.passWord ? <div className="text-danger">{formik.errors.passWord}</div> : ''}

                <Input.Password onChange={formik.handleChange} size="large" placeholder="Password confirm" prefix={<LockOutlined />} name="passWordConfirm" autoComplete="off" />
                {formik.errors.passWordConfirm && formik.touched.passWordConfirm ? <div className="text-danger">{formik.errors.passWordConfirm}</div> : ''}


                <Button className="w-100 mt-3" type="primary" htmlType="submit" size='large'>
                    Submit
                </Button>

                <p className="mt-3 pb-3 text-center">{`Already have a account? `}<NavLink to={ROUTE_PATHS.LOGIN}>Sign in</NavLink> </p>
            </form>
        </div>
    );
}



export default SignUp;