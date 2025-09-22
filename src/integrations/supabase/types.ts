export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      briefings: {
        Row: {
          budget: string | null
          company: string | null
          created_at: string
          description: string
          email: string
          features: string | null
          id: string
          integrations: string | null
          name: string
          phone: string
          project_type: string | null
          timeline: string | null
        }
        Insert: {
          budget?: string | null
          company?: string | null
          created_at?: string
          description: string
          email: string
          features?: string | null
          id?: string
          integrations?: string | null
          name: string
          phone: string
          project_type?: string | null
          timeline?: string | null
        }
        Update: {
          budget?: string | null
          company?: string | null
          created_at?: string
          description?: string
          email?: string
          features?: string | null
          id?: string
          integrations?: string | null
          name?: string
          phone?: string
          project_type?: string | null
          timeline?: string | null
        }
        Relationships: []
      }
      contacts: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          interest: string | null
          message: string
          name: string
          phone: string
          subject: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          interest?: string | null
          message: string
          name: string
          phone: string
          subject: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          interest?: string | null
          message?: string
          name?: string
          phone?: string
          subject?: string
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          name: string
          phone: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          name: string
          phone: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          name?: string
          phone?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}