import { DatePicker, Modal, Select, Space, TimePicker } from 'antd';
import React, { Dispatch, SetStateAction, useRef } from 'react'

interface TrackerThirdOptionModalProps {
  isVisible: boolean;
  onClose: () => void;
  trackers: string[];
  setTrackerId: Dispatch<SetStateAction<string>>;
  setSpecificDate: Dispatch<SetStateAction<any>>;
  setHourRange: Dispatch<SetStateAction<string[]>>;
}

const TrackerThirdOptionModal: React.FC<TrackerThirdOptionModalProps> = ({
  isVisible,
  onClose,
  trackers,
  setTrackerId,
  setSpecificDate,
  setHourRange,
}) => {
  const actualtrackerId = useRef<string>("");

  const handleSelectChange = (value: string) => {
    setTrackerId(value);
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
      title="Select a tracker, a date and a time range to start with"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space direction="vertical">
        <Select
          placeholder="Select a tracker to start with"
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
