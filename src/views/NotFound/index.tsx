import React,{Component} from 'react'
import {Link} from 'react-router-dom'
import style from './/index.module.scss'

export default class error extends Component {
    render(){
        return(
            <>
            <p className={style.text}>404 NotFound</p>
            <Link className={style.back} to="/home">返回首页</Link>
            </>
        )
    }
}
