import React, {useState, useEffect} from 'react';
import OrderHistoryProduct from './OrderHistoryProduct';
import {FormattedNumber,IntlProvider} from 'react-intl';


const OrderHistoryItemNew = ({data}) => {

  const [orderData, setOrderData] = useState([]);

  const formatAddress = (address) => {
    let newAddress = '';
    newAddress = address.address1 != '' ? address.address1 : '';
    newAddress += address.address2 != '' ? ', '+address.address2 : '';
    newAddress += address.city != '' ? ', '+address.city : '';
    newAddress += address.zip != '' ? ', '+address.zip : '';
    return newAddress;
  }

  const removeflavourFromTitle = (str) =>{
    const flavourLookup = ['Vanilla', 'Banana', 'Chocolate','Berry','Mint-Chocolate','Coffee','Original','Unflavoured & Unsweetened'];
    for(var i=0;i<flavourLookup.length;i++){
      if(str.indexOf(flavourLookup[i])> -1){
        str = str.slice(0, str.indexOf(flavourLookup[i]));
        break;
      }
    }
    return str;
  }
  const removeHuelPowder = (str) =>{
    if(str.indexOf('Huel Powder')> -1){
      str = str.slice(str.indexOf('Huel Powder')+11,str.length);
    }
    return str;
  }
  const processOrderItems = (orderData) =>{
    let orderItems = [];
    for(var item in orderData){
      let orderItem = {};
      let foundVariant = false;
      for(var i=0;i<orderItems.length;i++){
        if(orderItems[i].variantTitle == orderData[item].variant_title){
          orderItems[i].variants += ', '+orderData[item].quantity +' x '+removeHuelPowder(orderData[item].title);
          orderItems[i].total += (Number( orderData[item].price_set.shop_money.amount)* orderData[item].quantity);
          foundVariant = true;
          break;
        }
      }
      if(!foundVariant){
        orderItem.image = orderData[item].image;
        orderItem.title = removeflavourFromTitle(orderData[item].title);
        orderItem.variantTitle = orderData[item].variant_title;
        orderItem.variants = orderData[item].quantity +' x '+removeHuelPowder(orderData[item].title);
        orderItem.currency = orderData[item].price_set.shop_money.currency_code;
        orderItem.total = (Number( orderData[item].price_set.shop_money.amount)* orderData[item].quantity);
        orderItems.push(orderItem);
      }
    }
    setOrderData(orderItems);
  }
  useEffect(() =>{
    processOrderItems(data.line_items);
  },[]);
    //processOrderItems(data);
 
  
  return (
    
      <div className="column is-12">
        <div className="box orders-history-block has-shadow-hover">
          <div className="is-flex orders-block-header">
            <div className="item">
              <div>Order Number</div>
              <div>{data.name}</div>
            </div>
            <div className="item">
              <div>Order Type</div>
              <div>
                <p className="is-onetime">One-time</p>
              </div>
            </div>
            <div className="item">
              <div>Price</div>

              <div><IntlProvider locale='en'>
                <FormattedNumber
                  value={data.total_price}
                  style="currency"
                  currency={data.currency} />
              </IntlProvider></div>
            </div>
            <div className="item">
              <div>Dispatch Date</div>
              <div>{new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                    }).format(Date.parse(data.processed_at))}
              </div>
            </div>
          </div>

          <hr />

          <div className="order-information">
            <p className="title is-6 is-marginless">
              It&apos;s been dispatched!
            </p>

            <div>
              <div className="order-information-expanded">
                <div className="product-list-boxes columns is-multiline">
                  
                  {orderData &&
                    orderData.map((lineItem, index) =>(
                        <OrderHistoryProduct key={index} data={lineItem} />
                    ))
                  }

                </div>

                <hr />
                <div className="is-flex order-footer-information">
                  <div className="left-info">
                    <div>Delivery Address</div>
                    <div>{formatAddress(data.shipping_address)}</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>

  );
};

export default OrderHistoryItemNew;
