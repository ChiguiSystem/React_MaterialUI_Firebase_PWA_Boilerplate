import React from 'react';
import { Dashboard } from '../../containers/Dashboard';
import { About } from '../../containers/About';
import { MyAccount } from '../../containers/MyAccount';
import { ResetPassword } from '../../containers/ResetPassword';
import { PageNotFound } from '../../components/PageNotFound';
import { SignIn } from '../../containers/SignIn';
import { SignUp } from '../../containers/SignUp';
import { Route , Switch, Redirect } from 'react-router';

const Routes = ({isAuthorised}) => {

  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      isAuthorised ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )

  const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      !isAuthorised ? (
        <Component {...props}/>
      ) : (
        <Redirect to={{
          pathname: '/',
          state: { from: props.location }
        }}/>
      )
    )}/>
  )


  return (
    <Switch>
      <PrivateRoute path="/" exact component={Dashboard} />
      <PrivateRoute path="/dashboard" exact component={Dashboard} />
      <PrivateRoute path="/about" exact component={About}  />
      <PrivateRoute path="/my_account" exact component={MyAccount} />
      <PublicRoute path="/signin" component={SignIn} />
      <PublicRoute path="/signup" component={SignUp} />
      <PublicRoute path="/reset" component={ResetPassword} />
      <Route path="/*" component={PageNotFound} />
    </Switch>
  );
}

export default Routes;
