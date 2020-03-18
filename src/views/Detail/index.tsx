import React, { PureComponent } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import api from '../../api/api'
import './index.scss'
interface IProps {
    match: any
}
interface IState {
    id: number
    isLoading: boolean
    detail: {
        title: string
        original_title: string
        year: string
    }
}

class detail extends PureComponent<IProps, IState, RouteComponentProps>{
    state = {
        id: this.props.match.params.id,
        isLoading: true,
        detail: {
            title: '',
            original_title: '',
            year: ''
        }
    }

    regImg(detail: any) {
        console.log(detail)
        if (!detail) return
        const reg = new RegExp('s_ratio', 'ig')
        const bigImg: string = detail.images.small.replace(reg, 'l_ratio')
        return (
            <div className="photo">
                <img src={bigImg} alt="" />
            </div>
        )
    }

    render() {
        const { detail, isLoading } = this.state

        return (
            <>
                <div className="black"></div>
                <div className="w">
                    {!isLoading && <div className="main">
                        <div className="title">
                            <span className='name'>{detail.title}</span>
                            <span className="year">（{detail.year}）</span>
                        </div>
                        <div className="top">
                            {this.regImg(detail)}
                        </div>
                    </div>}
                </div>
            </>
        )
    }

    UNSAFE_componentWillMount() {
        api.getDetail(this.state.id).then((res: any) => {
            this.setState({
                detail: res.data,
                isLoading: false
            })
        })
    }

    componentDidMount() {
    }
}
export default detail