import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import getFeedbacks from '@/actions/get-feedbacks';

import { PrioritizedTask } from '@/actions/prioritize/get-prioritized-tasks-for-product-from-firestore';

type PrioritizeFeedbackResponse = {
  topTasks: PrioritizedTask[];
};

const getPriorityColor = (priority: number): string => {
  if (priority <= 3) return 'bg-red-500';
  if (priority <= 6) return 'bg-yellow-500';
  return 'bg-green-500';
};

export default async function PrioritizedFeedback({
  productId,
}: {
  productId: string;
}) {
  if (!productId) {
    throw new Error('Product ID is required');
  }

  // Temporary function to test VERCEL CRONS
//   fetch('http://localhost:3000/api/ml/cron/prioritize')
//   .then(response => response.json())
//   .then(data => console.log(`CRONS DATA:`, data));
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_LINK}/api/ml/prioritize`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ productId }),
  });

  if (!response.ok) {
    return (
      <Card className="p-4 text-red-500">
        Error loading prioritized tasks: {response.statusText}
      </Card>
    );
  }

  const data: PrioritizeFeedbackResponse = await response.json();

  if (!data?.topTasks?.length) {
    return (
      <Card className="p-4 text-gray-500">
        No prioritized tasks available
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {data.topTasks.map((feedback) => (
        <Card key={feedback.id} className="p-4 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">{feedback.task}</h3>
            <Badge
              className={`${getPriorityColor(feedback.priority)} text-white`}
            >
              Priority {feedback.priority}
            </Badge>
          </div>
          <p className="text-gray-600">{feedback.description}</p>
        </Card>
      ))}
    </div>
  );
}