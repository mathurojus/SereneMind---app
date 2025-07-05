import React, { useState } from 'react';
import { Watch, Smartphone, Check, AlertCircle } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface SmartWatchConnectorProps {
  onClose: () => void;
}

export function SmartWatchConnector({ onClose }: SmartWatchConnectorProps) {
  const [selectedDevice, setSelectedDevice] = useState<string>('');
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const devices = [
    {
      id: 'apple',
      name: 'Apple Watch',
      description: 'Connect via Apple Health',
      icon: '⌚',
      available: true
    },
    {
      id: 'google',
      name: 'Wear OS',
      description: 'Connect via Google Fit',
      icon: '📱',
      available: true
    },
    {
      id: 'fitbit',
      name: 'Fitbit',
      description: 'Connect via Fitbit API',
      icon: '⌚',
      available: true
    },
    {
      id: 'garmin',
      name: 'Garmin',
      description: 'Connect via Garmin Connect',
      icon: '⌚',
      available: false
    }
  ];

  const handleConnect = async () => {
    if (!selectedDevice) return;
    
    setConnecting(true);
    
    // Simulate connection process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setConnecting(false);
    setConnected(true);
    
    // Auto close after success
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Connect Smart Watch
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {connected ? (
          <div className="text-center py-8">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h4 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Connected Successfully!
            </h4>
            <p className="text-gray-600 dark:text-gray-400">
              Your health data will now sync automatically
            </p>
          </div>
        ) : (
          <>
            <div className="space-y-3 mb-6">
              {devices.map((device) => (
                <button
                  key={device.id}
                  onClick={() => setSelectedDevice(device.id)}
                  disabled={!device.available}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                    selectedDevice === device.id
                      ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                      : device.available
                      ? 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      : 'border-gray-100 dark:border-gray-700 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{device.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800 dark:text-gray-200">
                        {device.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {device.description}
                      </p>
                    </div>
                    {!device.available && (
                      <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-blue-800 dark:text-blue-200 font-medium mb-1">
                    Privacy & Security
                  </p>
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Your health data is encrypted and stored securely. We only access the metrics you choose to share.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={onClose} variant="secondary" className="flex-1">
                Cancel
              </Button>
              <Button
                onClick={handleConnect}
                disabled={!selectedDevice || connecting}
                className="flex-1"
              >
                {connecting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Connecting...
                  </>
                ) : (
                  'Connect'
                )}
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}