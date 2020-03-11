import React, { Component } from 'react';
import { Carousel, BackTop, Card, Tag } from 'antd';
import { Link } from 'react-router-dom';
import TopNav from '../../compoents/TopNav';
import LazyLoad from 'react-lazyload';
import api from '../../api/api'
import classnames from 'classnames'
import './home.scss'

interface IState {
    bannerList: Array<string>
    hotList: Array<string>
    isActive: boolean
}
class home extends Component<IState> {

    readonly state: Readonly<IState> = {
        bannerList: [
            require('../../assets/banner-001.jpg'),
            require('../../assets/banner-002.jpg'),
            require('../../assets/banner-003.jpg'),
            require('../../assets/banner-004.jpg'),
            require('../../assets/banner-005.jpg')
        ],
        hotList: [],
        isActive: false
    }

    //获取正在热映的电影数据
    getHotMovie = () => {
        api.getInfo('in_theaters', { start: 0, count: 12 })
            .then((res: any) => {
                this.setState({
                    hotList: res.data.subjects
                })
            })
    }
    //头部导航监听事件
    handleScroll = () => {
        const scrollTop: number = window.scrollY
        const isActive = this.state.isActive
        if (scrollTop > 0 && !isActive) {
            this.setState({
                isActive: true
            })

        } else if (scrollTop == 0) {
            this.setState({
                isActive: false
            })
        }

    }


    render() {
        const { bannerList, hotList, isActive } = this.state
        return (
            <>
                <div className={classnames("topContainer", isActive ? 'active' : '')}>
                    <div className="w">
                        <TopNav {...this.props} isActive={isActive} />
                    </div>
                </div>
                <Carousel autoplay>
                    {bannerList.map((item: any, index: number) => {
                        return (
                            <div
                                className="banner-item"
                                key={index}>
                                <img src={item} alt="banner" />
                            </div>
                        );
                    })}
                </Carousel>
                <div className="w">
                    <h2 className="card-title">正在热映</h2>
                    <div className="hotMovie">
                        {hotList &&
                            hotList.map((item: any, index: number) =>
                                <div className="card-container" key={index}>
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
                                        <Tag className="img-tag tag-orange">{item.rating.average}</Tag>
                                        <Card.Meta
                                            title={item.title}
                                            description={item.genres.join("/")}
                                        />
                                    </Card>
                                </div>
                            )
                        }
                    </div>
                    <BackTop />
                </div>
            </>
        );
    }
    componentDidMount() {
        this.getHotMovie()
        window.addEventListener('scroll', this.handleScroll);
    }


}
export default home;