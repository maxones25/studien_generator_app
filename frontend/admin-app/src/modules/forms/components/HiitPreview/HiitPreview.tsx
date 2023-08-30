import { Column, Text } from "@modules/core/components";
import React from "react";

export type HiitComponent = {
  attributes: {
    coolDown: number;
    highIntensity: number;
    lowIntensity: number;
    rounds: number;
    warmUp: number;
  };
};

export interface HiitPreviewProps {
  component: HiitComponent;
}

export const HiitPreview: React.FC<HiitPreviewProps> = ({ component }) => {
  const { coolDown, highIntensity, lowIntensity, rounds, warmUp } =
    component.attributes;
  return (
    <Column bgcolor="secondary.light" borderRadius={5} p={1} flex={1}>
      <Text>HIIT</Text>
      <Text variant="caption">Warm Up: {warmUp}</Text>
      <Text variant="caption">Rounds: {rounds}</Text>
      <Text variant="caption">High Intensity: {highIntensity}</Text>
      <Text variant="caption">Low Intensity: {lowIntensity}</Text>
      <Text variant="caption">Cool Down: {coolDown}</Text>
    </Column>
  );
};
