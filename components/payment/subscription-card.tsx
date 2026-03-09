"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Clock, ArrowRight } from "lucide-react"
import { CancelSubscriptionDialog } from "./cancel-subscription-dialog"
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
import Link from "next/link"

interface SubscriptionService {
  id: string
  serviceName: string
  status: "구독중" | "해지예정" | "무료이용중"
  subscriptionType: "월간 구독" | "연간 구독"
  nextPaymentDate?: string
  startDate?: string
  endDate?: string
  freePeriodStart?: string
  freePeriodEnd?: string
  remainingDays?: number
  subscriptionStartDate?: string
  // 구독중 + 무료이용권 동시 보유 시
  freeTicket?: {
    freePeriodStart: string
    freePeriodEnd: string
    remainingDays: number
  }
  amount: string
  isPaymentToday: boolean
}

export function SubscriptionCard({ service }: { service: SubscriptionService }) {
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  const [showRestoreDialog, setShowRestoreDialog] = useState(false)
  const [showCancelPreSubDialog, setShowCancelPreSubDialog] = useState(false)
  const [currentStatus, setCurrentStatus] = useState(service.status)
  const [isCancelledPreSubscription, setIsCancelledPreSubscription] = useState(false)

  const statusConfig = {
    "구독중": { variant: "default" as const, color: "bg-blue-100 text-blue-800 border-blue-200" },
    "해지예정": { variant: "secondary" as const, color: "bg-gray-100 text-gray-800 border-gray-200" },
    "무료이용중": { variant: "outline" as const, color: "bg-green-100 text-green-800 border-green-200" },
  }

  const config = statusConfig[currentStatus]

  const handleCancelComplete = (withRefund: boolean) => {
    if (withRefund) {
      alert("전액 환불 및 해지가 완료되었습니다. 서비스가 즉시 종료됩니다.")
    } else {
      setCurrentStatus("해지예정")
      alert(`구독 해지가 완료되었습니다. ${service.endDate || "구독 기간 종료일"}까지 이용 가능합니다.`)
    }
    setShowCancelDialog(false)
  }

  const handleRestore = () => {
    setCurrentStatus("구독중")
    setShowRestoreDialog(false)
    alert("구독 해지가 철회되었습니다. 다음 결제일에 자동결제가 재개됩니다.")
  }

  return (
    <>
      <Card>
        <CardContent className="pt-6 space-y-4">
          {/* 상단: 서비스명 + 상태 뱃지 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-semibold">{service.serviceName}</h3>
              <Badge className={config.color}>{currentStatus}</Badge>
            </div>
            {service.subscriptionType && (
              <span className="text-sm text-muted-foreground">{service.subscriptionType}</span>
            )}
          </div>

          <Separator />

          {/* 서비스 상세 정보 */}
          <div className="grid grid-cols-2 gap-y-3 text-sm">
            {service.startDate && (
              <>
                <span className="text-muted-foreground">구독 시작일</span>
                <span className="text-right font-medium">{service.startDate}</span>
              </>
            )}

            {/* 구독중: 다음 결제일 + 금액 */}
            {currentStatus === "구독중" && (
              <>
                {service.nextPaymentDate && (
                  <>
                    <span className="text-muted-foreground">다음 결제일</span>
                    <span className="text-right font-medium">{service.nextPaymentDate}</span>
                  </>
                )}
                {service.amount && (
                  <>
                    <span className="text-muted-foreground">결제 금액</span>
                    <span className="text-right font-medium">{service.amount}</span>
                  </>
                )}
              </>
            )}

            {/* 구독중 + 무료이용권: 구독 종료일 표시 */}
            {currentStatus === "구독중" && service.freeTicket && service.endDate && (
              <>
                <span className="text-muted-foreground">구독 종료일</span>
                <span className="text-right font-medium">{service.endDate}</span>
              </>
            )}

            {/* 해지예정: 이용 종료일 */}
            {currentStatus === "해지예정" && service.endDate && (
              <>
                <span className="text-muted-foreground">이용 종료일</span>
                <span className="text-right font-medium">{service.endDate}</span>
              </>
            )}

            {/* 무료이용중: 무료 기간 + 남은일 */}
            {currentStatus === "무료이용중" && (
              <>
                <span className="text-muted-foreground">무료 이용 기간</span>
                <span className="text-right font-medium">
                  {service.freePeriodStart} ~ {service.freePeriodEnd}
                </span>
                {service.remainingDays !== undefined && (
                  <>
                    <span className="text-muted-foreground">남은 기간</span>
                    <span className="text-right font-medium text-green-600">{service.remainingDays}일</span>
                  </>
                )}
                {service.subscriptionStartDate && !isCancelledPreSubscription && (
                  <>
                    <span className="text-muted-foreground">구독 시작일</span>
                    <span className="text-right font-medium text-primary">{service.subscriptionStartDate}</span>
                  </>
                )}
              </>
            )}
          </div>

          {/* 구독중 + 무료이용권 안내 */}
          {currentStatus === "구독중" && service.freeTicket && service.endDate && (
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-md text-sm space-y-3">
              <p className="font-semibold text-blue-900">무료이용권이 제공됩니다</p>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold">1</div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-900">구독 이용</p>
                    <p className="text-blue-700">{service.startDate} ~ {service.endDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-600 text-white text-xs font-bold">2</div>
                  <div className="flex-1">
                    <p className="font-medium text-green-900">무료이용권</p>
                    <p className="text-green-700">{service.freeTicket.freePeriodStart} ~ {service.freeTicket.freePeriodEnd} ({service.freeTicket.remainingDays}일)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-400 text-white text-xs font-bold">3</div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-700">다음 결제 예정일</p>
                    <p className="text-gray-600">{service.nextPaymentDate}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 해지예정 안내 */}
          {currentStatus === "해지예정" && service.endDate && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 p-3 rounded-md text-sm text-amber-900">
              <Clock className="h-4 w-4 flex-shrink-0" />
              <span>{service.endDate}까지 이용 가능합니다.</span>
            </div>
          )}

          {/* 무료이용중 - 구독 미신청: 전환 안내 */}
          {currentStatus === "무료이용중" && !service.subscriptionStartDate && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-md text-sm text-blue-900 space-y-2">
              <p>무료 이용 종료 후 유료 구독으로 전환하시면 중단 없이 이용할 수 있습니다.</p>
              <Button variant="outline" size="sm" className="bg-white" asChild>
                <Link href="/payment/apply">
                  구독 신청
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}

          {/* 무료이용중 - 구독 신청완료: 구독 시작 예정 안내 */}
          {currentStatus === "무료이용중" && service.subscriptionStartDate && !isCancelledPreSubscription && (
            <div className="bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-900 space-y-1">
              <p className="font-semibold">구독 신청이 완료되었습니다.</p>
              <p>무료 이용 기간 종료 후 <strong>{service.subscriptionStartDate}</strong>부터 유료 구독이 시작되며 첫 결제가 진행됩니다.</p>
            </div>
          )}

          {/* 무료이용중 - 구독 신청 해지 후: 다시 구독 신청 안내 */}
          {currentStatus === "무료이용중" && isCancelledPreSubscription && (
            <div className="bg-blue-50 border border-blue-200 p-3 rounded-md text-sm text-blue-900 space-y-2">
              <p>무료 이용 종료 후 유료 구독으로 전환하시면 중단 없이 이용할 수 있습니다.</p>
              <Button variant="outline" size="sm" className="bg-white" asChild>
                <Link href="/payment/apply">
                  구독 신청
                  <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </div>
          )}

          {/* 액션 버튼 */}
          <div className="flex justify-end gap-2 pt-2">
            {currentStatus === "구독중" && (
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 px-2 text-xs" onClick={() => setShowCancelDialog(true)}>
                구독 해지
              </Button>
            )}
            {currentStatus === "해지예정" && (
              <Button variant="outline" onClick={() => setShowRestoreDialog(true)}>
                구독 해지 철회
              </Button>
            )}
            {currentStatus === "무료이용중" && service.subscriptionStartDate && !isCancelledPreSubscription && (
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground h-8 px-2 text-xs" onClick={() => setShowCancelPreSubDialog(true)}>
                구독 신청 해지
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 구독 해지 다이얼로그 */}
      <CancelSubscriptionDialog
        open={showCancelDialog}
        onOpenChange={setShowCancelDialog}
        service={service}
        onComplete={handleCancelComplete}
      />

      {/* 구독 신청 해지 확인 */}
      <AlertDialog open={showCancelPreSubDialog} onOpenChange={setShowCancelPreSubDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>구독 신청 해지</AlertDialogTitle>
            <AlertDialogDescription asChild>
              <div className="space-y-3">
                <p>
                  <strong>{service.serviceName}</strong> 서비스의 구독 신청을 해지하시겠습니까?
                </p>
                <div className="rounded-md bg-amber-50 border border-amber-200 p-3 space-y-2 text-sm text-amber-900">
                  <p className="font-semibold">구독 신청 해지 시 안내사항</p>
                  <ul className="list-disc ml-4 space-y-1">
                    <li>현재 무료 이용 기간(<strong>{service.freePeriodEnd}</strong>)까지는 정상적으로 이용 가능합니다.</li>
                    <li>무료 이용 기간이 종료되면 해당 서비스는 <strong>자동으로 종료</strong>되며 더 이상 이용할 수 없습니다.</li>
                    <li>예정된 유료 구독({service.subscriptionStartDate} 시작)은 취소되며, 결제가 진행되지 않습니다.</li>
                    <li>서비스를 계속 이용하시려면 무료 기간 종료 전에 다시 구독을 신청해주세요.</li>
                  </ul>
                </div>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => {
                setIsCancelledPreSubscription(true)
                setShowCancelPreSubDialog(false)
                alert("구독 신청이 해지되었습니다. 무료 이용 기간까지는 정상 이용 가능하며, 이후 서비스가 종료됩니다.")
              }}
            >
              구독 신청 해지
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* 구독 해지 철회 확인 */}
      <AlertDialog open={showRestoreDialog} onOpenChange={setShowRestoreDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>구독 해지 철회</AlertDialogTitle>
            <AlertDialogDescription>
              구독 해지를 철회하시겠습니까? 다음 결제일에 자동결제가 재개됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleRestore}>해지 철회</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
