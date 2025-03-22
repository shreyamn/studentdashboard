
import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, CheckCheck, Clock, UserX } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useAttendance } from "@/context/AttendanceContext";
import PageTransition from "@/components/ui/PageTransition";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Attendance() {
  const { user } = useAuth();
  const { getUserAttendance, getUserAttendanceStats } = useAttendance();
  const [activeTab, setActiveTab] = useState("overview");

  if (!user) {
    return (
      <PageTransition>
        <div className="flex items-center justify-center h-full">
          <p>Please log in to view your attendance records</p>
        </div>
      </PageTransition>
    );
  }

  const attendanceRecords = getUserAttendance(user.id);
  const stats = getUserAttendanceStats(user.id);

  // Prepare data for pie chart
  const chartData = [
    { name: "Present", value: stats.present, color: "#10b981" },
    { name: "Absent", value: stats.absent, color: "#ef4444" },
    { name: "Late", value: stats.late, color: "#f59e0b" },
    { name: "Excused", value: stats.excused, color: "#6b7280" },
  ];

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "present":
        return "bg-green-100 text-green-800";
      case "absent":
        return "bg-red-100 text-red-800";
      case "late":
        return "bg-amber-100 text-amber-800";
      case "excused":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTransition>
      <div className="container p-4 mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold">Attendance</h1>
          <p className="text-muted-foreground">Track your class attendance</p>
        </header>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="records">All Records</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCheck className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-2xl font-bold">{stats.presentPercentage}%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Overall attendance rate</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Present</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <CheckCheck className="mr-2 h-4 w-4 text-green-500" />
                    <span className="text-2xl font-bold">{stats.present}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Classes attended</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Absent</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <UserX className="mr-2 h-4 w-4 text-red-500" />
                    <span className="text-2xl font-bold">{stats.absent}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Classes missed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Late</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center">
                    <Clock className="mr-2 h-4 w-4 text-amber-500" />
                    <span className="text-2xl font-bold">{stats.late}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Late arrivals</p>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Attendance Breakdown</CardTitle>
                <CardDescription>Visual summary of your attendance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer 
                    className="h-full" 
                    config={{
                      present: { label: "Present", color: "#10b981" },
                      absent: { label: "Absent", color: "#ef4444" },
                      late: { label: "Late", color: "#f59e0b" },
                      excused: { label: "Excused", color: "#6b7280" },
                    }}
                  >
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ChartContainer>
                </div>
                <div className="flex justify-center gap-6 mt-4">
                  {chartData.map((entry) => (
                    <div key={entry.name} className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-2"
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="records">
            <Card>
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>
                  All your class attendance records
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {attendanceRecords.length > 0 ? (
                      attendanceRecords.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center">
                              <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                              {format(new Date(record.date), 'PPP')}
                            </div>
                          </TableCell>
                          <TableCell>{record.courseName}</TableCell>
                          <TableCell>
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                                record.status
                              )}`}
                            >
                              {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
                            </span>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={3} className="text-center py-4">
                          No attendance records found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTransition>
  );
}
