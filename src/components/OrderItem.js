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

export default class OrderItem extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {

  }
  render() {
    return (
      <TouchableHighlight style={styles.orderItem} onPress={this.handleClick}>
        <View>
          <Text>{`${Strings.ORDER_NUMBER}: ${this.props.orderNumber}`}</Text>
          <Text>{`${Strings.ORDER_DATE}: ${this.props.orderDate}`}</Text>
          {
            this.props.lineItems.map((item, i)=>{
              return (
                <Text
                  key={`${item.orderItemId}${i}`}
                >
                {item.orderDetail}
              </Text>)
            })
          }
        </View>
      </TouchableHighlight>
    );
  }
}
