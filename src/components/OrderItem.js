import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import Strings from '../../constants/Strings';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = StyleSheet.create({
  orderItem: {
    flex: 1,
    marginLeft: -20,
    marginRight: -20,
    alignSelf: 'stretch',
    marginBottom: 5
  },
  orderTitle: {
    fontSize: 12,
    color: "#bebebe",
    marginLeft: 20,
    marginBottom: 10,
    textAlign: 'center'
  },
  orderItemChildren: {
    flex:1,
    backgroundColor: "white",
    marginBottom: 5,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    minWidth: 250,
    borderRadius: 10
  }
  ,orderItemChildrenTxt: {
    color: '#666666'
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
      <TouchableHighlight style={styles.orderItemChildren} onPress={this.handleClick}
        underlayColor="#B98E1D"
        >
        <Text style={styles.orderItemChildrenTxt} >
          {this.props.orderDetail}
        </Text>
    
      </TouchableHighlight>);
  }
} 

const OrderItem = (props)=> (
  <View style={styles.orderItem} >
    <Text style={styles.orderTitle}>
     {`${Strings.ORDER_NUMBER}: ${props.orderNumber}`}</Text>
    {
      props.lineItems.map((item, i)=>(
         <OrderLineItem
           key={`${item.orderItemId}${i}`}
           {...props}
           {...item}
         />
         
         ))
    }

  </View>
);

export default OrderItem;

 

