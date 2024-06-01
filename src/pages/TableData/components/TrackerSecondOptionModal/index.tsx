import { DatePicker, Modal, Select, Space } from "antd";
import React, { Dispatch, SetStateAction, useRef } from "react";

interface TrackerSecondOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  trackers: string[];
  setTrackerId: Dispatch<SetStateAction<string>>;
  setTimeRange: Dispatch<SetStateAction<string[]>>;
}

const TrackerSecondOptionModal = ({
  isVisible,
  onClose,
  trackers,
  setTrackerId,
  setTimeRange,
}: TrackerSecondOptionModalProps) => {
  const actualTrackerId = useRef<string>("");

  const handleSelectChange = (value: string) => {
    actualTrackerId.current = value;
  };

  const handleTimeRangeChange = (dates: any, dateStrings: [string, string]) => {
    if (dates) {
      const formattedDates = dates.map((date: any) =>
        date.format("YYYY-MM-DDTHH:mm:ss")
      );
      setTimeRange(formattedDates);
      setTrackerId(actualTrackerId.current);
    }
  };
  return (
    <Modal
      title="Seleccione un tracker y un rango de tiempo"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space>
        <Select
          placeholder="Seleccione un tracker"
          onChange={handleSelectChange}
        >
          {trackers.map((tracker) => (
            <Select.Option key={tracker} value={tracker}>
              {tracker}
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

export default TrackerSecondOptionModal;
