import React from "react";
import Modal from "@/components/common/Modal";
import AddSettlementForm from "../AddSettlementForm";

interface IAddSettlementModal {
  isModalVisible: boolean;
  toggle: () => void;
  submitCallback?: () => void;
  creditId: string;
  interestAmount?: number;
}

const AddSettlementModal = ({
  isModalVisible,
  toggle,
  interestAmount,
  submitCallback,
  creditId,
}: IAddSettlementModal) => {
  const dateNow = new Date(Date.now());
  return (
    <Modal
      visible={isModalVisible}
      onBackdropPress={toggle}
      onBackButtonPress={toggle}
      animationInTiming={300}
      animationOutTiming={300}
    >
      <AddSettlementForm
        currentDate={dateNow}
        currentInterestAmount={interestAmount}
        submitCallback={submitCallback}
        creditId={creditId}
      />
    </Modal>
  );
};

export default AddSettlementModal;
