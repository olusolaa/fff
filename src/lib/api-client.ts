// API Client with automatic token handling
class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string = '/api/v1') {
    this.baseUrl = baseUrl;
  }

  private getToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('accessToken');
  }

  private getHeaders(customHeaders: Record<string, string> = {}): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...customHeaders,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
  }

  async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const config: RequestInit = {
      ...options,
      headers: this.getHeaders(options.headers as Record<string, string>),
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401) {
        // Clear invalid token
        localStorage.removeItem('accessToken');
        // Redirect to login or trigger auth state update
        window.location.href = '/login';
        throw new Error('Authentication required');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || `HTTP ${response.status}: ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      }
      
      return response as any;
    } catch (error) {
      console.error(`API Error [${config.method || 'GET'} ${url}]:`, error);
      throw error;
    }
  }

  // Convenience methods
  async get<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' });
  }

  async post<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T = any>(endpoint: string, data?: any, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T = any>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' });
  }

  // Special method for file uploads (multipart/form-data)
  async uploadFile<T = any>(endpoint: string, formData: FormData): Promise<T> {
    const token = this.getToken();
    const headers: Record<string, string> = {};
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    return this.request<T>(endpoint, {
      method: 'POST',
      body: formData,
      headers, // Don't set Content-Type for FormData - browser will set it with boundary
    });
  }
}

// Create singleton instance
export const apiClient = new ApiClient();

// Auth-specific API calls
export const authApi = {
  requestMagicLink: (email: string) =>
    apiClient.post('/auth/request-link', { email }),
  
  verifyMagicLink: (token: string) =>
    apiClient.post('/auth/verify-link', { token }),
  
  getCurrentUser: () =>
    apiClient.get('/users/me'),
};

// Admin API calls
export const adminApi = {
  uploadMessage: (formData: FormData) =>
    apiClient.uploadFile('/admin/messages/upload', formData),
  
  updateContentStatus: (contentType: string, contentId: string, status: string) =>
    apiClient.put(`/admin/content/${contentType}/${contentId}/status`, { status }),
  
  shareContent: (contentType: string, contentId: string, platform: string) =>
    apiClient.post(`/admin/content/${contentType}/${contentId}/share`, { platform }),
};

export default apiClient;
