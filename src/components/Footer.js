import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";

const FooterPage = () => {
  const bgBlue = {
    backgroundColor: "#3F51B5",
    position: "absolute",
    width: "100%",
    bottom: 0,
  };
  return (
    <MDBFooter style={bgBlue} className="font-small pt-4 mt-4">
      <MDBContainer fluid className="text-center text-md-left">
        <MDBRow>
          <MDBCol md="6">
            <h5 className="title">Footer</h5>
            <p>
              Here you can use rows and columns here to organize your footer
              content.
            </p>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
          &copy; {new Date().getFullYear()} Team:{" "}
          <a href="https://www.facebook.com/nevergone102"> MLN </a>
        </MDBContainer>
      </div>
    </MDBFooter>
  );
};

export default FooterPage;
