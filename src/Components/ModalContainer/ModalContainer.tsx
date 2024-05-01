import React from "react";
import { Modal, View } from "react-native";
import { ModalContainerStyles } from "./styles.default";

type ModalContainerProps = {
	animationType?: "none" | "slide" | "fade";
	visible: boolean;
	children?: React.ReactNode;
	onClose?: () => void;
};

export const ModalContainer = ({
	visible,
	animationType,
	children,
	onClose,
}: ModalContainerProps) => {
	return (
		<Modal
			animationType={animationType}
			transparent={true}
			visible={visible}
			onRequestClose={onClose}>
			<View style={ModalContainerStyles}>{children}</View>
		</Modal>
	);
};

ModalContainer.defaultProps = {
	animationType: "slide",
	onClose: () => {},
	children: null,
};
