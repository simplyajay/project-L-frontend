import React from "react";
import { View, Text } from "react-native";
import Modal from "@/components/common/Modal";
import AddSettlementForm from "../AddSettlementForm";

interface IAddSettlementModal {
  isModalVisible: boolean;
  toggle: () => void;
  interestAmount?: number;
}

const AddSettlementModal = ({ isModalVisible, toggle, interestAmount }: IAddSettlementModal) => {
  const dateNow = new Date(Date.now());
  return (
    <Modal
      visible={isModalVisible}
      onBackdropPress={toggle}
      onBackButtonPress={toggle}
      animationInTiming={300}
      animationOutTiming={300}
    >
      <AddSettlementForm currentDate={dateNow} currentIneterestAmount={interestAmount} />
    </Modal>
  );
};

export default AddSettlementModal;
