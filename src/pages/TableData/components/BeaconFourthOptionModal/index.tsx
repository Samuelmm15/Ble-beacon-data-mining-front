import { DatePicker, Modal, Space } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface BeaconFourthOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  setTimeRange: Dispatch<SetStateAction<string[]>>;
}

const BeaconFourthOptionModal: React.FC<BeaconFourthOptionModalProps> = ({
  isVisible,
  onClose,
  setTimeRange,
}) => {
  
  const handleTimeRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      const formattedDates = dates.map((date: any) =>
        date.format("YYYY-MM-DDTHH:mm:ss")
      );
      setTimeRange(formattedDates);
    }
  };

  return (
    <Modal
      title="Select a time range to get all the beacons"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space>
        <DatePicker.RangePicker
          onChange={handleTimeRangeChange}
        />
      </Space>
    </Modal>
  );
};

export default BeaconFourthOptionModal;
