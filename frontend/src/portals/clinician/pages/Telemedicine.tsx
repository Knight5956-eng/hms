import React from 'react';
import { VideoRoom } from '../../../components/telemedicine/VideoRoom';
import { InCallVitalsPanel } from '../../../components/telemedicine/InCallVitalsPanel';

export const ClinicianTelemedicine: React.FC = () => {
  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <VideoRoom localStream={null} remoteStream={null} onEndCall={() => alert('Call ended')} />
      </div>
      <div>
        <InCallVitalsPanel />
      </div>
    </div>
  );
};
