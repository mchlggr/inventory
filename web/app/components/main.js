import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as InventoryActions from 'shared/actions';
import {Route, BrowserRouter, Link, Redirect, Switch, withRouter} from 'react-router-dom';
import Inventory from './inventory';
import InventoryFilter from './inventoryFilter';
import Orders from './orders';
import Reports from './reports';
import Users from './users';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';


class MyMenuItem extends Component {
  constructor() {
    super();
    this.state = {};
    this._click = ::this.click;
    this._close = ::this.close;
  }

  click(e) {
    this.setState({
      open: !this.state.open,
      anchorEl: e.currentTarget
    });
  }

  close() {
    this.setState({
      open: false
    });
  }

  render() {
    const { label, path, style, children } = this.props;
    const { open, anchorEl } = this.state;
    if (children) {
      return (
        <div>
          <FlatButton style={Object.assign({fontSize:'18px', color:'white', height:'64px'}, style)}
                      hoverColor='rgba(255,255,255,0.2)' onClick={this._click}>
            {label}
          </FlatButton>
          <Popover open={open} anchorEl={anchorEl}
                   anchorOrigin={{horizontal: 'left', vertical: 'bottom'}} targetOrigin={{horizontal: 'left', vertical: 'top'}}
                   onRequestClose={this._close}>
            {children}
          </Popover>
        </div>
      )
    } else {
      return (
        <Link to={path || ('/' + label.toLowerCase())}>
          <FlatButton style={Object.assign({fontSize:'18px', color:'white', height:'64px'}, style)}
                      hoverColor='rgba(255,255,255,0.2)'>
            {label}
          </FlatButton>
        </Link>
      );
    }
  }
}

class Main extends Component {
  render() {
    const { actions, inventory } = this.props;
    if (inventory.user) {
      return (
        <div style={{height:'100%', width:'100%', display:'grid', backgroundColor:'rgba(207,216,220,0.2)',
                     gridTemplateColumns:'256px 1fr', gridTemplateRows:'auto 1fr 32px'}}>
          <div style={{gridRow:'1', gridColumn:'1 / 3'}}>
            <div style={{display:'flex', alignItems:'center', justifyContent:'space-between',
                         backgroundColor:'#607d8b', color:'white', padding:'0 20px'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <MyMenuItem label='Inventory' path='/'/>
                <MyMenuItem label='Users'/>
                <MyMenuItem label='Reports'/>
                <MyMenuItem label='Orders'/>
              </div>
              <MyMenuItem label={inventory.user.name} style={{fontSize:'14px', padding:'0 10px'}}>
                <Menu>
                  <MenuItem primaryText='Sign out' onClick={actions.logout.bind(this)} />
                </Menu>
              </MyMenuItem>
            </div>
          </div>
          <div style={{gridRow:'2', gridColumn:'1', display:'flex', flexDirection:'column', padding:'15px 0 15px 15px'}}>
            <Switch>
              <Route path='/' exact={true} component={InventoryFilter}/>
            </Switch>
          </div>
          <div style={{gridRow:'2', gridColumn:'2', display:'flex', flexDirection:'column', padding:'15px'}}>
            <Switch>
              <Route path='/users' component={Users}/>
              <Route path='/reports' component={Reports}/>
              <Route path='/orders' component={Orders}/>
              <Route component={Inventory}/>
            </Switch>
          </div>
          <div style={{gridRow:'3', gridColumn:'1 / 3', display:'flex', backgroundColor:'#455a64',
                       alignItems:'center', justifyContent:'center', color:'#ddd', fontSize:'13px'}}>
            <div>Copyright {(new Date()).getFullYear()}</div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default withRouter(connect(
  (state) => ({
    inventory: state.inventory
  }),
  (dispatch) => ({
    actions: bindActionCreators({...InventoryActions}, dispatch)
  })
)(Main));