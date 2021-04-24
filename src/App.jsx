import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './Pages/Login';
import ContactList from './Pages/ContactList';
import Redirect from './Pages/Redirect';
import Logout from './Pages/Logout';

const App = () => {
  const [searchValue, setSearchValue] = useState(null);
  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };
  return (
    <div>
      <Router>
        <div>
          <Navbar handleSearch={handleSearch} />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route exact path="/contact-list" component={() => <ContactList search={searchValue} />} />
            <Route exact path="/login/checkStatus" component={Redirect} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};
export default App;
