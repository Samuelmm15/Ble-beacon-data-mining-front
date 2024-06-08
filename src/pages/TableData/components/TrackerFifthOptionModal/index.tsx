import { DatePicker, Modal, Space, TimePicker } from "antd";
import React, { Dispatch, SetStateAction } from "react";

interface TrackerFifthOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  setSpecificDate: Dispatch<SetStateAction<any>>;
  setHourRange: Dispatch<SetStateAction<string[]>>;
}

const TrackerFifthOptionModal: React.FC<TrackerFifthOptionModalProps> = ({
  isVisible,
  onClose,
  setSpecificDate,
  setHourRange,
}) => {
  const handleDateChange = (date: any, dateString: string | string[]) => {
    setSpecificDate(dateString);
  };

  const handleTimeRangeChange = (time: any, timeString: [string, string]) => {
    setHourRange(timeString);
  };

  return (
    <Modal
      title="Seleccione una fecha y un rango de horas"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space direction="vertical">
        <DatePicker onChange={handleDateChange} />
        <TimePicker.RangePicker
          format="HH:mm"
          onChange={handleTimeRangeChange}
        />
      </Space>
    </Modal>
  );
};

export default TrackerFifthOptionModal;
