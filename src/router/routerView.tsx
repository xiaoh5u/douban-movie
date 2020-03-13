import React from 'react';
import routes from './config';
import { Route, Redirect } from 'react-router-dom'// 与路由相关的内置组件


export default function CustomRoute(props: any) {
    let path: string = props.location.pathname;

    props.beforeEnter && props.beforeEnter(path);

    // '/'-> '/home
    if (path === '/') return <Redirect to='/home' />

    // if can match
    let matchRoute: any = routes.find(item => {
        let url = item.path;
        // /detail/:id -> \\/detail\\/[^/+]
        url = url.replace(/(\:.+)/g, "[^/]+").replace(/\//g, "\\/");

        return new RegExp(`${url}(\\/|\\/)?$`, 'gi').test(path);
    });

    if (matchRoute) {
        return <Route exact={!matchRoute.hasChild} path={matchRoute.path} component={matchRoute.component} />
    }
    return <Redirect to='/404' />
}

