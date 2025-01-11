import { Image, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { CardTitle } from "../CardTitle/CardTitle";
import Fontisto from "@expo/vector-icons/Fontisto";
import { app_colors } from "@gcVigilantes/utils/default.colors";
import { styles } from "./style.default";
import { ENDPOINTS } from "@gcVigilantes/utils";

export type AttachmentLibraryProps = {
  uris: string[];
  estatusVisita: string;
  handleClose: () => void;
  onDelete: (uri: string) => void;
};

export const AttachmentLibrary = (props: AttachmentLibraryProps) => {
  return (
    <ScrollView
      contentContainerStyle={{
        maxHeight: 800,
        minHeight: 600,
      }}
    >
      <CardTitle title="Adjuntos" removeIcon handleRemove={props.handleClose} />
      <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
        {props.uris.map((uri, index) => (
          <View
            key={index}
            style={{
              padding: 10,
              width: "50%",
              height: 200,
            }}
          >
            {props.estatusVisita.includes("Activa") && (
              <TouchableOpacity
                style={styles.trashBin}
                onPress={() => props.onDelete(uri)}
              >
                <Fontisto name="trash" size={24} color={app_colors.red} />
              </TouchableOpacity>
            )}
            <Image
              source={{
                uri: uri.includes("uploads")
                  ? `${ENDPOINTS.BASE_URL}/${uri}`
                  : uri,
                cache: "reload",
                headers: { Pragma: "no-cache" },
              }}
              style={{ width: 150, height: 150 }}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
