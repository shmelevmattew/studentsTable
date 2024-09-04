import { createClient } from '@supabase/supabase-js'

const url = "https://tcfclxguttxtuarpehep.supabase.co"
const apiKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRjZmNseGd1dHR4dHVhcnBlaGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0MjYxMzIsImV4cCI6MjA0MTAwMjEzMn0.Q2D53e2mD29FHdFOi6LcycyfmFpGFahI1puStcjgHD0"
const defaultOption = {
    schema: 'public',
    headers: { 'x-my-custom-header': 'my-app-name' },
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
}

const supabase = createClient(url, apiKey, defaultOption)

export default supabase