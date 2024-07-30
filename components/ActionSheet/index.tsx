import React from "react";
import { StyleSheet } from "react-native";
import styled from "styled-components/native";
import DefaultTheme from "@/theme/index";
import Text from "@/views/Text";

export type ActionItem = {
  id: string;
  label: string;
  onPress: () => void;
  textColor?: string;
};

interface Props {
  actionItems?: Array<ActionItem>;
  onCancel?: () => void;
  textColorCancel?: string;
}

const ActionSheet: React.FC<Props> = ({ actionItems = [] }) => {
  const actionSheetItems = [...actionItems];

  return (
    <Container>
      {actionSheetItems?.map((item, index) => {
        return (
          <TouchableHighlight
            style={[
              styles.actionSheetView,
              index === 0 && {
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
              },
              index === actionSheetItems.length - 2 && {
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              },
              index === actionSheetItems.length - 1 && {
                borderBottomWidth: 0,
                backgroundColor: DefaultTheme.colors.white,
                marginTop: 8,
                borderTopLeftRadius: 12,
                borderTopRightRadius: 12,
                borderBottomLeftRadius: 12,
                borderBottomRightRadius: 12,
              },
            ]}
            underlayColor={DefaultTheme.colors.greyB6}
            key={index}
            onPress={item.onPress}
          >
            <TextActionSheet textColor={item?.textColor!}>
              {item?.label}
            </TextActionSheet>
          </TouchableHighlight>
        );
      })}
    </Container>
  );
};

const Container = styled.View`
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  margin-left: 8px;
  margin-right: 8px;
  margin-bottom: 40px;
`;

const TouchableHighlight = styled.TouchableHighlight``;

const TextActionSheet = styled(Text)<{ textColor: string }>`
  font-size: 20px;
  font-weight: 400;
  color: ${(props) => props.textColor};
`;

const styles = StyleSheet.create({
  actionSheetView: {
    backgroundColor: DefaultTheme.colors.white,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default ActionSheet;
