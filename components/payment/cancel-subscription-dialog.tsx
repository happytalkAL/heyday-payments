"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { AlertCircle } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CancelSubscriptionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  service: {
    serviceName: string
    subscriptionType: string
    nextPaymentDate?: string
    isPaymentToday: boolean
  }
  onComplete: (withRefund: boolean) => void
}

const cancelReasons = [
  { id: "price", label: "가격이 비쌈" },
  { id: "error", label: "서비스 오류/장애 발생" },
  { id: "difficult", label: "사용 방법이 어려움" },
  { id: "change", label: "단순 변심" },
  { id: "other", label: "기타 사유" },
]

export function CancelSubscriptionDialog({
  open,
  onOpenChange,
  service,
  onComplete,
}: CancelSubscriptionDialogProps) {
  const [selectedReason, setSelectedReason] = useState("")
  const [otherReason, setOtherReason] = useState("")
  const [showRefundChoice, setShowRefundChoice] = useState(false)

  const isValid = selectedReason && (selectedReason !== "other" || otherReason.trim().length > 0)

  const handleSubmit = () => {
    if (service.isPaymentToday) {
      setShowRefundChoice(true)
    } else {
      onComplete(false)
      resetForm()
    }
  }

  const handleRefundChoice = (withRefund: boolean) => {
    setShowRefundChoice(false)
    onComplete(withRefund)
    resetForm()
  }

  const resetForm = () => {
    setSelectedReason("")
    setOtherReason("")
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(v) => { if (!v) resetForm(); onOpenChange(v); }}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>구독 해지</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* 구독 정보 표시 */}
            <div className="rounded-lg border p-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">서비스명</span>
                <span className="font-medium">{service.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">구독 유형</span>
                <span className="font-medium">{service.subscriptionType}</span>
              </div>
              {service.nextPaymentDate && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">다음 결제일</span>
                  <span className="font-medium">{service.nextPaymentDate}</span>
                </div>
              )}
            </div>

            {/* 해지 안내 */}
            <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <div className="space-y-2 text-muted-foreground">
                  <p>구독을 해지하면 <strong className="text-foreground">다음 결제일부터 자동결제가 중단</strong>됩니다.</p>
                  <p>현재 구독 기간까지는 정상적으로 이용 가능합니다.</p>
                  <p><strong className="text-foreground">결제 당일에는 전액 환불이 가능</strong>합니다. 결제 당일이 아닌 경우 부분 환불은 불가하며, 현재 구독 기간 종료 시 자동으로 해지됩니다.</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* 해지 사유 선택 */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold">해지 사유 선택 <span className="text-destructive">*</span></Label>
              <RadioGroup value={selectedReason} onValueChange={setSelectedReason}>
                {cancelReasons.map((reason) => (
                  <div key={reason.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={reason.id} id={`reason-${reason.id}`} />
                    <Label htmlFor={`reason-${reason.id}`} className="font-normal cursor-pointer">
                      {reason.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>

              {selectedReason === "other" && (
                <div className="relative">
                  <Textarea
                    placeholder="해지 사유를 입력해주세요."
                    value={otherReason}
                    onChange={(e) => {
                      if (e.target.value.length <= 10000) setOtherReason(e.target.value)
                    }}
                    className="min-h-[100px]"
                  />
                  <span className="absolute bottom-2 right-3 text-xs text-muted-foreground">
                    {otherReason.length.toLocaleString()}/10,000
                  </span>
                </div>
              )}
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { resetForm(); onOpenChange(false); }}>
              취소
            </Button>
            <Button variant="destructive" onClick={handleSubmit} disabled={!isValid}>
              해지 신청
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 당일 전액환불 선택 */}
      <AlertDialog open={showRefundChoice} onOpenChange={setShowRefundChoice}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>전액 환불 안내</AlertDialogTitle>
            <AlertDialogDescription>
              오늘 결제된 금액을 전액 환불받으시겠습니까? 전액 환불 시 서비스는 즉시 종료됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogCancel onClick={() => handleRefundChoice(false)}>
              환불 없이 해지만
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleRefundChoice(true)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              전액 환불 및 해지
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
