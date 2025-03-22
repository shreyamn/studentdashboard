
import React from "react";
import { CheckCheck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAttendance } from "@/context/AttendanceContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AttendanceWidget() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserAttendanceStats } = useAttendance();
  
  if (!user) return null;
  
  const stats = getUserAttendanceStats(user.id);
  
  // For the progress bar
  const progressPercentage = stats.presentPercentage;
  
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium flex items-center">
          <CheckCheck className="mr-2 h-4 w-4" />
          Attendance Overview
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Attendance rate</span>
            <span className="font-bold">{progressPercentage}%</span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-muted-foreground">Present</span>
              <p className="font-medium">{stats.present} classes</p>
            </div>
            <div>
              <span className="text-muted-foreground">Absent</span>
              <p className="font-medium">{stats.absent} classes</p>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          variant="ghost" 
          className="w-full justify-between"
          onClick={() => navigate('/attendance')}
        >
          View details
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
