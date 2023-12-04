
import {createStore, compose, applyMiddleware} from 'redux';
import {withExtraArgument} from 'redux-thunk';
import rootReducer from './reducers';
import {request} from 'utils/request';
import { createReduxHistoryContext } from "redux-first-history";
export default function configureStore(history,initialState) {
  // // 定时刷新爬虫数据
  // let time = 0;
  // try
  // {
  //   time = setInterval(()=>{
  //     axiosInstance.get('/User/WritePneumoniaData')
  //     .then(res => {
  //       console.log(res);
  //     }).catch(err=>{
  //       console.log(err);
  //       clearInterval(time);
  //     });
  //   }, 600000);
  // }catch(err)
  // {
  //   clearInterval(time);
  // }
  // end
  const { createReduxHistory, routerMiddleware, routerReducer } = createReduxHistoryContext({ 
    history: history,
    //other options if needed 
  });
  const middlewares = [
    routerMiddleware,
    withExtraArgument(request(history)),
  ];
  const store = createStore(rootReducer(routerReducer), initialState, compose(
    applyMiddleware(...middlewares)
    )
  );
  if(process.env.BUILD_TYPE === 'webpack'){
    if(module.hot){
      // Enable Webpack hot module replacement for reducers
      module?.hot?.accept('./reducers', () => {
        const nextReducer = require('./reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
    }
  }else{
    if (import.meta?.hot) {
      // Enable Webpack hot module replacement for reducers
      import.meta?.hot?.accept('./reducers', () => {
        const nextReducer = require('./reducers').default; // eslint-disable-line global-require
        store.replaceReducer(nextReducer);
      });
    }
  }
  const h = createReduxHistory(store);
  return {
    store,
    h
  };
}
