'use client'

import { UploadButton } from '@/lib/uploadthing'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { ImageIcon, X, Upload } from 'lucide-react'
import Image from 'next/image'

type CoverImageUploadProps = {
    coverImage: { url: string; name: string } | null
    onCoverImageChange: (cover: { url: string; name: string } | null) => void
    required?: boolean
    label?: string
}

export function CoverImageUpload({
    coverImage,
    onCoverImageChange,
    required = false,
    label = 'Cover Image',
}: CoverImageUploadProps) {
    return (
        <div className="space-y-2">
            <Label className="text-sm font-medium">
                {label}{' '}
                {required ? (
                    <span className="text-dreem-orange">*</span>
                ) : (
                    <span className="text-xs text-slate-500">(Optional)</span>
                )}
            </Label>
            {!coverImage ? (
                <div className="relative border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-lg overflow-hidden bg-slate-50 dark:bg-slate-800/50 hover:border-dreem-orange hover:bg-dreem-orange/5 transition-all cursor-pointer group min-h-[180px]">
                    <div className="flex flex-col items-center justify-center p-8 pointer-events-none">
                        <Upload className="w-10 h-10 text-slate-400 group-hover:text-dreem-orange transition-colors mb-3" />
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1 font-medium">
                            Click to upload cover photo
                        </p>
                        <p className="text-xs text-slate-500">JPG, PNG or WebP · Max 4MB</p>
                    </div>
                    <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                            if (res && res[0]) {
                                onCoverImageChange({
                                    url: res[0].ufsUrl,
                                    name: res[0].name,
                                })
                                toast.success('Cover image uploaded')
                            }
                        }}
                        onUploadError={(error: Error) => {
                            toast.error(`Upload failed: ${error.message}`)
                        }}
                        appearance={{
                            button: 'w-full h-full absolute inset-0 opacity-0 cursor-pointer',
                            container: 'w-full h-full absolute inset-0',
                            allowedContent: 'hidden',
                        }}
                    />
                </div>
            ) : (
                <div className="relative rounded-lg overflow-hidden border-2 border-dreem-orange/20 bg-dreem-orange/5 dark:bg-dreem-orange/10">
                    <div className="relative aspect-[16/9] w-full">
                        <Image
                            src={coverImage.url}
                            alt={coverImage.name}
                            fill
                            className="object-cover"
                            unoptimized
                        />
                    </div>
                    <div className="flex items-center justify-between p-3 border-t border-dreem-orange/20">
                        <div className="flex items-center gap-2 min-w-0">
                            <ImageIcon className="w-4 h-4 text-dreem-orange shrink-0" />
                            <span className="text-sm font-medium text-slate-900 dark:text-white truncate">
                                {coverImage.name}
                            </span>
                        </div>
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => onCoverImageChange(null)}
                            className="h-8 w-8 shrink-0"
                        >
                            <X className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
