import React, { Component } from 'react';
import { BackTop } from 'antd';
import styles from './style.module.scss'
class home extends Component {
    constructor(props:any) {
        super(props);
        this.state = {  };
    }
    render() {
        return (    
            <>
                <BackTop />
            

                <div className={styles.box}></div>
            </>         
        );
    }
}
export default home;