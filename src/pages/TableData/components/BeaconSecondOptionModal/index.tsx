import { DatePicker, Modal, Select, Space } from "antd";
import React, { Dispatch, SetStateAction } from "react";

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
  const handleSelectChange = (value: string) => {
    setBeaconId(value);
  };

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
      title="Seleccione un beacon y un rango de tiempo"
      open={isVisible}
      onCancel={onClose}
      onOk={onClose}
    >
      <Space>
        <Select
          placeholder="Seleccione un beacon"
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
