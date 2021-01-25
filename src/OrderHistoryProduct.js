import React from 'react';
import {FormattedNumber,IntlProvider} from 'react-intl';


const OrderHistoryProduct = ({data}) => {
	return(
		<div className="column is-6">
			<div className="media">
          <div className="media-left">
            <img
              alt="Product bars"
              className="image"
              src={data.image}
            />
          </div>
          <div className="media-content">
            <div>
              <p className="product-title">
                {data.title}
              </p>
              <p className="product-variants">
                {data.variants}
              </p>
            </div>
          </div>
          <div className="media-right">
            <p className="product-price"><IntlProvider locale='en'>
            <FormattedNumber
              value={data.total}
              style="currency"
              currency={data.currency} />
          </IntlProvider></p>
          </div>
        </div>


		</div>
	)
}

export default OrderHistoryProduct;