import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { AppSidebar } from '@/components/layout/Sidebar';
import PageTransition from '@/components/ui/PageTransition';
import { SidebarProvider } from '@/components/ui/sidebar';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import {
  SearchIcon,
  Calendar,
  User,
  BookOpen,
  Clock,
  FileText,
  MoreHorizontal,
  BookMarked,
  Star,
  Filter,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const allCoursesData = [
  {
    id: 1,
    code: 'CS101',
    name: 'Introduction to Computer Science',
    instructor: {
      name: 'Dr. Alan Turing',
      image: 'https://i.pravatar.cc/150?img=68',
    },
    schedule: 'Mon, Wed, Fri • 10:00 AM - 11:30 AM',
    location: 'Computer Science Building, Room 305',
    progress: 90,
    credits: 4,
    status: 'In Progress',
    department: 'Computer Science',
    assignments: [
      { title: 'Problem Set 1', due: '2023-11-10', status: 'Completed' },
      { title: 'Midterm Exam', due: '2023-11-15', status: 'Upcoming' },
      { title: 'Final Project', due: '2023-12-05', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Monday',
      date: 'November 7',
      time: '10:00 AM - 11:30 AM',
      topic: 'Algorithms and Data Structures',
      materials: ['Textbook Ch. 5', 'Lecture Slides'],
    },
  },
  {
    id: 2,
    code: 'MATH202',
    name: 'Calculus II',
    instructor: {
      name: 'Prof. Robert Miller',
      image: 'https://i.pravatar.cc/150?img=69',
    },
    schedule: 'Tue, Thu • 1:00 PM - 2:30 PM',
    location: 'Math Building, Room 105',
    progress: 78,
    credits: 3,
    status: 'In Progress',
    department: 'Mathematics',
    assignments: [
      { title: 'Problem Set 3', due: '2023-11-09', status: 'In Progress' },
      { title: 'Quiz 2', due: '2023-11-16', status: 'Upcoming' },
      { title: 'Final Exam', due: '2023-12-10', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Tuesday',
      date: 'November 8',
      time: '1:00 PM - 2:30 PM',
      topic: 'Techniques of Integration',
      materials: ['Textbook Ch. 7', 'Practice Problems'],
    },
  },
  {
    id: 3,
    code: 'BIO301',
    name: 'Advanced Biology',
    instructor: {
      name: 'Dr. Emily Chen',
      image: 'https://i.pravatar.cc/150?img=5',
    },
    schedule: 'Mon, Wed • 2:00 PM - 3:30 PM',
    location: 'Science Building, Room 301',
    progress: 65,
    credits: 4,
    status: 'In Progress',
    department: 'Biology',
    assignments: [
      { title: 'Lab Report', due: '2023-11-08', status: 'In Progress' },
      { title: 'Research Paper', due: '2023-11-20', status: 'Not Started' },
      { title: 'Final Presentation', due: '2023-12-08', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Wednesday',
      date: 'November 9',
      time: '2:00 PM - 3:30 PM',
      topic: 'Cellular Respiration',
      materials: ['Lab Manual', 'Research Articles'],
    },
  },
  {
    id: 4,
    code: 'BUS240',
    name: 'Business Ethics',
    instructor: {
      name: 'Dr. Sarah Johnson',
      image: 'https://i.pravatar.cc/150?img=4',
    },
    schedule: 'Tue, Thu • 11:00 AM - 12:30 PM',
    location: 'Business Building, Room 205',
    progress: 42,
    credits: 3,
    status: 'In Progress',
    department: 'Business',
    assignments: [
      { title: 'Case Study Analysis', due: '2023-11-14', status: 'Not Started' },
      { title: 'Group Project', due: '2023-11-28', status: 'In Progress' },
      { title: 'Final Paper', due: '2023-12-12', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Thursday',
      date: 'November 10',
      time: '11:00 AM - 12:30 PM',
      topic: 'Corporate Social Responsibility',
      materials: ['Case Studies', 'Discussion Questions'],
    },
  },
  {
    id: 5,
    code: 'NURS101',
    name: 'Nursing Fundamentals',
    instructor: {
      name: 'Dr. Florence Nightingale',
      image: 'https://i.pravatar.cc/150?img=12',
    },
    schedule: 'Mon, Wed, Fri • 9:00 AM - 10:30 AM',
    location: 'Nursing Building, Room 201',
    progress: 80,
    credits: 4,
    status: 'In Progress',
    department: 'Nursing',
    assignments: [
      { title: 'Patient Care Plan', due: '2023-11-12', status: 'In Progress' },
      { title: 'Clinical Skills Assessment', due: '2023-11-18', status: 'Upcoming' },
      { title: 'Medical Ethics Essay', due: '2023-12-01', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Monday',
      date: 'November 7',
      time: '9:00 AM - 10:30 AM',
      topic: 'Patient Assessment Techniques',
      materials: ['Nursing Manual', 'Clinical Guidelines'],
    },
  },
  {
    id: 6,
    code: 'CS202',
    name: 'Data Structures and Algorithms',
    instructor: {
      name: 'Prof. Ada Lovelace',
      image: 'https://i.pravatar.cc/150?img=32',
    },
    schedule: 'Tue, Thu • 3:00 PM - 4:30 PM',
    location: 'Computer Science Building, Room 405',
    progress: 65,
    credits: 4,
    status: 'In Progress',
    department: 'Computer Science',
    assignments: [
      { title: 'Algorithm Analysis', due: '2023-11-11', status: 'In Progress' },
      { title: 'Programming Assignment', due: '2023-11-22', status: 'Not Started' },
      { title: 'Final Project', due: '2023-12-07', status: 'Not Started' },
    ],
    nextClass: {
      day: 'Tuesday',
      date: 'November 8',
      time: '3:00 PM - 4:30 PM',
      topic: 'Binary Search Trees',
      materials: ['Algorithm Handbook', 'Code Samples'],
    },
  },
];

export default function Courses() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [coursesData, setCoursesData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    if (user?.department) {
      const filteredCourses = allCoursesData.filter(
        course => course.department === user.department
      );
      
      setCoursesData(filteredCourses);
      
      if (filteredCourses.length > 0) {
        setSelectedCourse(filteredCourses[0]);
      } else {
        setSelectedCourse(null);
        toast({
          title: "No courses available",
          description: `No courses found for ${user.department} department.`,
          variant: "destructive",
        });
      }
    }
  }, [user, toast]);

  const filteredCourses = coursesData.filter(
    (course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto">
              <header className="mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                  <div>
                    <h1 className="text-3xl font-display font-bold tracking-tight mb-2">
                      Your {user?.department} Courses
                    </h1>
                    <p className="text-muted-foreground">
                      Manage your enrolled courses and track your academic progress
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                      <Input
                        placeholder="Search courses..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 w-full md:w-[280px]"
                      />
                    </div>
                    <Button variant="outline" size="icon">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </header>

              {coursesData.length === 0 ? (
                <div className="glass-card subtle-shadow rounded-xl p-12 text-center">
                  <BookOpen className="h-16 w-16 mx-auto mb-4 text-primary/50" />
                  <h2 className="text-2xl font-display font-medium mb-3">No Courses Available</h2>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    There are currently no courses available for the {user?.department} department.
                    Please check back later or contact your academic advisor.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-1 space-y-5">
                    <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
                      <div className="flex items-center justify-between p-4 border-b border-border">
                        <h2 className="font-display font-medium">Enrolled Courses</h2>
                        <Badge className="ml-2">{filteredCourses.length}</Badge>
                      </div>
                      <div className="p-2 max-h-[600px] overflow-y-auto">
                        {filteredCourses.length > 0 ? (
                          filteredCourses.map((course) => (
                            <motion.div
                              key={course.id}
                              whileHover={{ x: 4 }}
                              transition={{ duration: 0.2 }}
                              onClick={() => setSelectedCourse(course)}
                              className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                                selectedCourse?.id === course.id
                                  ? 'bg-primary/10 border border-primary/20'
                                  : 'hover:bg-secondary'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <Badge variant="outline">{course.code}</Badge>
                                <Badge
                                  variant={course.status === 'Completed' ? 'secondary' : 'outline'}
                                  className="text-xs"
                                >
                                  {course.status}
                                </Badge>
                              </div>
                              <h3 className="font-medium mt-2 mb-1">{course.name}</h3>
                              <div className="flex items-center text-sm text-muted-foreground">
                                <User className="h-3.5 w-3.5 mr-1" />
                                {course.instructor.name}
                              </div>
                              <div className="mt-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-muted-foreground">Progress</span>
                                  <span className="text-xs font-medium">{course.progress}%</span>
                                </div>
                                <Progress value={course.progress} className="h-1.5" />
                              </div>
                            </motion.div>
                          ))
                        ) : (
                          <div className="text-center p-4 text-muted-foreground">
                            No courses found
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-2">
                    {selectedCourse && (
                      <>
                        <div className="glass-card subtle-shadow rounded-xl p-6 mb-6">
                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <Badge variant="outline">{selectedCourse.code}</Badge>
                                <Badge variant="secondary">{selectedCourse.credits} Credits</Badge>
                                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                                  {selectedCourse.department}
                                </Badge>
                              </div>
                              <h2 className="text-2xl font-display font-bold mb-3">
                                {selectedCourse.name}
                              </h2>
                              <div className="flex items-center gap-3 mb-4">
                                <Avatar className="h-10 w-10 border-2 border-background">
                                  <AvatarImage
                                    src={selectedCourse.instructor.image}
                                    alt={selectedCourse.instructor.name}
                                  />
                                  <AvatarFallback>
                                    {selectedCourse.instructor.name.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="text-sm font-medium">{selectedCourse.instructor.name}</div>
                                  <div className="text-xs text-muted-foreground">Course Instructor</div>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-4 w-4 text-muted-foreground" />
                                  <span>{selectedCourse.schedule}</span>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                                  <span>{selectedCourse.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center">
                              <div className="rounded-full bg-secondary p-2 flex flex-col items-center justify-center h-24 w-24">
                                <div className="text-3xl font-bold text-primary">{selectedCourse.progress}%</div>
                                <div className="text-xs text-muted-foreground">Complete</div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="icon" className="ml-2">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Course Materials</DropdownMenuItem>
                                  <DropdownMenuItem>Contact Instructor</DropdownMenuItem>
                                  <DropdownMenuItem>Course Settings</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </div>

                        <Tabs defaultValue="assignments" className="mb-6">
                          <TabsList className="mb-4">
                            <TabsTrigger value="assignments">
                              <FileText className="h-4 w-4 mr-2" />
                              Assignments
                            </TabsTrigger>
                            <TabsTrigger value="schedule">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule
                            </TabsTrigger>
                            <TabsTrigger value="materials">
                              <BookMarked className="h-4 w-4 mr-2" />
                              Materials
                            </TabsTrigger>
                            <TabsTrigger value="grades">
                              <Star className="h-4 w-4 mr-2" />
                              Grades
                            </TabsTrigger>
                          </TabsList>

                          <TabsContent value="assignments" className="space-y-4">
                            <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
                              <div className="flex items-center justify-between p-4 border-b border-border">
                                <h3 className="font-display font-medium">Assignments & Exams</h3>
                                <Button variant="link" className="text-primary text-sm p-0 h-auto">
                                  View All
                                </Button>
                              </div>
                              <div className="p-4">
                                <div className="space-y-3">
                                  {selectedCourse.assignments.map((assignment, index) => (
                                    <div
                                      key={index}
                                      className="flex items-center justify-between bg-background rounded-lg p-3 border border-border"
                                    >
                                      <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${
                                          assignment.status === 'Completed' ? 'bg-green-100 text-green-500' :
                                          assignment.status === 'In Progress' ? 'bg-amber-100 text-amber-500' :
                                          'bg-blue-100 text-blue-500'
                                        }`}>
                                          <FileText className="h-4 w-4" />
                                        </div>
                                        <div>
                                          <h4 className="font-medium">{assignment.title}</h4>
                                          <p className="text-xs text-muted-foreground">
                                            Due {new Date(assignment.due).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                          </p>
                                        </div>
                                      </div>
                                      <Badge
                                        variant={
                                          assignment.status === 'Completed' ? 'default' :
                                          assignment.status === 'In Progress' ? 'secondary' :
                                          'outline'
                                        }
                                      >
                                        {assignment.status}
                                      </Badge>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="schedule">
                            <div className="glass-card subtle-shadow rounded-xl overflow-hidden">
                              <div className="flex items-center justify-between p-4 border-b border-border">
                                <h3 className="font-display font-medium">Next Class</h3>
                                <Badge variant="outline" className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  <span>Upcoming</span>
                                </Badge>
                              </div>
                              <div className="p-4">
                                <div className="bg-background rounded-lg p-4 border border-border">
                                  <div className="flex items-center justify-between mb-3">
                                    <div>
                                      <h4 className="font-medium">{selectedCourse.nextClass.day}, {selectedCourse.nextClass.date}</h4>
                                      <p className="text-sm text-muted-foreground">{selectedCourse.nextClass.time}</p>
                                    </div>
                                    <Button variant="outline" size="sm">Add to Calendar</Button>
                                  </div>
                                  <div className="bg-secondary/50 rounded-lg p-3 mb-3">
                                    <h5 className="font-medium text-sm mb-1">Topic</h5>
                                    <p>{selectedCourse.nextClass.topic}</p>
                                  </div>
                                  <div>
                                    <h5 className="font-medium text-sm mb-2">Required Materials</h5>
                                    <ul className="space-y-1">
                                      {selectedCourse.nextClass.materials.map((material, index) => (
                                        <li key={index} className="flex items-center gap-2 text-sm">
                                          <div className="h-1.5 w-1.5 rounded-full bg-primary/70"></div>
                                          <span>{material}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="materials">
                            <div className="glass-card subtle-shadow rounded-xl p-6 flex items-center justify-center text-muted-foreground h-60">
                              <div className="text-center">
                                <BookMarked className="h-12 w-12 mx-auto mb-3 text-primary/70" />
                                <h3 className="font-medium text-lg mb-2">Course Materials</h3>
                                <p className="max-w-md mx-auto mb-4">
                                  Access lecture notes, readings, and learning resources
                                </p>
                                <Button>Browse Materials</Button>
                              </div>
                            </div>
                          </TabsContent>

                          <TabsContent value="grades">
                            <div className="glass-card subtle-shadow rounded-xl p-6 flex items-center justify-center text-muted-foreground h-60">
                              <div className="text-center">
                                <Star className="h-12 w-12 mx-auto mb-3 text-primary/70" />
                                <h3 className="font-medium text-lg mb-2">Grades & Feedback</h3>
                                <p className="max-w-md mx-auto mb-4">
                                  View your grades and instructor feedback
                                </p>
                                <Button>View Grades</Button>
                              </div>
                            </div>
                          </TabsContent>
                        </Tabs>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
