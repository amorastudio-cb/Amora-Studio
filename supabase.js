
/*
 * AMORA STUDIO
 * Conexão com o Supabase
 *
 * Este arquivo prepara a conexão com o banco de dados.
 * Substitua os valores de configuração pelos dados do seu projeto.
 */

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// ======================================
// CONFIGURAÇÕES DO PROJETO
// ======================================

// Encontre esses dados em:
// Supabase → Project Settings → API

const SUPABASE_URL = "COLOQUE_AQUI_A_URL_DO_SEU_PROJETO";

const SUPABASE_ANON_KEY = "COLOQUE_AQUI_SUA_CHAVE_PUBLICA";

// ======================================
// VERIFICAÇÃO DAS CONFIGURAÇÕES
// ======================================

const configuracaoValida =
    SUPABASE_URL.startsWith("https://") &&
    !SUPABASE_URL.includes("COLOQUE_AQUI") &&
    SUPABASE_ANON_KEY.length > 20 &&
    !SUPABASE_ANON_KEY.includes("COLOQUE_AQUI");

if (!configuracaoValida) {
    console.warn(
        "Amora Studio: configure a URL e a chave pública do Supabase."
    );
}

// ======================================
// CRIAÇÃO DA CONEXÃO
// ======================================

export const supabase = configuracaoValida
    ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
        auth: {
            autoRefreshToken: true,
            persistSession: true,
            detectSessionInUrl: true
        }
    })
    : null;

// ======================================
// FUNÇÃO PARA VERIFICAR A CONEXÃO
// ======================================

export async function verificarConexao() {
    if (!supabase) {
        return {
            sucesso: false,
            mensagem: "Configure o Supabase antes de continuar."
        };
    }

    try {
        const { error } = await supabase.auth.getSession();

        if (error) {
            throw error;
        }

        return {
            sucesso: true,
            mensagem: "Conexão com o Supabase inicializada."
        };

    } catch (erro) {
        console.error("Erro na conexão:", erro);

        return {
            sucesso: false,
            mensagem: "Não foi possível verificar a conexão."
        };
    }
}

// ======================================
// AUTENTICAÇÃO
// ======================================

export async function cadastrarUsuario(nome, email, senha) {
    if (!supabase) {
        throw new Error("Supabase ainda não configurado.");
    }

    const { data, error } = await supabase.auth.signUp({
        email,
        password: senha,
        options: {
            data: {
                nome: nome
            }
        }
    });

    if (error) {
        throw error;
    }

    return data;
}

export async function entrarUsuario(email, senha) {
    if (!supabase) {
        throw new Error("Supabase ainda não configurado.");
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: senha
    });

    if (error) {
        throw error;
    }

    return data;
}

export async function sairUsuario() {
    if (!supabase) {
        throw new Error("Supabase ainda não configurado.");
    }

    const { error } = await supabase.auth.signOut();

    if (error) {
        throw error;
    }

    return true;
}

export async function obterUsuario() {
    if (!supabase) {
        return null;
    }

    const { data, error } = await supabase.auth.getUser();

    if (error) {
        return null;
    }

    return data.user;
}

export async function recuperarSenha(email) {
    if (!supabase) {
        throw new Error("Supabase ainda não configurado.");
    }

    const { data, error } = await supabase.auth.resetPasswordForEmail(
        email,
        {
            redirectTo: window.location.origin + "/redefinir-senha.html"
        }
    );

    if (error) {
        throw error;
    }

    return data;
}
