import { create } from 'zustand';
// import { persist } from 'zustand/middleware';

interface StoreTypes {
  isOpenModalProyek: Boolean
  handleOpenModalProyek: (value: boolean) => void
}

const useActivityStore = create<StoreTypes>((set) => ({
    isOpenModalProyek: false,
    handleOpenModalProyek: (value) => set({ isOpenModalProyek: value }),
}));

// Persist
// const useStore = create(
//   persist<StoreTypes>(
//     (set) => ({
//       bears: 0,
//       increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
//       removeAllBears: () => set({ bears: 0 }),
//       updateBears: (newBears) => set({ bears: newBears }),
//     }),
//     {
//       name: 'useStore',
//     },
//   ),
// );

export default useActivityStore;