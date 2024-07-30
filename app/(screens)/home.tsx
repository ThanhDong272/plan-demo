import DefaultTheme from "@/theme/index";
import React, { useCallback, useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import Text from "@/views/Text";
import { useTranslation } from "react-i18next";
import { FlatList, Pressable, RefreshControl } from "react-native";
import ItemCourse from "@/components/ItemCourse";
import { router, useFocusEffect } from "expo-router";
import usePlan from "@/hooks/usePlan";
import { PER_PAGE } from "@/constants";
import { GetPlansInclude, PlanData, PlanDocumentData } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import ItemPlan from "@/components/ItemPlan";

interface Props {}

const Home: React.FC<Props> = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { getPlans } = usePlan({});

  const COURSE_LIST = [
    {
      id: 1,
      imageCourse: "https://iili.io/dIAmqcQ.png",
      title: "Kurs: Phase 01",
      progressPercentage: 0.7,
      status: t("home.in_progress"),
    },
    {
      id: 2,
      imageCourse: "https://iili.io/dIAmqcQ.png",
      title: "Kurs: Phase 02",
      progressPercentage: 0,
      status: t("home.open"),
    },
    {
      id: 3,
      imageCourse: "https://iili.io/dIAmqcQ.png",
      title: "Kurs: Phase 03",
      progressPercentage: 0,
      status: t("home.open"),
    },
  ];

  const [dataPlan, setDataPlan] = useState<PlanData[] | any>([]);

  useFocusEffect(
    useCallback(() => {
      getPlans.mutate({
        page: 1,
        perPage: PER_PAGE,
        include: GetPlansInclude.documents,
      });
    }, [])
  );

  useEffect(() => {
    const listDataPlan: PlanData[] | undefined = queryClient.getQueryData([
      "dataPlans",
    ]);
    const listInclude: PlanDocumentData[] | undefined =
      queryClient.getQueryData(["includedPlans"]);

    console.log("LIST DATA PLAN: ", listDataPlan);
    console.log("LIST INCLUDE: ", listInclude);

    setDataPlan(listDataPlan);
  }, [queryClient.getQueryData(["dataPlans"])]);

  const renderItemPlan = ({
    item,
    index,
  }: {
    item: PlanData;
    index: number;
  }) => {
    return (
      <ItemPlan items={item} index={index} dataLength={dataPlan?.length} />
    );
  };

  const onRefresh = () => {
    getPlans.mutate({
      page: 1,
      perPage: PER_PAGE,
      include: GetPlansInclude.documents,
    });
  };

  const refreshControl = (
    <RefreshControl
      refreshing={false}
      onRefresh={onRefresh}
      tintColor={DefaultTheme.colors.black16}
      colors={[DefaultTheme.colors.black16]}
      progressViewOffset={0}
    />
  );

  return (
    <Container>
      <FlatList
        refreshControl={refreshControl}
        ListHeaderComponent={
          <>
            <RowBetweenView>
              <WelcomeText>{t("home.welcome", { name: "James" })}</WelcomeText>
              <ProfileImage
                source={{
                  uri: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
                }}
              />
            </RowBetweenView>
            <CardContainer>
              <FlatList
                data={COURSE_LIST}
                renderItem={({ item }) => (
                  <ItemCourse
                    title={item?.title}
                    status={item?.status}
                    imageCourse={item?.imageCourse}
                    percent={item?.progressPercentage}
                  />
                )}
                scrollEnabled={false}
              />
            </CardContainer>
            <TitleTrainingText>
              {t("home.overview_your_training")}
            </TitleTrainingText>
            <CardContainer>
              <Pressable
                onPress={() => {
                  router.push({ pathname: "/upload_plan" });
                }}
              >
                <RowBetweenView>
                  <RowView>
                    <TrainingImageView>
                      <TrainingImage
                        source={require("@/assets/images/image_documents.png")}
                      />
                    </TrainingImageView>
                    <UploadTrainingText>
                      {t("action.upload_new_training")}
                    </UploadTrainingText>
                  </RowView>
                  <CommonArrowImage
                    source={require("@/assets/images/arrow_right.png")}
                  />
                </RowBetweenView>
              </Pressable>
            </CardContainer>
            <RowPagination>
              <Pressable>
                <CommonArrowImage
                  source={require("@/assets/images/arrow_left.png")}
                />
              </Pressable>
              <PageText>
                {t("home.value_of", {
                  value1: 1,
                  value2: 3,
                })}
              </PageText>
              <Pressable>
                <CommonArrowImage
                  source={require("@/assets/images/arrow_right.png")}
                />
              </Pressable>
            </RowPagination>
          </>
        }
        data={[]}
        renderItem={() => <></>}
        ListFooterComponent={
          <CardContainer>
            <FlatList
              data={dataPlan}
              renderItem={renderItemPlan}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </CardContainer>
        }
      />
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${DefaultTheme.colors.white};
  padding-horizontal: 10px;
`;

const RowBetweenView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const RowView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WelcomeText = styled(Text)`
  color: ${DefaultTheme.colors.black};
  font-size: 24px;
  font-family: ${DefaultTheme.fonts.scandia.medium};
`;

const ProfileImage = styled.Image`
  width: 36px;
  height: 36px;
`;

const CardContainer = styled.View`
  margin-vertical: 16px;
  background-color: ${DefaultTheme.colors.white};
  border-radius: 14px;
  padding: 14px;
  shadow-color: ${DefaultTheme.colors.black};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.04;
  shadow-radius: 3.84px;
  elevation: 1.5;
`;

const TitleTrainingText = styled(Text)`
  color: ${DefaultTheme.colors.black};
  font-size: 18px;
`;

const TrainingImageView = styled.View`
  padding: 6px;
  border-radius: 10px;
  background-color: ${DefaultTheme.colors.blueOpacity10};
`;

const TrainingImage = styled.Image`
  width: 26px;
  height: 26px;
`;

const UploadTrainingText = styled(Text)`
  margin-left: 10px;
  font-size: 16px;
  color: ${DefaultTheme.colors.black16};
`;

const CommonArrowImage = styled.Image`
  width: 10px;
  height: 16px;
`;

const RowPagination = styled.View`
  flex-direction: row;
  align-self: flex-end;
  align-items: center;
`;

const PageText = styled(Text)`
  margin-horizontal: 10px;
  color: ${DefaultTheme.colors.greyB6};
  font-size: 14px;
`;

export default Home;
