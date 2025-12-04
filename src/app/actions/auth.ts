'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const COOKIE_NAME = 'dreem_admin_session'
const MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export async function loginAction(prevState: any, formData: FormData) {
    const code = formData.get('code') as string

    // Simple env-based auth
    // In production, use more secure methods, but this fits the requirement
    let country = null

    if (code === process.env.AUTH_CODE_KENYA) country = 'Kenya'
    else if (code === process.env.AUTH_CODE_UGANDA) country = 'Uganda'
    else if (code === process.env.AUTH_CODE_TANZANIA) country = 'Tanzania'
    else if (code === process.env.AUTH_CODE_SUPER) country = 'Global'

    if (!country) {
        return { error: 'Invalid access code' }
    }

    // Set cookie
    const cookieStore = await cookies()
    cookieStore.set(COOKIE_NAME, country, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: MAX_AGE,
        path: '/',
    })

    redirect('/admin/dashboard')
}

export async function logoutAction() {
    const cookieStore = await cookies()
    cookieStore.delete(COOKIE_NAME)
    redirect('/admin/login')
}

export async function getSession() {
    const cookieStore = await cookies()
    return cookieStore.get(COOKIE_NAME)?.value
}
