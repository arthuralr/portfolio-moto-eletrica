import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase with provided project defaults
export const SUPABASE_DEFAULT_URL = 'https://riirfdnzdewhzacpvwkw.supabase.co';
export const SUPABASE_DEFAULT_ANON_KEY = 'sb_publishable_azRqvPigs3OgrW0WpgBGeQ_jVmSbdXB';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || SUPABASE_DEFAULT_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || SUPABASE_DEFAULT_ANON_KEY;

// Check if credentials are configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

// Instantiate Supabase client
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// Database Moto Interface matching Supabase 'motos' table
export interface MotoSupabase {
  id: string;
  nome: string;
  preco: string;
  preco_numero?: number;
  autonomia: string;
  velocidade_maxima: string;
  tempo_carga: string;
  potencia: string;
  imagem_url?: string;
  categoria?: string;
  descricao?: string;
  created_at?: string;
}

// Recommended SQL to create the table in Supabase SQL Editor
export const SUPABASE_SQL_SETUP = `-- Script para criar a tabela de motos no Supabase SQL Editor:
create table if not exists public.motos (
  id text primary key,
  nome text not null,
  preco text not null,
  preco_numero numeric default 0,
  autonomia text not null,
  velocidade_maxima text not null,
  tempo_carga text not null,
  potencia text not null default '1000W Brushless',
  imagem_url text,
  categoria text default 'Chopper Autopropelida',
  descricao text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar leitura pública para a vitrine
alter table public.motos enable row level security;

create policy "Permitir leitura pública de motos" 
on public.motos for select using (true);

create policy "Permitir inserção de motos" 
on public.motos for insert with check (true);

create policy "Permitir exclusão de motos" 
on public.motos for delete using (true);
`;
