import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface PaymentDetailDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: {
    id: number
    date: string
    status: string
    products: string
    period: string
    method: string
    amount: number
    paymentDate: string
    requester: string
  }
}

export function PaymentDetailDialog({ open, onOpenChange, payment }: PaymentDetailDialogProps) {
  // 예시 계산 (실제로는 서버에서 받아와야 함)
  const monthlyPrice = 80000
  const months = 12
  const regularPrice = monthlyPrice * months
  const discount = regularPrice * 0.27
  const vat = (regularPrice - discount) * 0.1

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>결제 금액 상세</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="rounded-lg border p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">월 정가</span>
              <span>{monthlyPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">이용기간</span>
              <span>× {months}개월</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">정가 금액</span>
              <span>{regularPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-destructive">
              <span>할인 금액 (27%)</span>
              <span>-{discount.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">부가세(10%)</span>
              <span>{vat.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
              <span>최종 결제금액</span>
              <span className="text-primary text-lg">{payment.amount.toLocaleString()}원</span>
            </div>
          </div>

          <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제상품</span>
              <span>{payment.products}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">이용기간</span>
              <span>{payment.period}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제수단</span>
              <span>{payment.method}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">신청일시</span>
              <span>{payment.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">결제일시</span>
              <span>{payment.paymentDate}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
