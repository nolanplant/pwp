import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight
} from "react-native";
import OrderItem from "./OrderItem";

const styles = StyleSheet.create({
  base: {
    flex: 1,
    marginTop: 20
  }
});

const Orders = (props, i) => {
  return (
    <View style={styles.base}>
      { props.orders.map((order) => {
        return (
          <OrderItem
            key={`${order.orderNumber}${i}`}
            orderDate={order.orderDate}
            lineItems={order.lineItems}
            orderNumber={order.orderNumber}
          />);
      })
      }
  </View>);
};

export default Orders;
