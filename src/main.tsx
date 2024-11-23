import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {BrowserRouter} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { store } from './app/store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
)
