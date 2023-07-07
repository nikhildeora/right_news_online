import React from "react";
import { format } from "date-fns";
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
		  <th>Active Plan</th>
		  <td>Plan Expiry</td>
        </tr>
      </thead>
      <tbody>
		{props.users.map((user,i)=>(
			    <tr key={i}>
				<td>{user.userDetails.userEmail}</td>
				<td>{user.planDetail.planTitle}</td>
				<td>{format(new Date(user.endtDate), "dd MMMM yyyy")}</td>
			  </tr>))}
      </tbody>
    </Table>
			</div>
		</div>
	);
}
