import React from "react";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import Auth from "../services/Auth";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    console.log(this.state.collapse)
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    const bgPink = { backgroundColor: "#3F51B5" };
    const user = "minh"
    const onClickHandler = (event => {
      Auth.logout()
    })
    return (
      <div>
          <header>
            <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
              <MDBNavbarBrand href="/">
                <strong>TKB</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={this.onClick} />
              <MDBCollapse isOpen={this.state.collapse} navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                    <MDBNavLink to="#">Trang chủ</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/teacherlist">Giáo viên</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/class">Lớp</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="/subject_cl">Môn học</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav> 
                <MDBNavbarNav right>
                  <MDBNavItem>
                    <MDBDropdown>
                      <MDBDropdownToggle nav caret>
                        <MDBIcon icon="user" className="d-inline-inline" />{" "}
                        <div className="d-none d-md-inline">{user} </div>
                      </MDBDropdownToggle>
                      <MDBDropdownMenu right>
                        <MDBDropdownItem href="profile">Thông tin cá nhân</MDBDropdownItem>
                        <MDBDropdownItem onClick = {onClickHandler} href="login">Đăng xuất</MDBDropdownItem>
                      </MDBDropdownMenu>
                    </MDBDropdown>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
      </div>
    );
  }
}

export default Header;
