import React from "react";
import { ScrollView } from "react-native";
import BottomButtonsLocation from "./BottomButtonsLocation";
import { LOCATION_LIST } from "../data/locations";
import LocationItem from "./LocationItem";

export default LocationsView = (props) => (
  <ScrollView>
    {
      LOCATION_LIST.map((loc, index) => {
        return (
          <LocationItem
            isFirst={index === 0}
            isLast={index === LOCATION_LIST.length - 1}
            parentNav={props.parentNav}
            key={index}
            {...loc}
          />
        );
      })
    }
    <BottomButtonsLocation onClickButton={props.handleBottomNavClick} />
  </ScrollView>
);
