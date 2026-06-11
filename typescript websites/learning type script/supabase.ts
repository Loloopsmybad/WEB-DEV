import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://wmkmdtzmglviqnaoblto.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indta21kdHptZ2x2aXFuYW9ibHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5NjE2MjMsImV4cCI6MjA5MzUzNzYyM30.Asu7RwDLdn2BOFCylVGPmylT6QfUR1Gcwh2rUVlzb3s'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)