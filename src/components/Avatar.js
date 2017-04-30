import React, { Component } from "react";
import { Text, View, StyleSheet, Image, PixelRatio } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

const getAvatarSize = (size) => ({
  height:size,
  width:size,
  borderRadius: Math.floor(size / PixelRatio.get())
});

const Avatar = (props) => {
  return props.avatarSrc ? 
    <Image 
      source={{uri:props.avatarSrc}} 
      style={ getAvatarSize(props.size) } 
      /> :
    <Icon 
      name={"user-circle"} 
      size={props.size} 
      color="#676768" />
}

export default Avatar;
