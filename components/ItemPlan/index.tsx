import DefaultTheme from "@/theme/index";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import Text from "@/views/Text";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";
import { router } from "expo-router";
import { PlanData } from "@/services";

interface Props {
  items: PlanData;
  index: number;
  dataLength: number;
}

const ItemPlan: React.FC<Props> = ({ items, index, dataLength }) => {
  const { t } = useTranslation();

  return (
    <Container
      lastIndex={index === dataLength - 1 ? true : false}
      onPress={() => {
        router.push({
          pathname: "/edit_plan",
          params: {
            id: items?.id,
            title: items?.attributes?.title,
            date: items?.attributes?.date,
          },
        });
      }}
    >
      <RowBetweenView>
        <TextTitle>{items?.attributes?.title}</TextTitle>
        <ViewDate>
          <TextDate>
            {dayjs(items?.attributes?.date).format("DD.MM.YYYY")}
          </TextDate>
        </ViewDate>
      </RowBetweenView>
    </Container>
  );
};

const Container = styled.Pressable<{ lastIndex: boolean }>`
  margin-top: 10px;
  margin-bottom: ${(props) => (props.lastIndex ? 0 : 10)}px;
`;

const RowBetweenView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextTitle = styled(Text)`
  color: ${DefaultTheme.colors.black16};
  font-size: 16px;
  font-family: ${DefaultTheme.fonts.scandia.regular};
`;

const ViewDate = styled.View`
  padding: 4px 12px 4px 12px;
  border-radius: 24px;
  background-color: ${DefaultTheme.colors.blueOpacity10};
`;

const TextDate = styled(Text)`
  font-size: 14px;
  font-family: ${DefaultTheme.fonts.scandia.medium};
  color: ${DefaultTheme.colors.blue};
`;

export default ItemPlan;
