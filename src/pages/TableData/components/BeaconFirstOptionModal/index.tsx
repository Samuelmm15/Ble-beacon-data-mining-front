import { Modal, Select } from "antd";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Beacon } from "../..";

interface BeaconFirstOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  beacons: string[];
  setBeaconId: Dispatch<SetStateAction<string>>;
}

const BeaconFirstOptionModal = ({
  isVisible,
  onClose,
  beacons,
  setBeaconId,
}: BeaconFirstOptionModalProps) => {
  
  const handleSelectChange = (value: string) => {
    setBeaconId(value);
  };

  return (
    <Modal
      title="Select a beacon to start with"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Select placeholder="Select a beacon to start with" onChange={handleSelectChange}>
        {beacons.map((beacon) => (
          <Select.Option key={beacon} value={beacon}>
            {beacon}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
};

export default BeaconFirstOptionModal;
