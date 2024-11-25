import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import { View, Text } from "react-native";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { TouchableOpacity } from "react-native-gesture-handler";

export const CardTitle = ({
  title,
  editIcon,
  removeIcon,
  uppercase,
  handleEdit,
  handleRemove,
}: {
  title: string;
  editIcon?: boolean;
  removeIcon?: boolean;
  uppercase?: boolean;
  handleEdit?: () => void;
  handleRemove?: () => void;
}) => {
  return (
    <View
      style={{
        borderColor: app_colors.ligth_bg,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      <Text
        style={{
          marginBottom: 10,
          marginLeft: 10,
          marginTop: 10,
          textAlign: "justify",
          fontSize: 14,
          fontWeight: "bold",
          color: app_colors.text_gray,
          textTransform: uppercase ? "uppercase" : "capitalize",
        }}
      >
        {title}
      </Text>
      {editIcon && (
        <TouchableOpacity style={{ marginTop: 10 }} onPress={handleEdit}>
          <FontAwesome5 name="edit" size={16} color={app_colors.text_gray} />
        </TouchableOpacity>
      )}
      {removeIcon && (
        <TouchableOpacity style={{ marginTop: 10 }} onPress={handleRemove}>
          <FontAwesome5 name="times" size={16} color={app_colors.text_gray} />
        </TouchableOpacity>
      )}
    </View>
  );
};

CardTitle.defaultProps = {
  uppercase: false,
  editIcon: false,
  removeIcon: false,
  handleEdit: () => {},
  handleRemove: () => {},
};
