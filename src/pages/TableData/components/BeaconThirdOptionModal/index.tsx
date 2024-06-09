import { DatePicker, Modal, Select, Space, TimePicker } from "antd";
import React, { Dispatch, SetStateAction, useRef } from "react";

interface BeaconThirdOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  beacons: string[];
  setSpecificDate: Dispatch<SetStateAction<any>>;
  setHourRange: Dispatch<SetStateAction<string[]>>;
}

const BeaconThirdOptionModal: React.FC<BeaconThirdOptionModalProps> = ({
  isVisible,
  onClose,
  beacons,
  setSpecificDate,
  setHourRange,
}) => {
  const actualBeaconId = useRef<string>("");

  const handleSelectChange = (value: string) => {
    actualBeaconId.current = value;
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    setSpecificDate(dateString);
  };

  const handleTimeRangeChange = (time: any, timeString: [string, string]) => {
    setHourRange(timeString);
  };

  return (
    <Modal
      title="Select a beacon, a date and a time range to start with"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space direction="vertical">
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
        <DatePicker onChange={handleDateChange} />
        <TimePicker.RangePicker
          format="HH:mm"
          onChange={handleTimeRangeChange}
        />
      </Space>
    </Modal>
  );
};

export default BeaconThirdOptionModal;
