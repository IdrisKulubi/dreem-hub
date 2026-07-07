'use client'

import { useState } from 'react'
import { Share2, Mail, Link2, Copy, Check, Linkedin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

interface ResourceShareButtonProps {
    title: string
    fileUrl: string
    description?: string | null
}

function WhatsAppIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.884 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
    )
}

function XIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    )
}

export function ResourceShareButton({ title, fileUrl, description }: ResourceShareButtonProps) {
    const [open, setOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const shareMessage = description
        ? `${title}\n\n${description}`
        : title

    const shareOptions = [
        {
            name: 'WhatsApp',
            icon: WhatsAppIcon,
            className: 'bg-[#25D366]/10 text-[#128C7E] hover:bg-[#25D366]/20 dark:text-[#25D366]',
            href: `https://wa.me/?text=${encodeURIComponent(`${shareMessage}\n\n${fileUrl}`)}`,
        },
        {
            name: 'Email',
            icon: Mail,
            className: 'bg-dreem-orange/10 text-dreem-orange hover:bg-dreem-orange/20',
            href: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareMessage}\n\nDownload: ${fileUrl}`)}`,
        },
        {
            name: 'LinkedIn',
            icon: Linkedin,
            className: 'bg-[#0A66C2]/10 text-[#0A66C2] hover:bg-[#0A66C2]/20',
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fileUrl)}`,
        },
        {
            name: 'X',
            icon: XIcon,
            className: 'bg-slate-100 text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700',
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(fileUrl)}`,
        },
    ]

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(fileUrl)
            setCopied(true)
            toast.success('Link copied to clipboard')
            setTimeout(() => setCopied(false), 2000)
        } catch {
            toast.error('Failed to copy link')
        }
    }

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    size="sm"
                    variant="ghost"
                    className="hover:text-dreem-orange hover:bg-dreem-orange/10"
                    aria-label={`Share ${title}`}
                >
                    Share <Share2 className="w-3 h-3 ml-1.5" />
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="end"
                side="top"
                sideOffset={8}
                className="w-[min(calc(100vw-2rem),320px)] rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-0 shadow-xl shadow-slate-200/60 dark:shadow-slate-950/60"
            >
                <div className="p-4 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2.5 mb-2">
                        <div className="p-2 rounded-xl bg-dreem-orange/10">
                            <Share2 className="w-4 h-4 text-dreem-orange" />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">Share resource</p>
                            <p className="text-xs text-muted-foreground line-clamp-1">{title}</p>
                        </div>
                    </div>
                </div>

                <div className="p-4 pt-3">
                    <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
                        Share via
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                        {shareOptions.map((option) => (
                            <a
                                key={option.name}
                                href={option.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setOpen(false)}
                                className={cn(
                                    'flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors',
                                    option.className
                                )}
                            >
                                <option.icon className="w-4 h-4 shrink-0" />
                                {option.name}
                            </a>
                        ))}
                    </div>
                </div>

                <div className="px-4 pb-4">
                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Link2 className="w-3 h-3" />
                        Copy link
                    </p>
                    <div className="flex items-center gap-2">
                        <Input
                            readOnly
                            value={fileUrl}
                            className="h-9 text-xs bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 truncate"
                            onFocus={(e) => e.target.select()}
                        />
                        <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={handleCopy}
                            className={cn(
                                'shrink-0 h-9 px-3 border-slate-200 dark:border-slate-700',
                                copied && 'text-emerald-600 border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 dark:border-emerald-900'
                            )}
                        >
                            {copied ? (
                                <Check className="w-4 h-4" />
                            ) : (
                                <Copy className="w-4 h-4" />
                            )}
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    )
}
