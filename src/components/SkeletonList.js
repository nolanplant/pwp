import React from "react";
import { ScrollView } from "react-native";
export default SkeletonList = (props) => {
  const { ChildComponent, numberOfBones, baseStyles } = props;
  return (
    <ScrollView style={{ ...baseStyles }}>
      {
        new Array(numberOfBones).fill().map((item, i) => {
          return (<ChildComponent key={i} />);
        })
      }
    </ScrollView>
  );
};
