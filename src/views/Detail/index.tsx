import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom';
import { RouteComponentProps } from 'react-router-dom'
import api from '../../api/api'
import './index.scss'
import classnames from 'classnames'
import { Tag } from 'antd'
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
    infoList: [
        {
            name: string,
            func: any,
            param: string
        }
    ]
}

class index extends PureComponent<IProps, IState, RouteComponentProps>{
    state: any = {
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
        },
        infoList: [
            {
                name: "导演：",
                func: this.manyNames,
                param: 'directors'
            },
            {
                name: "编剧：",
                func: this.manyNames,
                param: 'writers'
            },
            {
                name: "主演：",
                func: this.manyNames,
                param: 'casts'
            },
            {
                name: "类型：",
                func: this.otherNames,
                param: 'genres'
            },
            {
                name: " 制片国家/地区：",
                func: this.otherNames,
                param: 'countries'
            },
            {
                name: "语言：",
                func: this.otherNames,
                param: 'languages'
            },
            {
                name: "上映日期：",
                func: this.otherNames,
                param: 'pubdates'
            },
            {
                name: "片长：",
                func: this.otherNames,
                param: 'durations'
            },
            {
                name: "又名：",
                func: this.otherNames,
                param: 'aka'
            }
        ]
    }

    regImg(detail: any) {
        console.log(detail)
        if (!detail) return
        const regSize = new RegExp('s_ratio', 'ig')
        let bigImg: string = detail.images.small.replace(regSize, 'l_ratio')
        // bigImg = bigImg.replace(/http:\/\/{1}/ig, 'https://images.weserv.nl/?url=');
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
    computedScore(average: string) {
        const arr = average.toString().split('.')
        return (
            <div className="score">
                <span className="score1">{arr[0]}</span>
                {arr[1] && <span className="score2">{`.${arr[1]}`}</span>}
            </div>
        )
    }
    computedStars(average: number) {
        const arr = average.toString().split('.');
        let classname: string = ''
        if (arr[1] == '5') {
            switch (average) {
                case 1.5:
                case 0.5: classname = 'bigStar05'
                    break
                case 2.5:
                case 3.5: classname = 'bigStar15'
                    break
                case 4.5:
                case 5.5: classname = 'bigStar25'
                    break
                case 6.5:
                case 7.5: classname = 'bigStar35'
                    break
                case 8.5:
                case 9.5: classname = 'bigStar45'
                    break
            }
        } else {
            const scoreNum = Math.round(average / 2)
            switch (scoreNum) {
                case 0: classname = 'bigStar00'
                    break
                case 1: classname = 'bigStar10'
                    break
                case 2: classname = 'bigStar20'
                    break
                case 3: classname = 'bigStar30'
                    break
                case 4: classname = 'bigStar40'
                    break
            }
        }
        return (
            <div className={classnames('star', classname)} ></div>
        )
    }

    moreComment(id: string) {
        return api.getComment(id)
    }
    commentModle(item: any, index: number) {
        let { summary, id } = item
        summary = summary.replace(/\.\.\.{1}/ig, '')
        let name: string = `comment${index}`
        return (
            <div className="comment-summary" ref={`comment${index}`}>
                {summary}

                （<span className='btn' onClick={() => { this.completeComment(id, name) }}>展开</span>）
            </div>
        )
    }
    completeComment = async (id: string, name: string) => {
        let str = ''
        await this.moreComment(id).then((res: any) => {
            str = res.data.html
        })
        // str = str.replace(/http[s]:\/\/{1}/ig, 'https://images.weserv.nl/?url=');
        str = str.replace(/width="1080"/ig, '')
        str = str.replace(/width="1920"/ig, '')
        let node = ReactDOM.findDOMNode(this.refs[name]) as HTMLInputElement;
        node.innerHTML = str
    }

    render() {
        const { detail, isLoading, infoList } = this.state
        const { regImg, computedScore, computedStars } = this
        return (
            <>
                <div className="black"></div>
                <div className="w">
                    {!isLoading && <div className="head">
                        {regImg(detail)}
                        <span className='name sl'>{detail.original_title}</span>
                        <div className="rating">
                            {computedScore(detail.rating.average)}
                            {computedStars(detail.rating.average)}
                            <div className="rating-people">
                                {detail.ratings_count}
                                <span>人评价</span>
                            </div>
                        </div>
                    </div>}
                    {!isLoading && <div className="main">
                        <div className="title">
                            <span className='name'>{detail.title}</span>
                            <span className="year">（{detail.year}）</span>
                        </div>
                        <div className="tags">
                            {detail.tags.map((item: any, index: number) => {
                                return (
                                    <Tag color={'blue'} key={index}>{item}</Tag>

                                )
                            })}
                        </div>
                        <ul className="info">
                            {infoList.map((item: any, index: number) => {
                                const { name, func, param } = item
                                return (
                                    <li key={index}>{name}
                                        {func(detail[param])}
                                    </li>
                                )
                            })}
                        </ul>

                        <h2 className="sub-title">
                            {detail.title}的剧情简介 · · · · · ·
                        </h2>
                        <p className='summary'>
                            {detail.summary}
                        </p>


                        <h2 className="sub-title">
                            {detail.title}的剧照 · · · · · ·
                        </h2>
                        <div className="photos">
                            {detail.photos.map((item: any, index: number) => {
                                let {image} = item
                                // image = item.image.replace(/https:\/\/{1}/ig, 'https://images.weserv.nl/?url=');
                                // image = image.replace(/\/l\//ig, '/s/')
                                return (
                                    <span key={index} >
                                        <img src={image} alt="" />
                                    </span>
                                )
                            })}
                        </div>

                        <h2 className="sub-title">
                            {detail.title} 的影评 · · · · · ·
                        </h2>
                        <ul className="comment">
                            {detail.popular_reviews.map((item: any, index: number) => {
                                const { author, rating, title } = item
                                return (
                                    <li key={index}>
                                        <div className="user">
                                            <span className="headImg">
                                                <img src={author.avatar} alt="" />
                                            </span>
                                            <span className='userName'>
                                                {author.name}
                                            </span>
                                            <span className="star">
                                                {rating.value != 0 && computedStars(rating.value * 2)}
                                            </span>
                                        </div>

                                        <div className="comment-title">
                                            {title}
                                        </div>

                                        {this.commentModle(item, index)}
                                    </li>
                                )
                            })}
                        </ul>
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
export default index