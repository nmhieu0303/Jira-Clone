import React from 'react'
import styles from './style.module.scss'
import imageLoading from './../../../assets/images/Loading/Loading.gif'
import { useSelector } from 'react-redux'

export default function Loading() {
    const { isLoading } = useSelector(state => state.LoadingReducer)
    if (isLoading) {
        return (
            <div className={styles.overlay} >
                <img src={imageLoading} alt="loading" />
            </div>
        )
    } else return <></>

}
