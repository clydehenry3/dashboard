import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { MoreHorizontal, Search, Filter, ArrowUpDown } from "lucide-react";

interface Entry {
  id: string;
  name: string;
  status: "Active" | "Completed" | "Pending" | "On Hold";
  priority: "Low" | "Medium" | "High" | "Critical";
  assignee: string;
  dueDate: string;
  progress: number;
}

const mockEntries: Entry[] = [
  {
    id: "PRJ-001",
    name: "Website Redesign",
    status: "Active",
    priority: "High",
    assignee: "Sarah Johnson",
    dueDate: "2024-02-15",
    progress: 85
  },
  {
    id: "PRJ-002",
    name: "Mobile App Development",
    status: "Active",
    priority: "Critical",
    assignee: "Mike Chen",
    dueDate: "2024-02-20",
    progress: 60
  },
  {
    id: "PRJ-003",
    name: "Database Migration",
    status: "Completed",
    priority: "Medium",
    assignee: "Alex Rodriguez",
    dueDate: "2024-01-30",
    progress: 100
  },
  {
    id: "PRJ-004",
    name: "API Integration",
    status: "Pending",
    priority: "High",
    assignee: "Emily Davis",
    dueDate: "2024-02-25",
    progress: 25
  },
  {
    id: "PRJ-005",
    name: "Security Audit",
    status: "On Hold",
    priority: "Medium",
    assignee: "David Wilson",
    dueDate: "2024-03-01",
    progress: 40
  },
  {
    id: "PRJ-006",
    name: "Performance Optimization",
    status: "Active",
    priority: "Low",
    assignee: "Lisa Zhang",
    dueDate: "2024-02-28",
    progress: 70
  }
];

export function EntriesTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof Entry>("dueDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "default";
      case "Completed":
        return "secondary";
      case "Pending":
        return "outline";
      case "On Hold":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "destructive";
      case "High":
        return "destructive";
      case "Medium":
        return "secondary";
      case "Low":
        return "outline";
      default:
        return "outline";
    }
  };

  const filteredAndSortedEntries = mockEntries
    .filter(entry =>
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.assignee.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.id.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (typeof aVal === "string") {
        aVal = aVal.toLowerCase();
        bVal = (bVal as string).toLowerCase();
      }
      
      if (sortDirection === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      } else {
        return aVal > bVal ? -1 : aVal < bVal ? 1 : 0;
      }
    });

  const handleSort = (field: keyof Entry) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Project Entries</CardTitle>
            <CardDescription>
              Manage and track all your project entries
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 pl-10"
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">
                <Button
                  variant="ghost"
                  onClick={() => handleSort("id")}
                  className="h-auto p-0 font-medium"
                >
                  ID
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("name")}
                  className="h-auto p-0 font-medium"
                >
                  Project Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("assignee")}
                  className="h-auto p-0 font-medium"
                >
                  Assignee
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => handleSort("dueDate")}
                  className="h-auto p-0 font-medium"
                >
                  Due Date
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="font-medium">{entry.id}</TableCell>
                <TableCell>{entry.name}</TableCell>
                <TableCell>
                  <Badge variant={getStatusColor(entry.status) as any}>
                    {entry.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={getPriorityColor(entry.priority) as any}>
                    {entry.priority}
                  </Badge>
                </TableCell>
                <TableCell>{entry.assignee}</TableCell>
                <TableCell>{entry.dueDate}</TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${entry.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground w-8">
                      {entry.progress}%
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Assign</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}