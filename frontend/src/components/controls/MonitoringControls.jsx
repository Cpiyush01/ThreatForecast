import React from 'react';
import LiveCaptureControls from './LiveCaptureControls';
import PcapUpload from './PcapUpload';

export const MonitoringControls = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <LiveCaptureControls />
      <PcapUpload />
    </div>
  );
};

export default MonitoringControls;
