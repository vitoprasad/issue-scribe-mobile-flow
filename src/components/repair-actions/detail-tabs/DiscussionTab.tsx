
import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { QuickResponseTemplate, RepairAction } from '../../approval-requests/types';
import { formatDate } from '../utils';
import { MessageSquare } from 'lucide-react';

interface DiscussionTabProps {
  repairAction: RepairAction;
  discussionMessage: string;
  setDiscussionMessage: (value: string) => void;
  onAddDiscussionMessage: () => void;
  quickResponseTemplates: QuickResponseTemplate[];
  onSelectResponseTemplate: (template: string) => void;
}

export const DiscussionTab: React.FC<DiscussionTabProps> = ({
  repairAction,
  discussionMessage,
  setDiscussionMessage,
  onAddDiscussionMessage,
  quickResponseTemplates,
  onSelectResponseTemplate
}) => {
  return (
    <div className="space-y-4">
      {repairAction.discussion && repairAction.discussion.length > 0 ? (
        repairAction.discussion.map((item) => (
          <div key={item.id} className="border rounded-md">
            <div className="bg-gray-50 p-3 rounded-t-md">
              <div className="flex justify-between text-sm text-gray-500">
                <span className="font-medium">{item.user}</span>
                <span>{formatDate(item.timestamp)}</span>
              </div>
              <div className="mt-1 text-gray-700">{item.message}</div>
            </div>
            
            {item.responses.length > 0 && (
              <div className="p-3 pl-6 border-t">
                {item.responses.map((response) => (
                  <div key={response.id} className="mb-3 last:mb-0">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span className="font-medium">{response.user}</span>
                      <span>{formatDate(response.timestamp)}</span>
                    </div>
                    <div className="mt-1 text-gray-700">{response.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))
      ) : (
        <div className="text-center py-6 text-gray-500">
          No discussion yet
        </div>
      )}
      
      <div className="mt-6 border-t pt-4">
        <h3 className="font-medium text-sm mb-2">Quick Response Templates</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {quickResponseTemplates.map((template) => (
            <Button 
              key={template.label}
              variant="outline" 
              size="sm"
              onClick={() => onSelectResponseTemplate(template.template)}
            >
              {template.label}
            </Button>
          ))}
        </div>
        
        <h3 className="font-medium text-sm mb-2">Add Comment</h3>
        <Textarea 
          value={discussionMessage}
          onChange={(e) => setDiscussionMessage(e.target.value)}
          placeholder="Add a discussion comment..."
          className="min-h-[80px] mb-3"
        />
        <div className="flex justify-end">
          <Button 
            onClick={onAddDiscussionMessage}
            disabled={!discussionMessage.trim()}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Add Comment
          </Button>
        </div>
      </div>
    </div>
  );
};
