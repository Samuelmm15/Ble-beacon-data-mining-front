import { DatePicker, Modal, Select, Space, TimePicker } from 'antd';
import React, { Dispatch, SetStateAction, useRef } from 'react'

interface TrackerThirdOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  trackers: string[];
  setSpecificDate: Dispatch<SetStateAction<any>>;
  setHourRange: Dispatch<SetStateAction<string[]>>;
}

const TrackerThirdOptionModal: React.FC<TrackerThirdOptionModalProps> = ({
  isVisible,
  onClose,
  trackers,
  setSpecificDate,
  setHourRange,
}) => {
  const actualtrackerId = useRef<string>("");

  const handleSelectChange = (value: string) => {
    actualtrackerId.current = value;
  };

  const handleDateChange = (date: any, dateString: string | string[]) => {
    setSpecificDate(dateString);
  };

  const handleTimeRangeChange = (time: any, timeString: [string, string]) => {
    setHourRange(timeString);
  };

  return (
    <Modal
      title="Seleccione un tracker, una fecha y un rango de horas"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space direction="vertical">
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
        <DatePicker onChange={handleDateChange} />
        <TimePicker.RangePicker
          format="HH:mm"
          onChange={handleTimeRangeChange}
        />
      </Space>
    </Modal>
  )
}

export default TrackerThirdOptionModal
