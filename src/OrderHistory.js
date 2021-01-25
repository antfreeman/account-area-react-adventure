import React, {useState, useEffect} from 'react';
import PageHeader from './PageHeader';
import OrderHistoryItem from './OrderHistoryItem';

import axios from "axios";

const OrderHistory = () => {
	const [orderHistoryData, setOrderHistoryData] = useState([]);

	const getOrderHistory = () =>{
		axios.get('https://reactasty.apps.huel.io/api/customer/orders')
		  .then(function (response) {
		    
		    if(response.data){
		    	setOrderHistoryData(response.data);
		    	console.log(response.data);
		    }
		  })
		  .catch(function (error) {
		    console.log(error);
		  });
	}

	useEffect(() =>{
		getOrderHistory();
	},[]);

	return (
	    <div className="columns is-multiline">
	      <PageHeader title="Order History" />
      		{orderHistoryData &&
	      		orderHistoryData.map((data, index) =>(
	      			data.orders && data.orders.map((orderData, id) => (
	      				<OrderHistoryItem key={id} data={orderData} />
	      			))
	      		))
	      	}
	    </div>
	);
};

export default OrderHistory;
