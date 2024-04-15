// import { create } from 'zustand';
import { create } from './tiny-zustand';

import './App.css';

const useStore: any = create((set: any) => ({
  count: 1,
  inc: () => set((state: { count: number }) => ({ count: state.count + 1 })),
}));

const Counter = () => {
  const { count, inc } = useStore() as any;
  return (
    <div className='counter'>
      <span>{count}</span>
      <button onClick={inc}>one up</button>
    </div>
  );
};

function App() {
  return (
    <div className='App'>
      <Counter />
    </div>
  );
}

export default App;

// import { create } from './tiny-zustand';

// import './App.css';

// const useStore: any = create((set: any) => ({
//   count: 1,
//   inc: () => set((state: { count: number }) => ({ count: state.count + 1 })),
// }));

// const Counter = () => {
//   const { count } = useStore() as any;
//   return (
//     <div className='counter'>
//       <span>{count}</span>
//     </div>
//   );
// };

// const Counter2 = () => {
//   const { inc } = useStore() as any;
//   return (
//     <div className='counter'>
//       <button onClick={inc}>one up</button>
//     </div>
//   );
// };

// function App() {
//   return (
//     <div className='App'>
//       <Counter />
//       <Counter2 />
//     </div>
//   );
// }

// export default App;
