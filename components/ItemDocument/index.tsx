import DefaultTheme from "@/theme/index";
import React, { useState } from "react";
import { Platform, StyleSheet } from "react-native";
import styled, { useTheme } from "styled-components/native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import Text from "@/views/Text";
import { useTranslation } from "react-i18next";
import {
  DocumentType,
  PlanDocumentData,
  PlanDocumentDataAttributesMime,
} from "@/services";
import { DOCUMENTS_TYPE } from "@/constants";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import Divider from "../Divider";
import usePlan from "@/hooks/usePlan";
import Modal from "react-native-modal";
import ActionSheet from "../ActionSheet";

interface Props {
  planId: string;
  items: PlanDocumentData;
}

const ItemDocument: React.FC<Props> = ({ planId, items }) => {
  const { t } = useTranslation();
  const { deletePlanDocument, updatePlanDocument } = usePlan({ planId });

  const [openMenu, setOpenMenu] = useState(false);
  const [showActionSheet, setShowActionSheet] = useState(false);

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

    if (!result?.canceled) {
      updatePlanDocument.mutate({
        id: items?.id,
        payload: {
          _method: "PUT",
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
      updatePlanDocument.mutate({
        id: items?.id,
        payload: {
          _method: "PUT",
          document: documentFile,
        },
      });
    }
  };

  return (
    <CardContainer>
      {items?.type === DOCUMENTS_TYPE.PLAN_DOCUMENT ? (
        <RowBetweenView>
          <RowView>
            <DocumentImageView>
              <DocumentImage
                source={
                  items?.attributes?.mime ===
                  PlanDocumentDataAttributesMime["application/pdf"]
                    ? require("@/assets/images/image_documents.png")
                    : require("@/assets/images/image_sheets.png")
                }
              />
            </DocumentImageView>
            <TextDocument>{items?.attributes?.name}</TextDocument>
          </RowView>
          <Menu
            opened={openMenu}
            onBackdropPress={() => setOpenMenu(!openMenu)}
          >
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
                  setShowActionSheet(true);
                }}
              >
                <TextCommon color={DefaultTheme.colors.blue} fontSize={14}>
                  {t("action.update")}
                </TextCommon>
              </MenuOption>
              <Divider />
              <MenuOption
                onSelect={() => {
                  setOpenMenu(!openMenu);
                  deletePlanDocument.mutate({
                    id: items?.id,
                  });
                }}
              >
                <TextCommon color={DefaultTheme.colors.red} fontSize={14}>
                  {t("action.delete")}
                </TextCommon>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </RowBetweenView>
      ) : null}
      <Modal
        style={styles.actionSheetModal}
        onBackdropPress={() => {
          setShowActionSheet(false);
        }}
        isVisible={showActionSheet}
      >
        <ActionSheet actionItems={actionItems} />
      </Modal>
    </CardContainer>
  );
};

const CardContainer = styled.View`
  margin-vertical: 5px;
  background-color: ${DefaultTheme.colors.white};
  border-radius: 14px;
  padding: 14px;
  shadow-color: ${DefaultTheme.colors.black};
  shadow-offset: 0px 5px;
  shadow-opacity: 0.1;
  shadow-radius: 3.84px;
  elevation: 1.5;
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

const DocumentImageView = styled.View`
  padding: 6px;
  border-radius: 10px;
  background-color: ${DefaultTheme.colors.blueOpacity10};
`;

const DocumentImage = styled.Image`
  width: 26px;
  height: 26px;
`;

const TextDocument = styled(Text)`
  margin-left: 10px;
  font-size: 16px;
  color: ${DefaultTheme.colors.black16};
`;

const MenuImage = styled.Image`
  width: 15px;
  height: 4px;
`;

const TextCommon = styled(Text)<{ color: string; fontSize: number }>`
  color: ${(props) => props.color};
  font-size: ${(props) => props.fontSize}px;
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

export default ItemDocument;
