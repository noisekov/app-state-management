import App from './App';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.tsx';
import { ThemeProvider } from './util/ThemeProvider.tsx';

export default function Component() {
    return (
        <ErrorBoundary>
            <ThemeProvider>
                <Provider store={store}>
                    <App />
                </Provider>
            </ThemeProvider>
        </ErrorBoundary>
    );
}
