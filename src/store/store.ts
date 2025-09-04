import { configureStore, Middleware } from '@reduxjs/toolkit';
import { createStateSyncMiddleware } from 'redux-state-sync';
import { IApplicationState } from '../store/state/app-state';
import { loadStorage, saveStorage } from '../utils/localStorage';
import authReducer from './slices/authSlice';
import generalReducer from './slices/generalSlice';


const persistentState: IApplicationState = loadStorage() || {} as IApplicationState;

const store = configureStore({
    reducer: {
        UserData: authReducer,
        GeneralData: generalReducer,
    },
    preloadedState: persistentState,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            createStateSyncMiddleware() as Middleware // 👈 fix
        ),
    devTools: true,
});

store.subscribe(() => {
    return saveStorage(store.getState());
});

export default store;