import { DatePicker, Modal, Select, Space } from "antd";
import React, { Dispatch, SetStateAction, useRef } from "react";

interface BeaconSecondOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  beacons: string[];
  setBeaconId: Dispatch<SetStateAction<string>>;
  setTimeRange: Dispatch<SetStateAction<string[]>>;
}

const BeaconSecondOptionModal = ({
  isVisible,
  onClose,
  beacons,
  setBeaconId,
  setTimeRange,
}: BeaconSecondOptionModalProps) => {
  const actualBeaconId = useRef<string>("");

  const handleSelectChange = (value: string) => {
    actualBeaconId.current = value;
  };

  const handleTimeRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      const formattedDates = dates.map((date: any) =>
        date.format("YYYY-MM-DDTHH:mm:ss")
      );
      setTimeRange(formattedDates);
      setBeaconId(actualBeaconId.current);
    }
  };

  return (
    <Modal
      title="Select a beacon and a time range to start with"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space>
        <Select
          placeholder="Select a beacon to start with"
          onChange={handleSelectChange}
        >
          {beacons.map((beacon) => (
            <Select.Option key={beacon} value={beacon}>
              {beacon}
            </Select.Option>
          ))}
        </Select>
        <DatePicker.RangePicker
          onChange={handleTimeRangeChange}
        />
      </Space>
    </Modal>
  );
};

export default BeaconSecondOptionModal;
