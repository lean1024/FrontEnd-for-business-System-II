import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tab, Menu } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

// This is a wrapper around Semantic UI's <Tab> component to additionally handle
// route changes on tab change. Therefore, you need to additionally pass a route
// on each pane object in `panes`: `pane = { menuItem, render, route }`.

class Tabs extends Component {
  static Divider = props => {
    let { fluid, content, ...rest } = props;
    content = content || (fluid ? '' : '|');
    const style = fluid ? { flex: 1 } : {};
    return (
      <Menu.Item as={'span'} disabled {...rest} style={style}>
        {content}
      </Menu.Item>
    );
  };

  static propTypes = {
    panes: PropTypes.array.isRequired,
    withRoutes: PropTypes.bool,
    options: PropTypes.object,
    menu: PropTypes.object,
  };

  static defaultProps = {
    withRoutes: false,
    options: {},
    menu: {},
  };

  onTabChange = (evt, data) => {
    const { history } = this.props;
    const tab = data.panes[data.activeIndex];
    history.push(tab.route);
  };

  getCurrentIndex = () => {
    const { match, panes } = this.props;
    const idx = panes.findIndex(p => match.url.startsWith(p.route));
    return idx;
  };

  render() {
    const { panes, withRoutes, options, menu, style } = this.props;

    const propsForRouteChange = withRoutes
      ? {
          onTabChange: this.onTabChange,
          activeIndex: this.getCurrentIndex(),
        }
      : {};

    return (
      <Tab
        menu={{
          secondary: true,
          pointing: true,
          ...menu,
        }}
        style={{
          flex: 1,
          display: 'flex',
          flexFlow: 'column nowrap',
          ...style,
        }}
        {...options}
        panes={panes}
        {...propsForRouteChange}
      />
    );
  }
}

export default Tabs;
