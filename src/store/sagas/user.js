import {all,call, put, takeLatest} from 'redux-saga/effects';
import {USERINFO} from '../actions';



function* getUserInfo(data) {
    yield console.log('yield getUserInfo res=====>', data);
}


function* userSaga() {
    yield takeLatest(USERINFO.GTEUSERINFO,getUserInfo);
}

export default userSaga;


/*2.redux-saga的执行流程

整个流程：ui组件触发action创建函数 ---> action创建函数返回一个action ------> action被传入redux中间件(被 saga等中间件处理) ，产生新的action，传入reducer-------> reducer把数据传给ui组件显示 -----> mapStateToProps ------> ui组件显示

3.常见effect的用法

1. call 异步阻塞调用
2. fork 异步非阻塞调用，无阻塞的执行fn，执行fn时，不会暂停Generator
3. put 相当于dispatch，分发一个action
4. select 相当于getState，用于获取store中相应部分的state
5. take 监听action，暂停Generator，匹配的action被发起时，恢复执行。take结合fork，可以实现takeEvery和takeLatest的效果
6. takeEvery 监听action，每监听到一个action，就执行一次操作
7. takeLatest 监听action，监听到多个action，只执行最近的一次
8. cancel 指示 middleware 取消之前的 fork 任务，cancel 是一个无阻塞 Effect。也就是说，Generator 将在取消异常被抛出后立即恢复
9. race 竞速执行多个任务
10. throttle 节流
*/