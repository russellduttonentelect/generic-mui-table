import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EnvProvider } from 'contexts/EnvProvider';
import { ServiceProvider } from 'contexts/ServiceProvider';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from 'routes/AppRoutes';
import { QueryParamProvider } from 'use-query-params';
import './App.css';
// import { RouteAdaptor } from 'routes/RouteAdaptor';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {}
  }
});

const App = () => {
  return (
    <EnvProvider
      config={{
        apiUrl: 'https://jsonplaceholder.typicode.com/posts',
        featureFlags: { requestLogging: true }
      }}
    >
      <ServiceProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
              <AppRoutes />
            </QueryParamProvider>
          </BrowserRouter>
        </QueryClientProvider>
      </ServiceProvider>
    </EnvProvider>
  );
};

export default App;
