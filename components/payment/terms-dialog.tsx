import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TERMS_OF_SERVICE } from "@/constants/terms"

interface TermsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TermsDialog({ open, onOpenChange }: TermsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>[필수] 유료서비스 이용 및 결제약관 동의</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
          <div className="whitespace-pre-wrap text-sm text-muted-foreground leading-relaxed">
            {TERMS_OF_SERVICE}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
