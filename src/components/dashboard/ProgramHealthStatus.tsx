
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CircleAlert, CircleCheck } from 'lucide-react';
import { ProgramStatus } from '@/types/dashboard';

interface ProgramHealthStatusProps {
  status: ProgramStatus;
}

export const ProgramHealthStatus: React.FC<ProgramHealthStatusProps> = ({ status }) => {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Program Health Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center">
          <div className="flex-1 bg-gray-200 h-8 rounded-md overflow-hidden flex">
            <div 
              className={`h-full ${
                status === 'red' 
                  ? 'bg-red-500' 
                  : status === 'yellow' 
                    ? 'bg-yellow-400' 
                    : 'bg-green-500'
              }`}
              style={{ width: '60%' }}
            ></div>
          </div>
          <div className="ml-4">
            <div className="flex items-center">
              {status === 'red' ? (
                <CircleAlert className="text-red-500 mr-2" />
              ) : status === 'yellow' ? (
                <CircleAlert className="text-yellow-400 mr-2" />
              ) : (
                <CircleCheck className="text-green-500 mr-2" />
              )}
              <span className="font-medium">
                {status === 'red' 
                  ? 'Critical Risk Level' 
                  : status === 'yellow' 
                    ? 'Elevated Risk Level' 
                    : 'Acceptable Risk Level'}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {status === 'red' 
                ? 'Immediate action required' 
                : status === 'yellow' 
                  ? 'Monitor closely and develop mitigation plans' 
                  : 'Continue standard monitoring'}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
