import React from "react";
import { MDBBreadcrumb, MDBBreadcrumbItem, MDBContainer } from "mdbreact";
// import { BrowserRouter as Router } from "react-router-dom";
const BreadcrumbPage = () => {
  const bgBlue = {
   // marginTop: "70px",
    marginbottom: "0"
  };
  return (
    <MDBContainer style={bgBlue}>
      <MDBBreadcrumb light color="primary">
          <MDBBreadcrumbItem>Home</MDBBreadcrumbItem>
          <MDBBreadcrumbItem active>Data</MDBBreadcrumbItem>
        </MDBBreadcrumb>
    </MDBContainer>
  );
};

export default BreadcrumbPage;
