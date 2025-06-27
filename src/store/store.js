import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { petSlice } from './pets';
import { myPetsSlice } from './myPets';
import { adminSlice } from './admin';


export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        pets: petSlice.reducer,
        myPets: myPetsSlice.reducer,
        admin: adminSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})