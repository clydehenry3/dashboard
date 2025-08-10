import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Badge } from "./ui/badge";
import { Clock, Target, Zap, CheckCircle2 } from "lucide-react";

export function SummaryCards() {
  const summaryData = [
    {
      title: "Project Completion",
      description: "Overall progress this quarter",
      value: "73%",
      progress: 73,
      icon: <Target className="h-4 w-4" />,
      trend: "+5.2% from last quarter"
    },
    {
      title: "Active Tasks",
      description: "Tasks currently in progress",
      value: "24",
      icon: <Clock className="h-4 w-4" />,
      badge: { text: "In Progress", variant: "secondary" as const }
    },
    {
      title: "Performance Score",
      description: "Overall team performance",
      value: "94%",
      progress: 94,
      icon: <Zap className="h-4 w-4" />,
      trend: "+12% improvement"
    },
    {
      title: "Completed This Week",
      description: "Successfully finished tasks",
      value: "18",
      icon: <CheckCircle2 className="h-4 w-4" />,
      badge: { text: "Completed", variant: "default" as const }
    }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2>Performance Summary</h2>
        <Badge variant="outline">This Week</Badge>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {summaryData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm">{item.title}</CardTitle>
              {item.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <p className="text-xs text-muted-foreground mb-3">
                {item.description}
              </p>
              
              {item.progress && (
                <div className="space-y-2">
                  <Progress value={item.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">{item.trend}</p>
                </div>
              )}
              
              {item.badge && (
                <Badge variant={item.badge.variant} className="text-xs">
                  {item.badge.text}
                </Badge>
              )}
              
              {!item.progress && !item.badge && item.trend && (
                <p className="text-xs text-muted-foreground">{item.trend}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}