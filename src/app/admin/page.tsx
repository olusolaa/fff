'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { 
  Upload, 
  MessageSquare, 
  BarChart3, 
  Settings,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  Play,
  Pause,
  Calendar,
  User,
  Tag,
  Star,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import MessageUpload from '@/components/admin/MessageUpload';

// Mock data - replace with real API calls
const mockMessages = [
  {
    id: '1',
    title: 'The Power of Grace',
    preacher: 'Dr. Evelyn Reed',
    category: 'Discipleship Class',
    series: 'Foundations of Faith',
    status: 'published',
    featured: true,
    date_preached: '2024-01-15T10:00:00Z',
    view_count: 245,
    audio_duration: 2714,
    created_at: '2024-01-15T08:00:00Z'
  },
  {
    id: '2',
    title: 'Walking in Faith',
    preacher: 'Rev. Michael Chen',
    category: 'Marriage Forum',
    series: 'Strong Foundations',
    status: 'draft',
    featured: false,
    date_preached: '2024-01-22T10:00:00Z',
    view_count: 0,
    audio_duration: 2450,
    created_at: '2024-01-20T14:30:00Z'
  },
  {
    id: '3',
    title: 'Love That Transforms',
    preacher: 'Pastor Sarah Jones',
    category: 'Singles Club',
    series: 'Heart Matters',
    status: 'published',
    featured: false,
    date_preached: '2024-01-08T10:00:00Z',
    view_count: 189,
    audio_duration: 2890,
    created_at: '2024-01-08T09:15:00Z'
  }
];

const mockStats = {
  total_messages: 156,
  published: 142,
  drafts: 12,
  archived: 2,
  featured_count: 8,
  total_views: 15420,
  total_storage_mb: 2340.5,
  recent_uploads_30d: 12
};

export default function AdminDashboard() {
  const router = useRouter();
  const { toast } = useToast();
  const [messages, setMessages] = useState(mockMessages);
  const [stats, setStats] = useState(mockStats);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [showUploadDialog, setShowUploadDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Filter messages based on search and status
  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'outline'> = {
      published: 'default',
      draft: 'secondary',
      archived: 'outline'
    };
    return (
      <Badge variant={variants[status] || 'outline'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const handleStatusChange = async (messageId: string, newStatus: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, status: newStatus } : msg
        )
      );
      toast({
        title: "Status Updated",
        description: `Message status changed to ${newStatus}`,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update message status",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message? This action cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast({
        title: "Message Deleted",
        description: "Message has been permanently deleted",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete message",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute requiredRoles={['admin']}>
      <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Message Archive Admin</h1>
          <p className="text-gray-600">Manage your message archive, upload new content, and track analytics</p>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_messages}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.recent_uploads_30d} uploaded this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Published</CardTitle>
                  <Eye className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.published}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.drafts} drafts pending
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Views</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_views.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    {stats.featured_count} featured messages
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
                  <Upload className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.total_storage_mb.toFixed(1)} MB</div>
                  <p className="text-xs text-muted-foreground">
                    S3 cloud storage
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Messages */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Messages</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {messages.slice(0, 5).map((message) => (
                    <div key={message.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{message.title}</h3>
                        <p className="text-sm text-gray-600">
                          {message.preacher} • {formatDate(message.date_preached)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(message.status)}
                        {message.featured && <Star className="h-4 w-4 text-yellow-500" />}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Messages Tab */}
          <TabsContent value="messages" className="space-y-6">
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search messages..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                className="px-3 py-2 border border-gray-300 rounded-md"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="published">Published</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
              <Button onClick={() => setShowUploadDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Upload Message
              </Button>
            </div>

            {/* Messages Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b">
                      <tr>
                        <th className="text-left p-4">Message</th>
                        <th className="text-left p-4">Preacher</th>
                        <th className="text-left p-4">Category</th>
                        <th className="text-left p-4">Status</th>
                        <th className="text-left p-4">Views</th>
                        <th className="text-left p-4">Duration</th>
                        <th className="text-left p-4">Date</th>
                        <th className="text-left p-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMessages.map((message) => (
                        <tr key={message.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <div>
                                <p className="font-medium">{message.title}</p>
                                {message.series && (
                                  <p className="text-sm text-gray-600">{message.series}</p>
                                )}
                              </div>
                              {message.featured && <Star className="h-4 w-4 text-yellow-500" />}
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <User className="h-4 w-4 text-gray-400" />
                              <span>{message.preacher}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">{message.category}</Badge>
                          </td>
                          <td className="p-4">{getStatusBadge(message.status)}</td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Eye className="h-4 w-4 text-gray-400" />
                              <span>{message.view_count}</span>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <Clock className="h-4 w-4 text-gray-400" />
                              <span>{formatDuration(message.audio_duration)}</span>
                            </div>
                          </td>
                          <td className="p-4">{formatDate(message.date_preached)}</td>
                          <td className="p-4">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => router.push(`/messages/${message.id}`)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setSelectedMessage(message)}>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                {message.status === 'draft' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(message.id, 'published')}>
                                    <Play className="h-4 w-4 mr-2" />
                                    Publish
                                  </DropdownMenuItem>
                                )}
                                {message.status === 'published' && (
                                  <DropdownMenuItem onClick={() => handleStatusChange(message.id, 'archived')}>
                                    <Pause className="h-4 w-4 mr-2" />
                                    Archive
                                  </DropdownMenuItem>
                                )}
                                <DropdownMenuItem 
                                  onClick={() => handleDelete(message.id)}
                                  className="text-red-600"
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload">
            <MessageUpload 
              onSuccess={(message) => {
                // Add new message to the list
                setMessages(prev => [message, ...prev]);
                // Update stats
                setStats(prev => ({
                  ...prev,
                  total_messages: prev.total_messages + 1,
                  drafts: message.status === 'draft' ? prev.drafts + 1 : prev.drafts,
                  published: message.status === 'published' ? prev.published + 1 : prev.published
                }));
                toast({
                  title: "Success",
                  description: `Message "${message.title}" uploaded successfully!`,
                });
              }}
            />
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <Card>
              <CardHeader>
                <CardTitle>Analytics Dashboard</CardTitle>
                <CardDescription>
                  Detailed analytics and insights about your message archive performance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-lg font-medium mb-2">Advanced Analytics Coming Soon</p>
                  <p className="text-gray-600">
                    View detailed statistics, trending content, and audience insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
    </ProtectedRoute>
  );
}
