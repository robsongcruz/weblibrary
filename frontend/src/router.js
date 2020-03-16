import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import Loadable from 'react-loadable'

import Loader from 'components/LayoutComponents/Loader'
import IndexLayout from 'layouts'
import NotFoundPage from 'pages/404'

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />,
  })

const routes = [
  // System Pages
  {
    path: '/user/login',
    component: loadable(() => import('pages/user/login')),
    exact: true,
  },
  {
    path: '/user/forgot',
    component: loadable(() => import('pages/user/forgot')),
    exact: true,
  },
  // Dashboards
  {
    path: '/home',
    component: loadable(() => import('pages/home')),
  },
  {
    path: '/book-list',
    component: loadable(() => import('pages/book/book-list')),
  },
  {
    path: '/book-edit',
    component: loadable(() => import('pages/book/book-form')),
  },
  {
    path: '/author-list',
    component: loadable(() => import('pages/home')),
  },
  {
    path: '/author-edit',
    component: loadable(() => import('pages/author/author-form')),
  },
  {
    path: '/pages/antd',
    component: loadable(() => import('pages/antd')),
    exact: true,
  },
  {
    path: '/pages/register',
    component: loadable(() => import('pages/pages/register')),
    exact: true,
  },
  {
    path: '/pages/lockscreen',
    component: loadable(() => import('pages/pages/lockscreen')),
    exact: true,
  },
]

class Router extends React.Component {
  render() {
    const { history } = this.props
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/home" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    )
  }
}

export default Router
