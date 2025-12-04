'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import Image from 'next/image'

export default function LoginPage() {
    const [state, action, isPending] = useActionState(loginAction, null)

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 px-4">
            <div className="w-full max-w-md space-y-8 bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                <div className="text-center space-y-2">
                    <div className="flex justify-center mb-6">
                        {/* Logo placeholder if needed, or just text */}
                        <div className="text-2xl font-bold">DREEM<span className="text-dreem-orange">Hub</span></div>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Access</h1>
                    <p className="text-muted-foreground text-sm">
                        Enter your country access code to continue
                    </p>
                </div>

                <form action={action} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="code">Access Code</Label>
                        <Input
                            id="code"
                            name="code"
                            type="password"
                            placeholder="••••••••"
                            required
                            className="text-center text-lg tracking-widest"
                        />
                    </div>

                    {state?.error && (
                        <div className="text-sm text-red-500 text-center font-medium bg-red-50 dark:bg-red-900/20 p-2 rounded-lg">
                            {state.error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-dreem-orange hover:bg-dreem-orange-dark text-white"
                        disabled={isPending}
                    >
                        {isPending ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Verifying...
                            </>
                        ) : (
                            'Access Dashboard'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    )
}
