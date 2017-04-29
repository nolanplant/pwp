import React, { Component } from "react";
import { Text, View, StyleSheet, Image } from "react-native";

const styles = StyleSheet.create({
  image: {
    height:100,
    width:100,
    borderRadius:50
  }
});

const Avatar = (props) => {
  return (props.avatarSrc && 
    <Image 
      source={{uri:props.avatarSrc}} 
      style={styles.image} />) || null;
}

export default Avatar;
