import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { VideoRoom } from '../../../components/telemedicine/VideoRoom';
import { AudioOnlyRoom } from '../../../components/telemedicine/AudioOnlyRoom';
import { NetworkQualityBadge } from '../../../components/telemedicine/NetworkQualityBadge';
import { useCallStore } from '../../../store/callStore';

export const PatientCall: React.FC = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { callMode, networkQuality } = useCallStore();

  const handleEndCall = () => {
    navigate('/patient');
  };

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Telemedicine Consultation</h1>
          <p className="text-xs text-text-muted mt-1">Session ID: {sessionId}</p>
        </div>
        <NetworkQualityBadge quality={networkQuality} />
      </div>

      {callMode === 'AUDIO' ? (
        <AudioOnlyRoom onEndCall={handleEndCall} />
      ) : (
        <VideoRoom localStream={null} remoteStream={null} onEndCall={handleEndCall} />
      )}
    </div>
  );
};
