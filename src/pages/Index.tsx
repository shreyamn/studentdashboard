
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/layout/Navbar';
import { BookOpen, Map, Bell, Users, Calendar, ArrowRight } from 'lucide-react';

export default function Index() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              transition={{ duration: 2 }}
              className="absolute top-0 -left-10 right-0 h-[500px] bg-[linear-gradient(to_right,_var(--tw-gradient-stops))] from-transparent via-primary/10 to-transparent blur-3xl"
            ></motion.div>
          </div>
          
          <div className="container px-4 mx-auto relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mb-6">
                  Your University <br />
                  <span className="text-primary">in Your Pocket</span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 md:mb-12 max-w-2xl mx-auto">
                  Navigate campus life seamlessly with our all-in-one platform for students, faculty, and staff.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button asChild size="lg" className="px-8 py-6 text-base font-medium group">
                    <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                      {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base font-medium">
                    <Link to={isAuthenticated ? "/map" : "/login"}>
                      {isAuthenticated ? "Explore Campus" : "Sign In"}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 md:mt-24 max-w-5xl mx-auto"
            >
              <div className="aspect-[16/9] rounded-xl overflow-hidden glass-card subtle-shadow">
                <div className="w-full h-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                  <img
                    src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                    alt="University campus"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-32 bg-secondary/50">
          <div className="container px-4 mx-auto">
            <div className="max-w-xl mx-auto text-center mb-16 md:mb-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
                  Everything You Need in One Place
                </h2>
                <p className="text-muted-foreground text-lg">
                  Designed to make university life easier, more connected, and more productive.
                </p>
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="glass-card subtle-shadow p-8 rounded-xl hover-lift"
              >
                <BookOpen className="h-10 w-10 text-primary mb-5" />
                <h3 className="text-xl font-display font-semibold mb-2">Academic Management</h3>
                <p className="text-muted-foreground mb-4">
                  Track courses, assignments, and deadlines. Get notifications for important academic events.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-medium group">
                  <Link to={isAuthenticated ? "/courses" : "/register"}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card subtle-shadow p-8 rounded-xl hover-lift"
              >
                <Map className="h-10 w-10 text-primary mb-5" />
                <h3 className="text-xl font-display font-semibold mb-2">Campus Navigation</h3>
                <p className="text-muted-foreground mb-4">
                  Interactive maps to find your way around campus. Book study spaces and facilities.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-medium group">
                  <Link to={isAuthenticated ? "/map" : "/register"}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card subtle-shadow p-8 rounded-xl hover-lift"
              >
                <Bell className="h-10 w-10 text-primary mb-5" />
                <h3 className="text-xl font-display font-semibold mb-2">Notifications & Alerts</h3>
                <p className="text-muted-foreground mb-4">
                  Stay updated with campus news, emergency alerts, and important announcements.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-medium group">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="glass-card subtle-shadow p-8 rounded-xl hover-lift"
              >
                <Users className="h-10 w-10 text-primary mb-5" />
                <h3 className="text-xl font-display font-semibold mb-2">Clubs & Communities</h3>
                <p className="text-muted-foreground mb-4">
                  Discover, join, and manage campus clubs and community groups. Connect with peers.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-medium group">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="glass-card subtle-shadow p-8 rounded-xl hover-lift"
              >
                <Calendar className="h-10 w-10 text-primary mb-5" />
                <h3 className="text-xl font-display font-semibold mb-2">Events & Activities</h3>
                <p className="text-muted-foreground mb-4">
                  Browse and register for campus events, workshops, and activities. Get reminders.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-medium group">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="glass-card subtle-shadow p-8 rounded-xl hover-lift"
              >
                <svg
                  className="h-10 w-10 text-primary mb-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    className="fill-primary"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <h3 className="text-xl font-display font-semibold mb-2">Campus Services</h3>
                <p className="text-muted-foreground mb-4">
                  Access campus services like cafeteria menus, help desk, and technical support.
                </p>
                <Button asChild variant="link" className="p-0 h-auto font-medium group">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    Learn more
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 md:py-32">
          <div className="container px-4 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card subtle-shadow rounded-xl p-8 md:p-16 text-center max-w-4xl mx-auto"
            >
              <h2 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-4">
                Ready to Transform Your Campus Experience?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                Join thousands of students and faculty members who are already using the Campus App.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg" className="px-8 py-6 text-base font-medium">
                  <Link to={isAuthenticated ? "/dashboard" : "/register"}>
                    {isAuthenticated ? "Go to Dashboard" : "Get Started Now"}
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="px-8 py-6 text-base font-medium">
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    Learn More
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-secondary/50 py-12">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2">
                <svg
                  className="w-8 h-8"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2L2 7L12 12L22 7L12 2Z"
                    className="fill-primary"
                  />
                  <path
                    d="M2 17L12 22L22 17"
                    className="stroke-primary"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M2 12L12 17L22 12"
                    className="stroke-primary"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-xl font-display font-semibold">Campus App</span>
              </div>
              
              <nav className="flex flex-wrap justify-center gap-x-8 gap-y-4">
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Features
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms
                </a>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </nav>
              
              <div className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Campus App. All rights reserved.
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
