import { useEffect, useRef, useState } from 'react';
import { useSocket } from './useSocket';

export const useWebRTC = (sessionId?: string, callMode: 'VIDEO' | 'AUDIO' = 'VIDEO') => {
  const socket = useSocket('/signaling');
  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    if (!sessionId) return;

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
    });
    peerConnection.current = pc;

    if (navigator.mediaDevices) {
      navigator.mediaDevices
        .getUserMedia({ video: callMode === 'VIDEO', audio: true })
        .then((stream) => {
          setLocalStream(stream);
          stream.getTracks().forEach((track) => pc.addTrack(track, stream));
        })
        .catch((err) => console.error('Media stream error:', err));
    }

    pc.ontrack = (event) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
      }
    };

    return () => {
      localStream?.getTracks().forEach((track) => track.stop());
      pc.close();
    };
  }, [sessionId, callMode]);

  return { localStream, remoteStream, peerConnection: peerConnection.current, socket };
};
