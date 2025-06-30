import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './auth';
import { petSlice } from './pets';
import { myPetsSlice } from './myPets';
import { adminSlice } from './admin';
import { favoritesSlice } from './favorites';
import { chatSlice } from './chat';


export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        pets: petSlice.reducer,
        myPets: myPetsSlice.reducer,
        admin: adminSlice.reducer,
        favorites: favoritesSlice.reducer,
        chat: chatSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})