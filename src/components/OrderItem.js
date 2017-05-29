import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import Strings from '../../constants/Strings';


const styles = StyleSheet.create({
  orderItem: {
    backgroundColor: "white",
    flex: 1
  }
});

class OrderLineItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    const { orderKey, handleClick, orderItemId} = this.props;
    handleClick({orderItemId, orderKey})
  }
  render(){
    return( 
      <TouchableHighlight 
        style={styles.orderItem} 
        onPress={this.handleClick}
        >
        <Text>
          {this.props.orderDetail}
        </Text>
      </TouchableHighlight>);
  }
} 

const OrderItem = (props)=> (
  <View style={styles.orderItem}>
    <Text>{`${Strings.ORDER_NUMBER}: ${props.orderNumber}`}</Text>
    <Text>{`${Strings.ORDER_DATE}: ${props.orderDate}`}</Text>
    {
      props.lineItems.map((item, i)=>(
         <OrderLineItem
           key={`${item.orderItemId}${i}`}
           {...props}
           {...item}
         />))
    }
  </View>
);

export default OrderItem;

 

