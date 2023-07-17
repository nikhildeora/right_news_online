import React from "react";
import Table from "react-bootstrap/Table";
export default function BreadcrumbSection(props) {
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
        TRANSACTIONS HISTORY
      </h2>
      <div className=" container">
        <Table
          striped
          bordered
          hover
          variant="dark"
          style={{ border: "2px solid #fff", textAlign: "center" }}
        >
          <thead>
            <tr>
              <th style={{ paddingBlock: "18px 18px" }}>Order Id</th>
              <th style={{ paddingBlock: "18px 18px" }}>Transaction ID</th>
              <th style={{ paddingBlock: "18px 18px" }}>Timestamp</th>
              <th style={{ paddingBlock: "18px 18px" }}>News</th>
              <th style={{ paddingBlock: "18px 18px" }}>Amount</th>
              <th style={{ paddingBlock: "18px 18px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {props.transactions.map((transaction, i) => (
              <tr key={i}>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {transaction.orderID}
                </td>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {transaction.transcationID}
                </td>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {transaction.orderTimeDate.slice(0, 10)}
                </td>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {transaction.newsDetails.newsTitle}
                </td>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {transaction.orderValue}
                </td>
                <td style={{ paddingBlock: "15px 15px" }}>
                  {transaction.genre}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
