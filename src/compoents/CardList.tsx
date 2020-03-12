import React, { Component } from 'react'
import { Card, Tag } from 'antd';
import LazyLoad from 'react-lazyload';
import '../styles/cardList.scss'
import { Link } from 'react-router-dom';
import classnames from 'classnames'


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
                            <div className={name} key={index}>
                                <Card
                                    key={index}
                                    loading={true}
                                    className={classnames("movie-card", 'loading-img-box')}
                                    cover={
                                        <img className="loading-img" src={require('../assets/loading.svg')} alt="loading" />
                                    }
                                />
                            </div>
                        );
                    })
                }
            </>
        );
    }
    render() {
        const { list, name, count, isLoading } = this.props
        const data = {
            count, name
        }
        return (
            <>
                {isLoading ? this.CardListSkeleton(data) :
                    list.map((item: any, index: number) =>
                        <li className={name} key={index}>
                            {/* <div className={classnames(name == 'new-movie-container' ? 'num-tag' : null, name == 'new-movie-container' ? `num-tag${index + 1}` : '')}>{name == 'new-movie-container' ? index + 1 : ''}</div> */}
                            <Card
                                className="movie-card"
                                hoverable
                                cover={
                                    <Link to={`/detail/${item.id}`}>
                                        <LazyLoad height={200} offset={100} >
                                            <img className="card-img" src={item.images.small} alt="" />
                                        </LazyLoad>
                                    </Link>
                                }
                            >
                                {/* {name != 'new-movie-container' && <Tag className="img-tag tag-orange">{item.rating.average}</Tag>} */}
                                <Tag className="img-tag tag-orange">{item.rating.average}</Tag>
                                <Card.Meta
                                    title={item.title}
                                    description={item.genres.join("/")}
                                />
                            </Card>
                        </li>
                    )}

            </>
        )
    }
}

export default card