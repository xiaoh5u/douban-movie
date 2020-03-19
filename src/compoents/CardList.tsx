import React, { Component } from 'react'
import { Card, Tag } from 'antd';
import LazyLoad from 'react-lazyload';
import '../styles/cardList.scss'
import { Link } from 'react-router-dom';
import classnames from 'classnames'
import { normalize } from 'path';


interface IProps {
    list: Array<string>
    name: string
    count: number
    isLoading: boolean
}
class card extends Component<IProps> {

    CardListSkeleton(data: any) {
        let { count, name } = data;
        let list = new Array(count || 6).fill(1);
        return (
            <>
                {
                    list.map((item: number, index: number) => {
                        return (
                            <li className={classnames(name, index == 0 && name == 'top250-movie-container' ? "big loading-big" : null)} key={index}>
                                <Card
                                    key={index}
                                    loading={true}
                                    className={classnames("movie-card", 'loading-img-box')}
                                    cover={
                                        <img className="loading-img " src={require('../assets/loading.svg')} alt="loading" />
                                    }
                                />
                            </li>
                        );
                    })
                }
            </>
        );
    }
    render() {
        const { list, name, count, isLoading } = this.props
        const data = {count, name}
        return (
            <>
                {isLoading ? this.CardListSkeleton(data) :
                    list.map((item: any, index: number) => {
                        // 一周口碑榜数据返回格式有所不同，需要重新做判断
                        let isWeekly: boolean = name == 'weekly-movie-container' ? true : false
                        if (isWeekly) item = item.subject

                        // 为数组中的如下位置增加big 类名
                        const condition: Array<number> = [0, 9, 18, 27]
                        let isBig: boolean = false
                        if(condition.includes(index) && name == 'top250-movie-container') isBig = true 

                        // 返回结果中的大图依然清晰度很低，原因是图片链接有误，下面使用正则替换相应值
                        const reg = new RegExp('s_ratio', 'ig')
                        const bigImg: any = item.images.small.replace(reg, 'l_ratio')

                        return (
                            <li className={classnames(name, isBig ? "big" : null)} key={index}>
                                {isWeekly && <div className={classnames('num-tag', `num-tag${index + 1}`)}>{index + 1}</div>}
                                <Card
                                    className="movie-card"
                                    hoverable
                                    cover={
                                        <Link to={`/detail/${item.id}`}>
                                            <LazyLoad height={200} offset={100} >
                                                <img className="card-img" src={isBig ? bigImg : item.images.small} alt="" />
                                            </LazyLoad>
                                        </Link>
                                    }
                                >
                                    <Tag className={classnames(isWeekly ? 'weeklyTag' : null, 'img-tag ', 'tag-orange')}>{item.rating.average}</Tag>
                                    <Card.Meta
                                        title={item.title}
                                        description={item.genres.join("/")}
                                    />
                                </Card>
                            </li>
                        )
                    }

                    )}

            </>
        )
    }
}

export default card