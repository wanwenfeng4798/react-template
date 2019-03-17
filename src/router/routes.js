import React from 'react';
import {Route} from 'react-router-dom';
// 服务端
// import AsyncHome from '../components/home';
// import AsyncRedBull from '../components/redBull';
// import AsyncSnacks from '../components/snacks'; //包裹了子路由的组件
// import AsyncNotFoundPage from '../components/nodeFound';
// import AsyncApp from '../containers/app';
// import AsyncKeep from '../components/keep';
/*
  当不需要服务端渲染的时候可以开启代码分割。服务端渲染代码分割这个插件会有问题
*/ 
import Loadable from 'react-loadable'; 
// // 路由加载时动画 
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>玩命加载中......</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>对不起。页面加载错误</div>;
    }
    else {
        return null;
    }
};
// //分割路由
// const AsyncApp = Loadable({
//   loader: ()=>import('../containers/app'),
//   loading: MyLoadingComponent,
//   delay: 200
// });
const AsyncHome = Loadable({
    loader: () => import('../components/home'),
    loading: MyLoadingComponent,
    delay: 200
}); 
const AsyncRedBull = Loadable({
    loader: () => import('../components/redBull'),
    loading: MyLoadingComponent,
    delay: 200
});
const AsyncSnacks = Loadable({
    loader: () => import('../components/snacks'),
    loading: MyLoadingComponent,
    delay: 200
});
const AsyncKeep = Loadable({
  loader: () => import('../components/keep'),
  loading: MyLoadingComponent,
  delay: 200
});
const AsyncNotFoundPage = Loadable({
  loader: () => import('../components/nodeFound'),
  loading: MyLoadingComponent,
  delay: 200
});
export const routes = [
  {
    component: AsyncHome,
    path: '/',
    exact: true
  },
  {
    component: AsyncRedBull,
    path: '/redbull'
  },
  {
    component: AsyncSnacks,
    path: '/snacks'
  },
  {
    component: AsyncKeep,
    path: '/keep'
  },
  {
    component:AsyncNotFoundPage   //没有路由的通配页面 404页面
  }
];
/* eslint-disable react/self-closing-comp */
  export const RouteWithSubRoutes = (route) => (
    <Route path={route.path} exact={route.exact} render={props=>(
        <route.component {...props} routes={route.routes}/>
    )}>
    </Route>
);