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
        title: string,
        original_title: string,
        year: string,
        directors: Array<string>,
        writers: Array<string>,
        casts: Array<string>,
        genres: Array<string>,
        countries: Array<string>,
        languages: Array<string>,
        pubdates: Array<string>,
        durations: Array<string>,
        aka: Array<string>,
    }
}

class detail extends PureComponent<IProps, IState, RouteComponentProps>{
    state = {
        id: this.props.match.params.id,
        isLoading: true,
        detail: {
            title: '',
            original_title: '',
            year: '',
            directors: [],
            writers: [],
            casts: [],
            genres: [],
            countries: [],
            languages: [],
            pubdates: [],
            durations: [],
            aka: []
        }
    }

    regImg(detail: any) {
        console.log(detail)
        if (!detail) return
        const regSize = new RegExp('s_ratio', 'ig')
        let bigImg: string = detail.images.small.replace(regSize, 'l_ratio')
        const type = new RegExp('jpg', 'ig')
        bigImg = bigImg.replace(type, 'webp')
        return (
            <div className="photo">
                <img src={bigImg} alt="" />
            </div>
        )
    }

    manyNames(list: any) {
        return list.map((item: any, index: number) => {
            let isMany: boolean = false
            let len: number = list.length
            if (len > 1 && len != index + 1) { isMany = true }
            else if (len == index + 1) { isMany = false }
            return (
                <span key={index}>
                    <a href={item.alt} target="_blank" rel="noopener noreferrer" >{item.name}</a>
                    {isMany ? ' / ' : ''}
                </span>
            )
        }
        )
    }
    otherNames(list: any) {
        return list.map((item: any, index: number) => {
            let isMany: boolean = false
            let len: number = list.length
            if (len > 1 && len != index + 1) { isMany = true }
            else if (len == index + 1) { isMany = false }
            return (
                <span key={index}>{item}
                    {isMany ? ' / ' : ''}
                </span>
            )
        }
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
                            <ul className="info">
                                <li>导演：
                                    {this.manyNames(detail.directors)}
                                </li>
                                <li>编剧：
                                    {this.manyNames(detail.writers)}
                                </li>
                                <li>主演：
                                    {this.manyNames(detail.casts)}
                                </li>
                                <li>类型：
                                   {this.otherNames(detail.genres)}
                                </li>
                                <li>
                                    制片国家/地区：
                                    {this.otherNames(detail.countries)}
                                </li>
                                <li>
                                    语言：
                                {this.otherNames(detail.languages)}
                                </li>

                                <li>
                                    上映日期：
                                {this.otherNames(detail.pubdates)}
                                </li>
                                <li>
                                    片长：
                                {this.otherNames(detail.durations)}
                                </li>
                                <li>
                                    又名：
                                    {this.otherNames(detail.aka.slice(0, detail.aka.length - 1))}
                                </li>
                            </ul>
                            <div className="star">

                            </div>
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