
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, Bell, Mail, Key, AlertTriangle } from 'lucide-react';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

// Password change form schema
const passwordFormSchema = z.object({
  currentPassword: z.string().min(6, 'Password must be at least 6 characters'),
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Password must be at least 6 characters'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

// Email change form schema
const emailFormSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type PasswordFormValues = z.infer<typeof passwordFormSchema>;
type EmailFormValues = z.infer<typeof emailFormSchema>;

const Settings = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState({
    password: false,
    email: false,
    deleteAccount: false,
  });
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    marketUpdates: true,
    newListings: false,
    priceAlerts: true,
  });

  // Initialize password form
  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  // Initialize email form
  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: user?.email || '',
    },
  });

  // Update password handler
  const onPasswordSubmit = async (values: PasswordFormValues) => {
    try {
      setLoading({ ...loading, password: true });
      
      // First verify current password by attempting to sign in
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user?.email || '',
        password: values.currentPassword,
      });

      if (signInError) {
        throw new Error('Current password is incorrect');
      }

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: values.newPassword,
      });

      if (error) {
        throw error;
      }

      // Reset form
      passwordForm.reset({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });

      toast({
        title: 'Password updated',
        description: 'Your password has been updated successfully.',
      });
    } catch (error: any) {
      console.error('Error updating password:', error);
      toast({
        title: 'Error updating password',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading({ ...loading, password: false });
    }
  };

  // Update email handler
  const onEmailSubmit = async (values: EmailFormValues) => {
    if (values.email === user?.email) {
      toast({
        title: 'No change',
        description: 'The email address is the same as your current one.',
      });
      return;
    }

    try {
      setLoading({ ...loading, email: true });
      
      const { error } = await supabase.auth.updateUser({
        email: values.email,
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Verification email sent',
        description: 'Please check your email to confirm the change.',
      });
    } catch (error: any) {
      console.error('Error updating email:', error);
      toast({
        title: 'Error updating email',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading({ ...loading, email: false });
    }
  };

  // Update notification settings
  const handleNotificationChange = (key: keyof typeof notificationSettings) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
    
    toast({
      title: 'Notification settings updated',
      description: `${key.replace(/([A-Z])/g, ' $1').toLowerCase()} has been ${notificationSettings[key] ? 'disabled' : 'enabled'}.`,
    });
  };

  // Delete account handler
  const handleDeleteAccount = async () => {
    try {
      setLoading({ ...loading, deleteAccount: true });
      
      // Delete user (this will trigger cascade deletion of profile due to our DB setup)
      const { error } = await supabase.auth.admin.deleteUser(user?.id || '');

      if (error) {
        throw error;
      }

      // Sign out after account deletion
      await signOut();
      
      toast({
        title: 'Account deleted',
        description: 'Your account has been successfully deleted.',
      });
    } catch (error: any) {
      console.error('Error deleting account:', error);
      toast({
        title: 'Error deleting account',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setLoading({ ...loading, deleteAccount: false });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-8 text-farmer-green">Account Settings</h1>
        
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 mb-8">
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Key className="h-4 w-4" /> Account
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" /> Security
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" /> Notifications
            </TabsTrigger>
          </TabsList>
          
          {/* Account Tab */}
          <TabsContent value="account">
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Email Settings</CardTitle>
                <CardDescription>Update your email address</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...emailForm}>
                  <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                    <FormField
                      control={emailForm.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} />
                          </FormControl>
                          <FormDescription>
                            We'll send a verification email to confirm the change
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={loading.email}>
                      {loading.email ? 'Updating...' : 'Update Email'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
            
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-red-600">Danger Zone</CardTitle>
                <CardDescription>Permanent account actions</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" /> Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeleteAccount}
                        disabled={loading.deleteAccount}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        {loading.deleteAccount ? 'Deleting...' : 'Delete Account'}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Security Tab */}
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your account password</CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-6">
                    <FormField
                      control={passwordForm.control}
                      name="currentPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="newPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormDescription>
                            Password must be at least 6 characters long
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={passwordForm.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm New Password</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" disabled={loading.password}>
                      {loading.password ? 'Updating...' : 'Update Password'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how we contact you</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-farmer-green" />
                      <span className="font-medium">Email Notifications</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationChange('emailNotifications')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-medium">Market Updates</span>
                    <p className="text-sm text-muted-foreground">
                      Receive updates about market trends and prices
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.marketUpdates}
                    onCheckedChange={() => handleNotificationChange('marketUpdates')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-medium">New Listings</span>
                    <p className="text-sm text-muted-foreground">
                      Get notified when new crops are listed on the marketplace
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.newListings}
                    onCheckedChange={() => handleNotificationChange('newListings')}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="font-medium">Price Alerts</span>
                    <p className="text-sm text-muted-foreground">
                      Be alerted when prices change significantly
                    </p>
                  </div>
                  <Switch 
                    checked={notificationSettings.priceAlerts}
                    onCheckedChange={() => handleNotificationChange('priceAlerts')}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default Settings;
