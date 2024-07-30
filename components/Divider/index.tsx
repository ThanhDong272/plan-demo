import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { screenWidth } from "@/utils/common";
import DefaultTheme from "@/theme";

interface Props {}

const Divider: React.FC<Props> = () => {
  return <Container />;
};

const Container = styled.View`
  width: "auto";
  height: 1px;
  background-color: ${DefaultTheme.colors.blackOpacity10};
`;

export default Divider;
