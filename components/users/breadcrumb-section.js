import React from "react";
import { format } from "date-fns";
import Table from "react-bootstrap/Table";
export default function BreadcrumbSection(props) {
  console.log("user",props);
  return (
    <div className="fugu--breadcrumbs-section">
      <h2
        className="wow fadeInUpX "
        data-wow-delay="0s"
        style={{
          fontSize: "52px",
          color: "#fff",
          textAlign: "center",
          marginBlock: "-60px 60px",
          letterSpacing: "1.5px",
        }}
      >
        PAID USERS
      </h2>
      <div className="fugu--breadcrumbs-data center-content">
        <Table
          striped
          bordered
          hover
          variant="dark"
          style={{ border: "2px solid #fff", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th style={{ paddingBlock: "18px 18px" }}>Email</th>
              <th style={{ paddingBlock: "18px 18px" }}>Active Plan</th>
              <td style={{ paddingBlock: "18px 18px" }}>Plan Expiry</td>
            </tr>
          </thead>
          <tbody>
          {props.users.map((user, i) => (
              <tr key={i}>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {user?.userDetails?.userEmail}
                </td>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {user?.planDetail?.planTitle}
                </td>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {user.endtDate ? format(new Date(user?.endtDate), "dd MMMM yyyy") : null}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
