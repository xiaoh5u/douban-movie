import React, { PureComponent } from 'react';
import { Carousel, BackTop } from 'antd';
import { Link } from 'react-router-dom';
import TopNav from '../../compoents/TopNav';
import CardList from '../../compoents/CardList'
import api from '../../api/api'
import classnames from 'classnames'
import './home.scss'

interface IState {
    bannerList: Array<string>,
    hotList: Array<string>,
    isActive: boolean,
    newList: Array<string>,
    usData: any,
    isLoadingHotShow: boolean,
    isLoadingNewMovie: boolean,
    isLoadingWeeklyBox: boolean,
    isLoadingTop250: boolean,
    weeklyList: Array<string>,
    top250List: Array<string>,
}

class home extends PureComponent<IState> {

    readonly state: Readonly<IState> = {
        bannerList: [
            require('../../assets/banner-001.jpg'),
            require('../../assets/banner-002.jpg'),
            require('../../assets/banner-003.jpg'),
            require('../../assets/banner-004.jpg'),
            require('../../assets/banner-005.jpg')
        ],
        hotList: [],
        newList: [],
        weeklyList: [],
        top250List: [],
        isActive: false,
        usData: {},
        isLoadingHotShow: true,
        isLoadingNewMovie: true,
        isLoadingWeeklyBox: true,
        isLoadingTop250: true,
    }

    //数据请求集合
    getData = () => {
        api.getHotMovie().then((res: any) => { this.setState({ hotList: res.data.subjects, isLoadingHotShow: false }) })
        api.getNewMovie().then((res: any) => { this.setState({ newList: res.data.subjects, isLoadingNewMovie: false }) })
        api.getusMovie().then((res: any) => { this.setState({ usData: res.data }) })
        api.getWeeklyMovie().then((res: any) => { this.setState({ weeklyList: res.data.subjects, isLoadingWeeklyBox: false }) })
        api.getTop250Movie().then((res: any) => { this.setState({ top250List: res.data.subjects, isLoadingTop250: false }) })
    }

    //头部导航监听事件
    handleScroll = () => {
        const scrollTop: any = window.scrollY
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
        sessionStorage.setItem('scrollTop', scrollTop)
    }




    render() {
        const { bannerList, hotList, isActive, newList, usData, isLoadingHotShow, isLoadingNewMovie, isLoadingWeeklyBox, isLoadingTop250, weeklyList, top250List } = this.state

        return (
            <>
                {/* 吸顶导航组件 */}
                <div className={classnames("topContainer", isActive ? 'active' : '')}>
                    <div className="w">
                        <TopNav {...this.props} isActive={isActive} first={hotList[0]} />
                    </div>
                </div>
                <div className="banner">
                    <Carousel autoplay dots>
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
                </div>

                <div className="w">
                    {/*  正在热映板块 */}
                    <h2 className="card-title">正在热映</h2>
                    <ul className="hotMovie">
                        <CardList list={hotList} name={'hot-movie-container'} {...this.props} count={6} isLoading={isLoadingHotShow}></CardList>
                    </ul>


                    <div className="box">
                        {/*  豆瓣电影新片榜 */}
                        <div className="module1">
                            <h2 className="card-title">新片榜</h2>
                            <ul className="newMovie">
                                <CardList list={newList.slice(0, 8)} name={'new-movie-container'} {...this.props} count={4} isLoading={isLoadingNewMovie}></CardList>
                            </ul>
                        </div>
                        {/* 豆瓣电影北美票房榜 */}
                        <div className="module2">
                            <h2 className="card-title">北美票房榜</h2>
                            <p className={'date'}>
                                {usData.date} 更新
                                <span>单位:美元</span>
                            </p>
                            <ul className="us-box">
                                {usData.subjects && usData.subjects.slice(0, 10).map((item: any, index: number) => {
                                    let { rank, box, subject } = item;
                                    let isNew: boolean = item.new
                                    let { title, id, rating, collect_count } = subject;
                                    return (
                                        <li key={index}>
                                            <div className="rank">{rank}</div>
                                            <Link to={`/detail/${id}`}>
                                                <div className="info">
                                                    <h3 className="title">{title}</h3>
                                                    <p className="summary">
                                                        <span className={'box-new'}>{isNew ? '新上榜' : null}</span>
                                                        {isNew ? ' / ' : null}
                                                        {`${rating.average}分 / ${collect_count}收藏`}
                                                    </p>
                                                </div>
                                            </Link>
                                            <div className="box-office">{(box / 1e4).toFixed(0)}万</div>
                                        </li>
                                    )
                                }
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* 一周口碑榜 */}
                    <div className="weekTop">
                        <h2 className="card-title">一周口碑榜</h2>
                        <ul className={classnames('weekMovie', 'hotMovie')}>
                            <CardList list={weeklyList.slice(0, 6)} name={'weekly-movie-container'} {...this.props} count={6} isLoading={isLoadingWeeklyBox}></CardList>
                        </ul>
                    </div>
                    {/* TOP250 */}
                    <div className="top250-container">
                        <h2 className="card-title">Top250</h2>
                        <ul className={classnames('top250-box', 'hotMovie')}>
                            <CardList list={top250List} name={'top250-movie-container'} {...this.props} count={9} isLoading={isLoadingTop250} />
                        </ul>
                    </div>
                    <BackTop />
                </div>

            </>
        );
    }
    componentWillMount() {
        this.getData()
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        if (this.handleScroll) {
            window.removeEventListener('scroll', this.handleScroll);
        }
     
    }


}
export default home;