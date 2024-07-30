import DefaultTheme from "@/theme/index";
import React, { useEffect } from "react";
import styled from "styled-components/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
interface Props {
  progress: number;
  width: number;
  height: number;
}

const ProgressBar: React.FC<Props> = ({ progress, width, height }) => {
  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(progress * width, { duration: 500 });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: animatedWidth.value,
    };
  });

  return (
    <Container width={width} height={height}>
      <ProgressAnimated height={height} style={[animatedStyle]} />
    </Container>
  );
};

const Container = styled.View<{ width: number; height: number }>`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border-radius: 5px;
  background-color: ${DefaultTheme.colors.blueOpacity10};
  overflow: hidden;
`;

const ProgressAnimated = styled(Animated.View)<{ height: number }>`
  height: ${(props) => props.height}px;
  background-color: ${DefaultTheme.colors.blue};
`;

export default ProgressBar;
