import DefaultTheme from "@/theme/index";
import React, { useEffect, useState } from "react";
import styled, { useTheme } from "styled-components/native";
import Text from "@/views/Text";
import { useTranslation } from "react-i18next";
import { FlatList, Platform, Pressable } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Modal from "react-native-modal";
import dayjs from "dayjs";
import usePlan from "@/hooks/usePlan";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { StyleSheet } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { DocumentType, PlanDocumentData } from "@/services";
import { useQueryClient } from "@tanstack/react-query";
import ItemDocument from "@/components/ItemDocument";
import ActionSheet from "@/components/ActionSheet";

interface Props {}

const EditPlan: React.FC<Props> = () => {
  const { t } = useTranslation();
  const { id, title, date } = useLocalSearchParams();
  const { updatePlan, getPlan, deletePlan, createPlanDocument } = usePlan({
    planId: id as string,
  });
  const queryClient = useQueryClient();

  const [editTitle, setEditTitle] = useState<string>(title as string);
  const [editDate, setEditDate] = useState<string | null>(date as string);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);
  const [dataDocument, setDataDocument] = useState<PlanDocumentData[] | any>(
    []
  );

  const actionItems = [
    {
      id: "1",
      label: t("action.gallery"),
      onPress: () => {
        setShowActionSheet(false);
        setTimeout(() => {
          handlePickGallery();
        }, 500);
      },
      textColor: DefaultTheme.colors.blue,
    },
    {
      id: "2",
      label: t("action.documents"),
      onPress: () => {
        setShowActionSheet(false);
        setTimeout(() => {
          handlePickDocument();
        }, 500);
      },
      textColor: DefaultTheme.colors.blue,
    },
  ];

  useEffect(() => {
    queryClient.resetQueries({ queryKey: ["planDocuments"], exact: true });

    getPlan.mutate({
      id: id as string,
      params: {
        include: "documents",
      },
    });
  }, []);

  useEffect(() => {
    setDataDocument(queryClient.getQueryData(["planDocuments"]));
  }, [queryClient.getQueryData(["planDocuments"])]);

  const onChangeTitle = (value: string) => {
    setEditTitle(value);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDatePicker = (date: any) => {
    hideDatePicker();
    setEditDate(date);
    updatePlan.mutate({
      id: id as string,
      payload: {
        title: editTitle,
        date: dayjs(editDate).format("YYYY-MM-DD"),
      },
    });
  };

  const handlePickGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    const uri = result?.assets?.[0]?.uri;
    const uriFile = Platform.OS === "ios" ? uri?.replace("file://", "") : uri;

    const imageFile: DocumentType = {
      name: result?.assets?.[0]?.fileName!,
      // type: `image/${result?.assets?.[0]?.fileName
      //   ?.toLowerCase()
      //   ?.split(".")
      //   ?.pop()}`,
      type: result?.assets?.[0]?.mimeType,
      uri: uriFile,
    };

    console.log("PICKER RESULT: ", result);
    console.log("FILE: ", imageFile);

    if (!result.canceled) {
      createPlanDocument.mutate({
        payload: {
          planId: id as string,
          document: imageFile,
        },
      });
    }
  };

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync();
    const uri = result?.assets?.[0]?.uri;
    const uriFile = Platform.OS === "ios" ? uri?.replace("file://", "") : uri;

    const documentFile: DocumentType = {
      name: result?.assets?.[0]?.name,
      type: result?.assets?.[0]?.mimeType,
      uri: uriFile,
    };

    console.log("PICKER RESULT: ", result);

    if (!result?.canceled) {
      createPlanDocument.mutate({
        payload: {
          planId: id as string,
          document: documentFile,
        },
      });
    }
  };

  const renderItemDocument = ({
    item,
    index,
  }: {
    item: PlanDocumentData;
    index: number;
  }) => {
    return <ItemDocument planId={id as string} items={item} />;
  };

  return (
    <Container>
      <RowBetweenView>
        <Pressable
          onPress={() => {
            router.dismiss(1);
          }}
        >
          <ArrowView>
            <ArrowImage
              source={require("@/assets/images/header_arrow_left.png")}
            />
          </ArrowView>
        </Pressable>
        <Menu opened={openMenu} onBackdropPress={() => setOpenMenu(!openMenu)}>
          <MenuTrigger
            style={{ padding: 12 }}
            onPress={() => setOpenMenu(!openMenu)}
          >
            <MenuImage source={require("@/assets/images/menu.png")} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={styles.menuOptions}>
            <MenuOption
              onSelect={() => {
                setOpenMenu(!openMenu);
                deletePlan.mutate({ id: id as string });
              }}
            >
              <TextDeletePlan>{t("action.delete_plan")}</TextDeletePlan>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </RowBetweenView>
      <FlatList
        contentContainerStyle={{ paddingHorizontal: 10 }}
        ListHeaderComponent={
          <>
            <InputTitle
              placeholder={t("upload_plan.enter_title")}
              placeholderTextColor={DefaultTheme.colors.black16}
              value={editTitle}
              valueStyle={editTitle}
              onChangeText={onChangeTitle}
              onSubmitEditing={() => {
                updatePlan.mutate({
                  id: id as string,
                  payload: {
                    title: editTitle,
                    date: dayjs(editDate).format("YYYY-MM-DD"),
                  },
                });
              }}
            />
            <CardContainer>
              <Pressable onPress={showDatePicker}>
                <RowBetweenView>
                  <TextSetDate>{t("action.set_date")}</TextSetDate>
                  <ViewDate>
                    <TextDate>
                      {editDate
                        ? dayjs(editDate).format("DD.MM.YYYY")
                        : t("upload_plan.format_date")}
                    </TextDate>
                  </ViewDate>
                </RowBetweenView>
              </Pressable>
            </CardContainer>
            {dataDocument?.length > 0 && (
              <TextSection marginTop={0}>
                {t("upload_plan.your_training_plan")}
              </TextSection>
            )}
          </>
        }
        data={dataDocument}
        renderItem={renderItemDocument}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <>
            {editTitle && editDate ? (
              <>
                <TextSection marginTop={dataDocument?.length > 0 ? 20 : 0}>
                  {t("upload_plan.upload_your_training")}
                </TextSection>
                <UploadContainerPress onPress={() => setShowActionSheet(true)}>
                  <UploadImage source={require("@/assets/images/upload.png")} />
                  <TextUploadAction>
                    {t("action.tap_to_upload")}
                  </TextUploadAction>
                </UploadContainerPress>
              </>
            ) : null}
          </>
        }
      />

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode={"date"}
        onConfirm={handleConfirmDatePicker}
        onCancel={hideDatePicker}
        date={editDate ? new Date(editDate) : new Date()}
        minimumDate={new Date()}
      />
      <Modal
        style={styles.actionSheetModal}
        onBackdropPress={() => {
          setShowActionSheet(false);
        }}
        isVisible={showActionSheet}
      >
        <ActionSheet actionItems={actionItems} />
      </Modal>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background-color: ${DefaultTheme.colors.white};
`;

const RowBetweenView = styled.View`
  padding-horizontal: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ArrowView = styled.View`
  width: 44px;
  height: 44px;
  border-radius: 82.5px;
  background-color: ${DefaultTheme.colors.blueOpacity10};
  justify-content: center;
  align-items: center;
`;

const ArrowImage = styled.Image`
  width: 12px;
  height: 20px;
`;

const MenuImage = styled.Image`
  width: 15px;
  height: 4px;
`;

const InputTitle = styled.TextInput<{ valueStyle: string }>`
  margin-top: 16px;
  font-size: 24px;
  color: ${DefaultTheme.colors.black16};
  font-family: ${(props) =>
    props.valueStyle
      ? DefaultTheme.fonts.scandia.medium
      : DefaultTheme.fonts.scandia.mediumItalic};
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

const TextSetDate = styled(Text)`
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

const TextSection = styled(Text)<{ marginTop: number }>`
  font-size: 18px;
  color: ${DefaultTheme.colors.black16};
  font-family: ${DefaultTheme.fonts.scandia.regular};
  margin-top: ${(props) => props.marginTop}px;
`;

const UploadContainerPress = styled.Pressable`
  height: 140px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-width: 1px;
  border-radius: 24px;
  border-color: ${DefaultTheme.colors.blackOpacity10};
`;

const UploadImage = styled.Image`
  width: 32px;
  height: 32px;
  margin-bottom: 6px;
`;

const TextUploadAction = styled(Text)`
  font-size: 14px;
  color: ${DefaultTheme.colors.grey93};
`;

const TextDeletePlan = styled(Text)`
  font-size: 14px;
  color: ${DefaultTheme.colors.red};
  font-family: ${DefaultTheme.fonts.scandia.medium};
`;

const styles = StyleSheet.create({
  menuOptions: {
    marginTop: 24,
    marginRight: 24,
    width: "auto",
    borderRadius: 18,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 3,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  actionSheetModal: {
    margin: 0,
    justifyContent: "flex-end",
  },
});

export default EditPlan;
