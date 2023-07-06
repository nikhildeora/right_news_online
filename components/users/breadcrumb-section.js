import React from "react";
import Table from 'react-bootstrap/Table';
export default function BreadcrumbSection(props) {
	return (
		<div className="fugu--breadcrumbs-section">
			<div className="fugu--breadcrumbs-data center-content">
				<h1 className="wow fadeInUpX" data-wow-delay="0s">
					Paid Users
				</h1>
				<Table striped bordered hover variant="dark">
      <thead>
        <tr>
		  <th>Email</th>
        </tr>
      </thead>
      <tbody>
		{props.users.map((user,i)=>(
			    <tr key={i}>
				<td>{user.userEmail}</td>
			  </tr>))}
      </tbody>
    </Table>
			</div>
		</div>
	);
}
