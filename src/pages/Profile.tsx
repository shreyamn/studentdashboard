import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import { AppSidebar } from '@/components/layout/Sidebar';
import PageTransition from '@/components/ui/PageTransition';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/context/AuthContext';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

export default function Profile() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState<string | undefined>(user?.image);

  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    department: user?.department || '',
    year: user?.year || 1,
    bio: 'Computer Science student with interests in artificial intelligence and data science.',
    phone: '+1 (555) 123-4567',
  });

  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: true,
    calendarSync: true,
    darkMode: false,
    twoFactorAuth: false,
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  const handlePreferenceChange = (setting: string, value: boolean) => {
    setPreferences({
      ...preferences,
      [setting]: value,
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
      
      toast({
        title: "Photo selected",
        description: "Your new profile photo has been selected. Save to apply changes."
      });
    }
  };

  const updateProfileImage = (imageUrl: string) => {
    console.log("Updating profile image:", imageUrl);
  };

  const handleSaveProfile = () => {
    setSaving(true);
    
    if (profileImage !== user?.image) {
      updateProfileImage(profileImage || '');
    }
    
    setTimeout(() => {
      setSaving(false);
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been saved successfully.',
      });
    }, 1000);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <PageTransition className="flex-1 pt-24 px-4 pb-8">
            <div className="container mx-auto max-w-5xl">
              <header className="mb-8">
                <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar animated className="h-16 w-16 rounded-xl">
                      <AvatarImage src={profileImage} alt={user?.name} />
                      <AvatarFallback className="text-lg">
                        {user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-3xl font-display font-bold tracking-tight mb-1">
                        Profile Settings
                      </h1>
                      <p className="text-muted-foreground">
                        Manage your account information and preferences
                      </p>
                    </div>
                  </div>
                  <Button onClick={handleSaveProfile} disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </header>

              <Tabs defaultValue="profile" className="mb-6">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Profile Information</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Basic Information</CardTitle>
                        <CardDescription>
                          Update your personal details and public profile
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                          <Avatar animated className="h-24 w-24 rounded-lg">
                            <AvatarImage src={profileImage} alt={user?.name} />
                            <AvatarFallback className="text-2xl">
                              {user?.name?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <input
                              type="file"
                              id="photo-upload"
                              accept="image/*"
                              className="hidden"
                              onChange={handlePhotoChange}
                            />
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="mb-2"
                              onClick={() => document.getElementById('photo-upload')?.click()}
                            >
                              Change Photo
                            </Button>
                            <p className="text-xs text-muted-foreground">
                              JPG, GIF or PNG. Max size of 2MB.
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                              id="name"
                              name="name"
                              value={profileData.name}
                              onChange={handleProfileChange}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input
                              id="email"
                              name="email"
                              value={profileData.email}
                              onChange={handleProfileChange}
                              disabled
                            />
                            <p className="text-xs text-muted-foreground">
                              Your university email cannot be changed
                            </p>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select defaultValue={profileData.department || undefined}>
                              <SelectTrigger>
                                <SelectValue placeholder="Select department" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Computer Science">Computer Science</SelectItem>
                                <SelectItem value="Mathematics">Mathematics</SelectItem>
                                <SelectItem value="Biology">Biology</SelectItem>
                                <SelectItem value="Business">Business</SelectItem>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          {user?.role === 'student' && (
                            <div className="space-y-2">
                              <Label htmlFor="year">Year of Study</Label>
                              <Select defaultValue={profileData.year?.toString()}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select year" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="1">First Year</SelectItem>
                                  <SelectItem value="2">Second Year</SelectItem>
                                  <SelectItem value="3">Third Year</SelectItem>
                                  <SelectItem value="4">Fourth Year</SelectItem>
                                  <SelectItem value="5">Graduate</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          )}
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="bio">Bio</Label>
                            <textarea
                              id="bio"
                              name="bio"
                              value={profileData.bio}
                              onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                              rows={4}
                              className="min-h-[100px] w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm"
                            ></textarea>
                            <p className="text-xs text-muted-foreground">
                              Write a short introduction about yourself
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Contact Information</CardTitle>
                        <CardDescription>
                          How others can reach you on campus
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                              id="phone"
                              name="phone"
                              value={profileData.phone}
                              onChange={handleProfileChange}
                            />
                          </div>
                          {user?.role === 'faculty' && (
                            <div className="space-y-2">
                              <Label htmlFor="officeHours">Office Hours</Label>
                              <Input
                                id="officeHours"
                                name="officeHours"
                                placeholder="e.g., Mon, Wed 2-4 PM"
                              />
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-end">
                        <Button onClick={handleSaveProfile} disabled={saving}>
                          {saving ? 'Saving...' : 'Save Changes'}
                        </Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="preferences">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Notification Settings</CardTitle>
                        <CardDescription>
                          Control how you receive notifications and alerts
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Email Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive email alerts for announcements and deadlines
                            </p>
                          </div>
                          <Switch
                            checked={preferences.emailNotifications}
                            onCheckedChange={(checked) => handlePreferenceChange('emailNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Push Notifications</h4>
                            <p className="text-sm text-muted-foreground">
                              Receive push notifications in the app and browser
                            </p>
                          </div>
                          <Switch
                            checked={preferences.pushNotifications}
                            onCheckedChange={(checked) => handlePreferenceChange('pushNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between py-2">
                          <div>
                            <h4 className="font-medium">Calendar Sync</h4>
                            <p className="text-sm text-muted-foreground">
                              Sync your course schedule with your calendar app
                            </p>
                          </div>
                          <Switch
                            checked={preferences.calendarSync}
                            onCheckedChange={(checked) => handlePreferenceChange('calendarSync', checked)}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </TabsContent>

                <TabsContent value="security">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle>Security Settings</CardTitle>
                        <CardDescription>
                          Manage your account security and login preferences
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between py-2">
                            <div>
                              <h4 className="font-medium">Two-Factor Authentication</h4>
                              <p className="text-sm text-muted-foreground">
                                Add an extra layer of security to your account
                              </p>
                            </div>
                            <Switch
                              checked={preferences.twoFactorAuth}
                              onCheckedChange={(checked) => handlePreferenceChange('twoFactorAuth', checked)}
                            />
                          </div>
                          
                          <div className="space-y-2 pt-4">
                            <Label htmlFor="currentPassword">Current Password</Label>
                            <Input
                              id="currentPassword"
                              type="password"
                              placeholder="••••••••"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="newPassword">New Password</Label>
                            <Input
                              id="newPassword"
                              type="password"
                              placeholder="••••••••"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New Password</Label>
                            <Input
                              id="confirmPassword"
                              type="password"
                              placeholder="••••••••"
                            />
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button variant="destructive">Log Out of All Devices</Button>
                        <Button>Update Password</Button>
                      </CardFooter>
                    </Card>
                  </motion.div>
                </TabsContent>
              </Tabs>
            </div>
          </PageTransition>
        </div>
      </div>
    </SidebarProvider>
  );
}
