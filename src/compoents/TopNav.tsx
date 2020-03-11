import React, { Component } from 'react';
import '../styles//topNav.scss'
import classnames from 'classnames'
interface IProps {
    isActive: boolean
}
interface IState {
}
class TopNav extends Component<IProps, IState> {

    render() {
        const { isActive } = this.props
        return (
            <>
                <header>
                    <div className="logo"></div>
                    <div className={classnames('search', isActive ? 'active' : '')}>
                        <input type="text" placeholder="请输入要查询的影片" />
                        <div className="button"><i className="iconfont icon-search1187938easyiconnet"></i>全网搜</div>
                    </div>
                </header>
            </>
        );
    }
}
export default TopNav;