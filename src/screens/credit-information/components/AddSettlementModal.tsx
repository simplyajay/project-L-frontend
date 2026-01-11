import React from "react";
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
      <AddSettlementForm currentDate={dateNow} currentInterestAmount={interestAmount} />
    </Modal>
  );
};

export default AddSettlementModal;
