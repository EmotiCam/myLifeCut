import React from "react";
import { View } from "react-native";
import styled from "styled-components";

const EmotionPanel = props => {
  const {
    anger,
    contempt,
    disgust,
    fear,
    happiness,
    neutral,
    sadness,
    surprise
  } = props;

  return (
    <View
      style={{
        height: 110,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <RowFlex>
        <EmotionText>anger: {anger}</EmotionText>
        <EmotionText>contempt: {contempt}</EmotionText>
      </RowFlex>
      <RowFlex>
        <EmotionText>disgust: {disgust}</EmotionText>
        <EmotionText>fear: {fear}</EmotionText>
      </RowFlex>
      <RowFlex>
        <EmotionText>happiness: {happiness}</EmotionText>
        <EmotionText>neutral: {neutral}</EmotionText>
      </RowFlex>
      <RowFlex>
        <EmotionText>sadness: {sadness}</EmotionText>
        <EmotionText>surprise: {surprise}</EmotionText>
      </RowFlex>
    </View>
  );
};

const RowFlex = styled.View`
  flex-direction: row;
`;
const EmotionText = styled.Text`
  width: 190px;
`;

export default EmotionPanel;
