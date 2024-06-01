import { Modal, Select } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface TrackerFirstOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  trackers: string[];
  setTrackerId: Dispatch<SetStateAction<string>>;
}

const TrackerFirstOptionModal = ({
  isVisible,
  onClose,
  trackers,
  setTrackerId,
}: TrackerFirstOptionModalProps) => {
  const handleSelectChange = (value: string) => {
    setTrackerId(value);
  };

  return (
    <Modal
      title="Seleccione un tracker"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Select placeholder="Seleccione un tracker" onChange={handleSelectChange}>
        {trackers.map((tracker) => (
          <Select.Option key={tracker} value={tracker}>
            {tracker}
          </Select.Option>
        ))}
      </Select>
    </Modal>
  );
};

export default TrackerFirstOptionModal;
