import { configureStore} from "@reduxjs/toolkit";

import rootReducer from "redux/slices";

const store = configureStore({
    reducer: rootReducer
})

export default store;