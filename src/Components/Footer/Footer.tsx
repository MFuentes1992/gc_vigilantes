import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { View, Text, TouchableOpacity } from "react-native";
import { FooterStyles } from "./constants";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { useNavigation } from "@react-navigation/native";
import { ROUTES } from "@gcVigilantes/utils";
import { useSelector } from "react-redux";
import { RootState } from "@gcVigilantes/store";

export const Footer = () => {
  const navigate = useNavigation();
  const [selectedTab, setSelectedTab] = React.useState<number>(-1);
  const [showFooter, setShowFooter] = React.useState<boolean>(true);
  const currScreen = useSelector((state: RootState) => state.pagination.screen);

  React.useEffect(() => {
    switch (currScreen) {
      case ROUTES.ACTIVATION_CODE:
        setShowFooter(false);
        break;
      case ROUTES.QR:
        setSelectedTab(1);
        break;
      default:
        setSelectedTab(-1);
        setShowFooter(true);
        break;
    }
  }, [currScreen]);

  return (
    <>
      {showFooter && (
        <View style={FooterStyles.container}>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab(0);
            }}
          >
            <FontAwesome
              name="id-card-o"
              size={24}
              color={selectedTab === 0 ? app_colors.black : app_colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab(1);
              navigate.navigate(ROUTES.QR as never);
            }}
          >
            <MaterialCommunityIcons
              name="qrcode-scan"
              size={24}
              color={selectedTab === 1 ? app_colors.black : app_colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setSelectedTab(2);
              /*Should navigate to logs*/
              navigate.navigate(ROUTES.LOGS as never);
            }}
          >
            <Octicons
              name="checklist"
              size={24}
              color={selectedTab === 2 ? app_colors.black : app_colors.primary}
            />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};
