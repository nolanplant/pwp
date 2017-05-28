import React from "react";
import SkeletonList from "./SkeletonList";
import { View, ActivityIndicator, Image, Dimensions, StyleSheet } from "react-native";

const { height, width } = Dimensions.get("window");

const WinerySkeleton = () => (
  <Image source={require("../../images/skeleton-wine.png")}
    style={{ width: width - 20, height: 100, borderColor: "white", borderWidth: 2, opacity: 0.35 }}
  />
);

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: "white"
  },
  centering: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
  },
  spinnerWrap: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3
  },
  // baseStyles: ,
  spinner: { height: 80 }
});

export default WineryByRegionSkeleton = () => (
  <View style={styles.base}>
    <View
      pointerEvents="none"
      style={styles.spinnerWrap}
    >
      <ActivityIndicator
        animating
        style={[styles.centering, styles.spinner]}
        size="large"
      />
    </View>
    <SkeletonList
      baseStyles={{
        marginTop: 10,
        backgroundColor: "white"
      }}
      numberOfBones={5}
      ChildComponent={WinerySkeleton}
    />
  </View>
);
