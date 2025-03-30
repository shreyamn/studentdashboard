
import React from "react";
import { CheckCheck, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useAttendance } from "@/context/AttendanceContext";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AttendanceWidget() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getUserAttendanceStats } = useAttendance();
  
  if (!user) return null;
  
  const stats = getUserAttendanceStats(user.id);
  
  // For the progress bar
  const progressPercentage = stats.presentPercentage;
  
  // Status badge color and text
  const getStatusColor = () => {
    if (progressPercentage >= 90) return "bg-green-100 text-green-800";
    if (progressPercentage >= 75) return "bg-blue-100 text-blue-800";
    if (progressPercentage >= 60) return "bg-amber-100 text-amber-800";
    return "bg-red-100 text-red-800";
  };
  
  const getStatusText = () => {
    if (progressPercentage >= 90) return "Excellent";
    if (progressPercentage >= 75) return "Good";
    if (progressPercentage >= 60) return "Fair";
    return "Needs Improvement";
  };
  
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
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-muted-foreground">Attendance rate</span>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={getStatusColor()}>
                {getStatusText()}
              </Badge>
              <span className="font-bold">{progressPercentage}%</span>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-green-600 h-2.5 rounded-full transition-all duration-500" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Present</span>
              <div className="flex items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <p className="font-medium">{stats.present} classes</p>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-muted-foreground text-xs">Absent</span>
              <div className="flex items-center mt-1">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <p className="font-medium">{stats.absent} classes</p>
              </div>
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
