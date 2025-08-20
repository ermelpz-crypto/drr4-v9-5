import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Database types
export interface Database {
  public: {
    Tables: {
      news: {
        Row: {
          id: string
          title: string
          excerpt: string | null
          content: string | null
          image: string | null
          author: string | null
          status: 'published' | 'draft'
          date: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          excerpt?: string | null
          content?: string | null
          image?: string | null
          author?: string | null
          status?: 'published' | 'draft'
          date?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          excerpt?: string | null
          content?: string | null
          image?: string | null
          author?: string | null
          status?: 'published' | 'draft'
          date?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string | null
          icon: string | null
          tags: string[] | null
          status: 'active' | 'inactive'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          icon?: string | null
          tags?: string[] | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          icon?: string | null
          tags?: string[] | null
          status?: 'active' | 'inactive'
          created_at?: string
          updated_at?: string
        }
      }
      incident_reports: {
        Row: {
          id: string
          reference_number: string
          reporter_name: string
          contact_number: string
          location: string | null
          incident_type: string | null
          description: string | null
          urgency: 'LOW' | 'MEDIUM' | 'HIGH'
          status: 'pending' | 'in-progress' | 'resolved'
          date_reported: string
          image_url: string | null
          updated_at: string
        }
        Insert: {
          id?: string
          reference_number: string
          reporter_name: string
          contact_number: string
          location?: string | null
          incident_type?: string | null
          description?: string | null
          urgency?: 'LOW' | 'MEDIUM' | 'HIGH'
          status?: 'pending' | 'in-progress' | 'resolved'
          date_reported?: string
          image_url?: string | null
          updated_at?: string
        }
        Update: {
          id?: string
          reference_number?: string
          reporter_name?: string
          contact_number?: string
          location?: string | null
          incident_type?: string | null
          description?: string | null
          urgency?: 'LOW' | 'MEDIUM' | 'HIGH'
          status?: 'pending' | 'in-progress' | 'resolved'
          date_reported?: string
          image_url?: string | null
          updated_at?: string
        }
      }
      gallery: {
        Row: {
          id: string
          title: string
          description: string | null
          image: string | null
          category: string | null
          date: string | null
          location: string | null
          tags: string[] | null
          status: 'published' | 'draft'
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          image?: string | null
          category?: string | null
          date?: string | null
          location?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft'
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          image?: string | null
          category?: string | null
          date?: string | null
          location?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft'
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          username: string
          email: string
          password_hash: string
          role: 'admin' | 'editor'
          name: string
          avatar: string | null
          status: 'active' | 'inactive'
          last_login: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          username: string
          email: string
          password_hash: string
          role?: 'admin' | 'editor'
          name: string
          avatar?: string | null
          status?: 'active' | 'inactive'
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string
          email?: string
          password_hash?: string
          role?: 'admin' | 'editor'
          name?: string
          avatar?: string | null
          status?: 'active' | 'inactive'
          last_login?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      system_settings: {
        Row: {
          id: string
          setting_key: string
          setting_value: any
          setting_type: string
          description: string | null
          is_public: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          setting_key: string
          setting_value: any
          setting_type?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          setting_key?: string
          setting_value?: any
          setting_type?: string
          description?: string | null
          is_public?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      organizational_hierarchy: {
        Row: {
          id: string
          name: string
          designation: string
          photo: string | null
          department: string
          level: number
          parent_id: string | null
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          designation: string
          photo?: string | null
          department: string
          level?: number
          parent_id?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          designation?: string
          photo?: string | null
          department?: string
          level?: number
          parent_id?: string | null
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      key_personnel: {
        Row: {
          id: string
          name: string
          designation: string
          photo: string | null
          bio: string | null
          email: string | null
          phone: string | null
          department: string
          order_index: number
          is_featured: boolean
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          designation: string
          photo?: string | null
          bio?: string | null
          email?: string | null
          phone?: string | null
          department: string
          order_index?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          designation?: string
          photo?: string | null
          bio?: string | null
          email?: string | null
          phone?: string | null
          department?: string
          order_index?: number
          is_featured?: boolean
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      emergency_hotlines: {
        Row: {
          id: string
          contact_name: string
          phone_number: string
          logo: string | null
          department: string
          description: string | null
          is_primary: boolean
          order_index: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          contact_name: string
          phone_number: string
          logo?: string | null
          department: string
          description?: string | null
          is_primary?: boolean
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          contact_name?: string
          phone_number?: string
          logo?: string | null
          department?: string
          description?: string | null
          is_primary?: boolean
          order_index?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      weather_data: {
        Row: {
          id: string
          temperature: number
          humidity: number
          wind_speed: number
          visibility: number
          condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy'
          description: string
          last_updated: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          temperature: number
          humidity: number
          wind_speed: number
          visibility: number
          condition: 'sunny' | 'cloudy' | 'rainy' | 'stormy'
          description: string
          last_updated?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          temperature?: number
          humidity?: number
          wind_speed?: number
          visibility?: number
          condition?: 'sunny' | 'cloudy' | 'rainy' | 'stormy'
          description?: string
          last_updated?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      navigation_items: {
        Row: {
          id: string
          label: string
          path: string
          icon: string
          order_index: number
          is_active: boolean
          is_featured: boolean
          parent_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          label: string
          path: string
          icon?: string
          order_index?: number
          is_active?: boolean
          is_featured?: boolean
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          label?: string
          path?: string
          icon?: string
          order_index?: number
          is_active?: boolean
          is_featured?: boolean
          parent_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          description: string | null
          video_url: string
          thumbnail: string
          category: string | null
          date: string | null
          location: string | null
          duration: string | null
          tags: string[] | null
          status: 'published' | 'draft'
          featured: boolean
          view_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          video_url: string
          thumbnail: string
          category?: string | null
          date?: string | null
          location?: string | null
          duration?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft'
          featured?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          video_url?: string
          thumbnail?: string
          category?: string | null
          date?: string | null
          location?: string | null
          duration?: string | null
          tags?: string[] | null
          status?: 'published' | 'draft'
          featured?: boolean
          view_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      weather_api_settings: {
        Row: {
          id: string
          api_key: string
          api_secret?: string
          station_id?: string
          is_active: boolean
          last_sync: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          api_key: string
          api_secret?: string
          station_id?: string
          is_active?: boolean
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          api_key?: string
          api_secret?: string
          station_id?: string
          is_active?: boolean
          last_sync?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      weather_forecast: {
        Row: {
          id: string
          date: string
          temperature_high: number
          temperature_low: number
          condition: string
          humidity: number
          wind_speed: number
          precipitation: number
          icon: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          date: string
          temperature_high: number
          temperature_low: number
          condition: string
          humidity?: number
          wind_speed?: number
          precipitation?: number
          icon?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          date?: string
          temperature_high?: number
          temperature_low?: number
          condition?: string
          humidity?: number
          wind_speed?: number
          precipitation?: number
          icon?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      weather_data: {
        Row: {
          id: string
          temperature: number
          humidity: number
          wind_speed: number
          visibility: number
          condition: string
          description: string
          location: string
          alerts: string[]
          last_updated: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          temperature: number
          humidity: number
          wind_speed: number
          visibility?: number
          condition: string
          description: string
          location?: string
          alerts?: string[]
          last_updated?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          temperature?: number
          humidity?: number
          wind_speed?: number
          visibility?: number
          condition?: string
          description?: string
          location?: string
          alerts?: string[]
          last_updated?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}