import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { Block } from './modules/block';
import { Transaction } from './modules/transaction';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import './App.css';
import { Header } from './modules/header';
import { Accounts } from './modules/accounts';
import { Nft } from './modules/nft';

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <div className="App">
          <Switch>
            <Route path="/accounts" exact>
              <Accounts />
            </Route>
            <Route path="/accounts/:address" exact>
              <Accounts />
            </Route>
            <Route path="/nft" exact>
              <Nft />
            </Route>
            <Route path="/" exact>
              <Block />
            </Route>
            <Route path="/:hash" exact>
              <Block />
            </Route>
            <Route path="/transaction/:hash" exact>
              <Transaction />
            </Route>
          </Switch>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
