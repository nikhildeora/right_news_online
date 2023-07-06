import React from "react";
import Table from 'react-bootstrap/Table';
export default function BreadcrumbSection(props) {
	return (
		<div className="fugu--breadcrumbs-section">
			<div className="fugu--breadcrumbs-data center-content">
				<h1 className="wow fadeInUpX" data-wow-delay="0s">
				Transactions
				</h1>
				<Table striped bordered hover variant="dark">
      <thead>
        <tr>
		  <th>Order Id</th>
		  <th>Transaction ID</th>
		  <th>Timestamp</th>
		  <th>News</th>
		  <th>Amount</th>
		  <th>Status</th>
        </tr>
      </thead>
      <tbody>
		{props.transactions.map((transaction,i)=>(
			    <tr key={i}>
				<td>{transaction.orderID}</td>
				<td>{transaction.transcationID}</td>
				<td>{transaction.orderTimeDate}</td>
				<td>{transaction.newsTitle}</td>
				<td>{transaction.orderValue}</td>
				<td>{transaction.genre}</td>
			  </tr>))}
      </tbody>
    </Table>
			</div>
		</div>
	);
}
