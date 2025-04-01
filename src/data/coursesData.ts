
// Sample courses data for different departments
export const coursesData = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    code: "CS 101",
    credits: 3,
    department: "Computer Science",
    instructor: {
      name: "Dr. Alan Turing",
      image: "https://picsum.photos/id/1005/200"
    },
    schedule: "Mon, Wed, Fri 10:00 AM - 11:30 AM",
    location: "Computer Science Building, Room 305",
    progress: 75,
    status: "In Progress",
    attendanceRate: 85,
    assignments: [
      {
        title: "Programming Assignment 1",
        due: "2023-11-20",
        status: "Completed"
      },
      {
        title: "Algorithm Analysis",
        due: "2023-11-28",
        status: "In Progress"
      },
      {
        title: "Final Project",
        due: "2023-12-15",
        status: "Not Started"
      }
    ],
    nextClass: {
      day: "Monday",
      date: "November 20, 2023",
      time: "10:00 AM - 11:30 AM",
      topic: "Binary Search Trees",
      materials: ["Textbook Ch.8", "Laptop", "Completed Homework"]
    }
  },
  {
    id: 2,
    name: "Calculus I",
    code: "MATH 101",
    credits: 4,
    department: "Mathematics",
    instructor: {
      name: "Dr. Ada Lovelace",
      image: "https://picsum.photos/id/1011/200"
    },
    schedule: "Tue, Thu 9:00 AM - 10:30 AM",
    location: "Math Building, Room 212",
    progress: 60,
    status: "In Progress",
    attendanceRate: 75,
    assignments: [
      {
        title: "Problem Set 3",
        due: "2023-11-22",
        status: "Completed"
      },
      {
        title: "Integration Techniques Quiz",
        due: "2023-11-25",
        status: "In Progress"
      },
      {
        title: "Midterm Exam",
        due: "2023-12-05",
        status: "Not Started"
      }
    ],
    nextClass: {
      day: "Tuesday",
      date: "November 21, 2023",
      time: "9:00 AM - 10:30 AM",
      topic: "Implicit Differentiation",
      materials: ["Textbook Ch.4", "Calculator", "Graph Paper"]
    }
  },
  {
    id: 3,
    name: "Human Anatomy",
    code: "BIO 201",
    credits: 4,
    department: "Biology",
    instructor: {
      name: "Dr. Jane Goodall",
      image: "https://picsum.photos/id/1027/200"
    },
    schedule: "Mon, Wed 1:00 PM - 3:00 PM",
    location: "Science Center, Room 115",
    progress: 80,
    status: "In Progress",
    attendanceRate: 90,
    assignments: [
      {
        title: "Lab Report: Skeletal System",
        due: "2023-11-19",
        status: "Completed"
      },
      {
        title: "Organ Systems Quiz",
        due: "2023-11-24",
        status: "In Progress"
      },
      {
        title: "Final Exam",
        due: "2023-12-10",
        status: "Not Started"
      }
    ],
    nextClass: {
      day: "Wednesday",
      date: "November 22, 2023",
      time: "1:00 PM - 3:00 PM",
      topic: "Cardiovascular System",
      materials: ["Lab Manual", "Dissection Kit", "Notebook"]
    }
  },
  {
    id: 4,
    name: "Fundamentals of Nursing",
    code: "NURS 101",
    credits: 5,
    department: "Nursing",
    instructor: {
      name: "Dr. Florence Nightingale",
      image: "https://picsum.photos/id/1000/200"
    },
    schedule: "Tue, Thu 8:00 AM - 11:00 AM",
    location: "Health Sciences Building, Room 401",
    progress: 70,
    status: "In Progress",
    attendanceRate: 95,
    assignments: [
      {
        title: "Patient Care Plan",
        due: "2023-11-21",
        status: "Completed"
      },
      {
        title: "Medication Administration Exam",
        due: "2023-11-30",
        status: "Not Started"
      },
      {
        title: "Clinical Rotation Report",
        due: "2023-12-08",
        status: "Not Started"
      }
    ],
    nextClass: {
      day: "Thursday",
      date: "November 23, 2023",
      time: "8:00 AM - 11:00 AM",
      topic: "Vital Signs Assessment",
      materials: ["Nursing Manual", "Stethoscope", "Blood Pressure Cuff"]
    }
  }
];
