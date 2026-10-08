import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oybfckkllndesfpuwenr.supabase.co';
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im95YmZja2tsbG5kZXNmcHV3ZW5yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTEyNjgyMjQsImV4cCI6MjEwNjg0NDIyNH0.cuv6l3VTYOvxjW-pQU_qzpttsjaeou_wPm4tq3Eailk';

  return createBrowserClient(supabaseUrl, supabaseKey);
}
