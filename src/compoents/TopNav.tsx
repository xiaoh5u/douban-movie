import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom'
import '../styles//topNav.scss'
import api from '../api/api'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react' // 两个内置组件，用来连接仓库

interface IProps {
    first: any
    isActive: boolean
    store?: any
}
interface IState {
    resData: Array<string>
    isValue: string
}

let timer: NodeJS.Timer //初始化在Sate里无法定义，故在此定义全局变量



@inject('store')

@observer

class TopNav extends PureComponent<IProps, IState> {
    state = {
        resData: [],
        isValue: ''
    }
    // 节流
    searchInput = (ev: any) => {
        const value: string = ev.target.value
        this.setState({ isValue: value })
        if (!value) return
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            api.getSearchInfo(value).then((res: any) => {
                this.setState({
                    resData: res.data
                })
            })
        }, 500)
    }

    searchResult = (isBlock: boolean) => {
        let { resData } = this.state
        return (
            <ul className={classnames('search-result', isBlock ? 'block' : '')}>
                {resData.map((item: any, index: number) =>
                    <li className="child" key={index}>
                        <img src={item.img} alt="" />
                        <div className="nameBox">
                            <div className="top">
                                <Link to={`/detail/${item.id}`}>
                                    <span className="cn-name">{item.title}</span>
                                </Link>
                                {item.year && <span className="year">{item.year}</span>}
                            </div>
                            <div className="bottom">
                                <span className="en-name">{item.sub_title}</span>
                            </div>
                        </div>

                    </li>
                )}
            </ul>
        )
    }

    setData = () => {
        const { isValue, resData } = this.state
        if (!isValue && resData) {
            this.setState({ resData: [] })
        }
    }

    render() {
        const { isActive, first } = this.props
        const { isBlock, changeBlock } = this.props.store.display
        return (
            <>
                <header>
                    <div className="logo"></div>
                    <div className={classnames('search', isActive ? 'active' : '')}>
                        <input onChange={(ev) => { this.searchInput(ev) }} onFocus={() => { changeBlock(true) }} onBlur={() => { setTimeout(()=>{changeBlock(false); this.setData()},200) }} type="text" placeholder={first ? first.title : null} />
                        <div className="button"><i className="iconfont icon-search1187938easyiconnet"></i>全网搜</div>
                    </div>
                    {this.state.resData && this.searchResult(isBlock)}
                </header>
            </>
        );
    }
}
export default TopNav;