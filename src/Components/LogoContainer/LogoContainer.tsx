import React from "react";
import { useSelector } from "react-redux";
import { View, Image } from "react-native";
import { LogoContainerStyles } from "./constants";
import { RootState } from "@gcVigilantes/store";
import { ENDPOINTS, ROUTES } from "@gcVigilantes/utils";

export const LogoContainer = () => {
  const { logoUrl } = useSelector((state: RootState) => state.vigilancia);
  const { screen } = useSelector((state: RootState) => state.pagination);
  return (
    <>
      {![ROUTES.HOME].includes(screen) && (
        <View style={[LogoContainerStyles.container]}>
          <Image
            style={[LogoContainerStyles.logo]}
            source={{ uri: `${ENDPOINTS.WEB_SERVER}/${logoUrl}` }}
          />
        </View>
      )}
    </>
  );
};
