import DefaultTheme from "@/theme/index";
import React from "react";
import styled, { useTheme } from "styled-components/native";
import Text from "@/views/Text";
import { useTranslation } from "react-i18next";
import ProgressBar from "../ProgressBar";
import Divider from "../Divider";

interface Props {
  imageCourse: string;
  title: string;
  percent: number;
  status: string;
}

const ItemCourse: React.FC<Props> = ({
  imageCourse,
  title,
  percent,
  status,
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Wrapper>
        <LeftContainer>
          <ImageCourse source={{ uri: imageCourse }} />
          <TextContainer>
            <TitleCourse>{title ?? "Kurs: Phase 01"}</TitleCourse>
            <ProgressText>
              {t("home.done_process", {
                percent: Math.floor(percent * 100),
              })}
            </ProgressText>
            <ProgressBar progress={percent} width={115} height={5} />
          </TextContainer>
        </LeftContainer>
        <StatusCourse>
          <TextStatus>{status}</TextStatus>
        </StatusCourse>
      </Wrapper>
      <Divider />
    </>
  );
};

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-vertical: 10px;
`;

const LeftContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TextContainer = styled.View`
  margin-left: 10px;
`;

const ImageCourse = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 14px;
`;

const TitleCourse = styled(Text)`
  font-size: 16px;
  color: ${DefaultTheme.colors.black};
`;

const ProgressText = styled(Text)`
  margin-vertical: 2px;
  font-size: 14px;
  color: ${DefaultTheme.colors.grey93};
`;

const StatusCourse = styled.View`
  padding: 4px 12px 4px 12px;
  border-radius: 6px;
  background-color: ${DefaultTheme.colors.blueOpacity10};
`;

const TextStatus = styled(Text)`
  font-size: 14px;
  font-family: ${DefaultTheme.fonts.scandia.medium};
  color: ${DefaultTheme.colors.blue};
`;

export default ItemCourse;
