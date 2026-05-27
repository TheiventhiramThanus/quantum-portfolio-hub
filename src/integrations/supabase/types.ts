export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      about: {
        Row: {
          background_description: string | null
          background_details: Json
          career_goal: string | null
          goals: Json
          id: string
          intro: string | null
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          background_description?: string | null
          background_details?: Json
          career_goal?: string | null
          goals?: Json
          id?: string
          intro?: string | null
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          background_description?: string | null
          background_details?: Json
          career_goal?: string | null
          goals?: Json
          id?: string
          intro?: string | null
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      achievements: {
        Row: {
          contributions: string[]
          created_at: string
          description: string | null
          display_order: number
          duration: string | null
          events: string[]
          highlight: string | null
          icon: string | null
          id: string
          logo_url: string | null
          organization: string | null
          period: string | null
          skills: string[]
          title: string
          updated_at: string
        }
        Insert: {
          contributions?: string[]
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          events?: string[]
          highlight?: string | null
          icon?: string | null
          id?: string
          logo_url?: string | null
          organization?: string | null
          period?: string | null
          skills?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          contributions?: string[]
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          events?: string[]
          highlight?: string | null
          icon?: string | null
          id?: string
          logo_url?: string | null
          organization?: string | null
          period?: string | null
          skills?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      branding: {
        Row: {
          browser_title: string
          favicon: string | null
          hero_image: string | null
          id: string
          loader_logo: string | null
          logo_image: string | null
          logo_text: string
          profile_image: string | null
          site_name: string
          social_preview_image: string | null
          updated_at: string
        }
        Insert: {
          browser_title?: string
          favicon?: string | null
          hero_image?: string | null
          id?: string
          loader_logo?: string | null
          logo_image?: string | null
          logo_text?: string
          profile_image?: string | null
          site_name?: string
          social_preview_image?: string | null
          updated_at?: string
        }
        Update: {
          browser_title?: string
          favicon?: string | null
          hero_image?: string | null
          id?: string
          loader_logo?: string | null
          logo_image?: string | null
          logo_text?: string
          profile_image?: string | null
          site_name?: string
          social_preview_image?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      certificates: {
        Row: {
          category: string
          certificate_image: string | null
          certificate_link: string | null
          created_at: string
          credential_id: string | null
          display_order: number
          featured: boolean
          id: string
          issued_date: string | null
          provider: string
          provider_logo: string | null
          skills: string[]
          title: string
          updated_at: string
          verification_link: string | null
        }
        Insert: {
          category: string
          certificate_image?: string | null
          certificate_link?: string | null
          created_at?: string
          credential_id?: string | null
          display_order?: number
          featured?: boolean
          id?: string
          issued_date?: string | null
          provider: string
          provider_logo?: string | null
          skills?: string[]
          title: string
          updated_at?: string
          verification_link?: string | null
        }
        Update: {
          category?: string
          certificate_image?: string | null
          certificate_link?: string | null
          created_at?: string
          credential_id?: string | null
          display_order?: number
          featured?: boolean
          id?: string
          issued_date?: string | null
          provider?: string
          provider_logo?: string | null
          skills?: string[]
          title?: string
          updated_at?: string
          verification_link?: string | null
        }
        Relationships: []
      }
      contact_details: {
        Row: {
          drive_url: string | null
          email: string
          github_url: string | null
          id: string
          instagram_url: string | null
          linkedin_url: string | null
          location: string | null
          main_portfolio_url: string | null
          name: string
          phone: string | null
          portfolio_url: string | null
          twitter_url: string | null
          updated_at: string
          whatsapp_url: string | null
        }
        Insert: {
          drive_url?: string | null
          email: string
          github_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          main_portfolio_url?: string | null
          name: string
          phone?: string | null
          portfolio_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Update: {
          drive_url?: string | null
          email?: string
          github_url?: string | null
          id?: string
          instagram_url?: string | null
          linkedin_url?: string | null
          location?: string | null
          main_portfolio_url?: string | null
          name?: string
          phone?: string | null
          portfolio_url?: string | null
          twitter_url?: string | null
          updated_at?: string
          whatsapp_url?: string | null
        }
        Relationships: []
      }
      education: {
        Row: {
          created_at: string
          degree: string
          description: string | null
          display_order: number
          duration: string | null
          grade: string | null
          id: string
          institution: string
          logo_url: string | null
          period: string
          skills: string[]
          updated_at: string
        }
        Insert: {
          created_at?: string
          degree: string
          description?: string | null
          display_order?: number
          duration?: string | null
          grade?: string | null
          id?: string
          institution: string
          logo_url?: string | null
          period: string
          skills?: string[]
          updated_at?: string
        }
        Update: {
          created_at?: string
          degree?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          grade?: string | null
          id?: string
          institution?: string
          logo_url?: string | null
          period?: string
          skills?: string[]
          updated_at?: string
        }
        Relationships: []
      }
      experience: {
        Row: {
          created_at: string
          description: string | null
          display_order: number
          duration: string | null
          id: string
          logo_url: string | null
          organization: string
          period: string
          skills: string[]
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          id?: string
          logo_url?: string | null
          organization: string
          period: string
          skills?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number
          duration?: string | null
          id?: string
          logo_url?: string | null
          organization?: string
          period?: string
          skills?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      footer_settings: {
        Row: {
          copyright_text: string
          id: string
          show_copyright: boolean
          social_links: Json
          updated_at: string
        }
        Insert: {
          copyright_text?: string
          id?: string
          show_copyright?: boolean
          social_links?: Json
          updated_at?: string
        }
        Update: {
          copyright_text?: string
          id?: string
          show_copyright?: boolean
          social_links?: Json
          updated_at?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
          subject: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
          subject: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
          subject?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          behance_url: string | null
          category: string
          created_at: string
          description: string
          display_order: number
          drive_url: string | null
          featured: boolean
          features: string[]
          github_url: string | null
          id: string
          image_url: string | null
          linkedin_url: string | null
          live_url: string | null
          portfolio_url: string | null
          technologies: string[]
          title: string
          updated_at: string
        }
        Insert: {
          behance_url?: string | null
          category: string
          created_at?: string
          description: string
          display_order?: number
          drive_url?: string | null
          featured?: boolean
          features?: string[]
          github_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          live_url?: string | null
          portfolio_url?: string | null
          technologies?: string[]
          title: string
          updated_at?: string
        }
        Update: {
          behance_url?: string | null
          category?: string
          created_at?: string
          description?: string
          display_order?: number
          drive_url?: string | null
          featured?: boolean
          features?: string[]
          github_url?: string | null
          id?: string
          image_url?: string | null
          linkedin_url?: string | null
          live_url?: string | null
          portfolio_url?: string | null
          technologies?: string[]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      seo_settings: {
        Row: {
          canonical_url: string | null
          description: string
          id: string
          image_alt_texts: Json
          keywords: string | null
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page: string
          structured_data: Json
          title: string
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          description: string
          id?: string
          image_alt_texts?: Json
          keywords?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page: string
          structured_data?: Json
          title: string
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          description?: string
          id?: string
          image_alt_texts?: Json
          keywords?: string | null
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page?: string
          structured_data?: Json
          title?: string
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      services: {
        Row: {
          category: string | null
          created_at: string
          description: string
          display_order: number
          icon: string | null
          id: string
          title: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          description: string
          display_order?: number
          icon?: string | null
          id?: string
          title: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string
          display_order?: number
          icon?: string | null
          id?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      technologies: {
        Row: {
          category: string
          created_at: string
          display_order: number
          icon: string | null
          id: string
          level: number | null
          name: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          level?: number | null
          name: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          display_order?: number
          icon?: string | null
          id?: string
          level?: number | null
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      theme_settings: {
        Row: {
          accent_color: string
          animation_speed: string
          border_color: string
          card_background: string
          dark_background: string
          enable_3d: boolean
          enable_glow: boolean
          enable_particles: boolean
          gradient_end: string
          gradient_start: string
          id: string
          light_background: string
          primary_color: string
          secondary_color: string
          text_color: string
          updated_at: string
        }
        Insert: {
          accent_color?: string
          animation_speed?: string
          border_color?: string
          card_background?: string
          dark_background?: string
          enable_3d?: boolean
          enable_glow?: boolean
          enable_particles?: boolean
          gradient_end?: string
          gradient_start?: string
          id?: string
          light_background?: string
          primary_color?: string
          secondary_color?: string
          text_color?: string
          updated_at?: string
        }
        Update: {
          accent_color?: string
          animation_speed?: string
          border_color?: string
          card_background?: string
          dark_background?: string
          enable_3d?: boolean
          enable_glow?: boolean
          enable_particles?: boolean
          gradient_end?: string
          gradient_start?: string
          id?: string
          light_background?: string
          primary_color?: string
          secondary_color?: string
          text_color?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const
