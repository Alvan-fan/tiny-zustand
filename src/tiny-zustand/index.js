import { useSyncExternalStore, useState, useEffect } from 'react';

function createStore(createState) {
  let state;
  const listeners = new Set();
  // 设置状态
  const setState = function setState(partial, replace) {
    const nextState = typeof partial === 'function' ? partial(state) : partial;
    if (!Object.is(nextState, state)) {
      const _previousState = state;
      // 更新state
      state = replace ? nextState : Object.assign({}, state, nextState);
      // 发布更新通知
      listeners.forEach((listener) => {
        return listener(state, _previousState);
      });
    }
  };
  // 获取state
  const getState = function getState() {
    return state;
  };
  // 订阅
  const subscribe = function subscribe(listener) {
    listeners.add(listener);
    return function () {
      return listeners.delete(listener);
    };
  };
  // 清除订阅
  const destroy = function destroy() {
    listeners.clear();
  };
  const api = {
    setState: setState,
    getState: getState,
    subscribe: subscribe,
    destroy: destroy,
  };
  state = createState(setState, getState, api);
  return api;
}

function useStore(api, selector) {
  // const [, forceUpdate] = useState();
  // const { getState, subscribe } = api;

  // useEffect(() => {
  //   const unsubscribe = subscribe(forceUpdate);
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  // const slice = getState();
  const { getState, subscribe } = api;
  const slice = useSyncExternalStore(subscribe, getState);
  Object.assign(slice, api);
  // if (selector) {
  //   return selector(slice);
  // }
  return slice;
}

function create(createState) {
  const api =
    typeof createState === 'function' ? createStore(createState) : createState;
  const useBoundStore = function useBoundStore(selector) {
    return useStore(api, selector);
  };
  Object.assign(useBoundStore, api);
  return useBoundStore;
}
export { createStore, useStore, create };
