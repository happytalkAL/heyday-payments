"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SubscriptionCard } from "@/components/payment/subscription-card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CreditCard, RefreshCw, AlertCircle, Plus } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type Scenario = "subscribed" | "cancelling" | "free" | "free-subscribed" | "subscribed-with-free" | "none"

const subscribedServices = [
  {
    id: "masudong",
    serviceName: "마수동",
    status: "구독중" as const,
    subscriptionType: "연간 구독" as const,
    nextPaymentDate: "2026.03.20",
    startDate: "2026.01.20",
    amount: "월 55,000원(VAT포함)",
    isPaymentToday: false,
  },
  {
    id: "simple-join",
    serviceName: "간편가입",
    status: "구독중" as const,
    subscriptionType: "월간 구독" as const,
    nextPaymentDate: "2026.03.20",
    startDate: "2026.02.01",
    amount: "월 33,000원(VAT포함)",
    isPaymentToday: false,
  },
]

const cancellingServices = [
  {
    id: "masudong",
    serviceName: "마수동",
    status: "해지예정" as const,
    subscriptionType: "연간 구독" as const,
    startDate: "2026.01.20",
    endDate: "2027.01.19",
    amount: "월 55,000원(VAT포함)",
    isPaymentToday: false,
  },
]

const freeServices = [
  {
    id: "masudong",
    serviceName: "마수동",
    status: "무료이용중" as const,
    subscriptionType: "" as "월간 구독" | "연간 구독",
    freePeriodStart: "2026.02.01",
    freePeriodEnd: "2026.04.01",
    remainingDays: 40,
    amount: "",
    isPaymentToday: false,
  },
]

const freeSubscribedServices = [
  {
    id: "masudong",
    serviceName: "마수동",
    status: "무료이용중" as const,
    subscriptionType: "연간 구독" as const,
    freePeriodStart: "2026.02.01",
    freePeriodEnd: "2026.04.01",
    remainingDays: 40,
    subscriptionStartDate: "2026.04.02",
    amount: "월 55,000원(VAT포함)",
    isPaymentToday: false,
  },
]

// 구독중 + 무료이용권 동시 보유
const subscribedWithFreeServices = [
  {
    id: "masudong",
    serviceName: "마수동",
    status: "구독중" as const,
    subscriptionType: "연간 구독" as const,
    startDate: "2026.01.20",
    endDate: "2027.01.19", // 구독 종료일 (1년)
    amount: "월 55,000원(VAT포함)",
    isPaymentToday: false,
    freeTicket: {
      freePeriodStart: "2027.01.20", // 구독 종료 다음날부터
      freePeriodEnd: "2027.03.19", // 2달간
      remainingDays: 60,
    },
    nextPaymentDate: "2027.03.20", // 무료이용권 종료 후 다음 결제
  },
]

const todayPaymentServices = [
  {
    id: "masudong",
    serviceName: "마수동",
    status: "구독중" as const,
    subscriptionType: "연간 구독" as const,
    nextPaymentDate: "2026.02.20",
    startDate: "2026.02.20",
    amount: "월 55,000원(VAT포함)",
    isPaymentToday: true,
  },
]

const allProducts = [
  { id: "masudong", name: "마수동", description: "마케팅 수신동의 자동 전환 메시지 팝업 노출" },
  { id: "simple-join", name: "간편가입", description: "카카오/네이버 간편가입 제공" },
  { id: "chat", name: "SNS연동 무제한 채팅상담", description: "카카오/네이버 채팅상담 무제한 제공" },
]

export default function SubscriptionPage() {
  const [scenario, setScenario] = useState<Scenario>("subscribed")
  const [registeredCard, setRegisteredCard] = useState({
    brand: "신한카드",
    number: "0000-xxxx-xxxx-1234",
  })
  const [showChangeCardDialog, setShowChangeCardDialog] = useState(false)
  const [newCardNumber, setNewCardNumber] = useState("")

  const handleChangeCard = () => {
    if (newCardNumber.trim()) {
      setRegisteredCard({
        brand: "새 카드",
        number: `xxxx-xxxx-xxxx-${newCardNumber.slice(-4) || "0000"}`,
      })
      setShowChangeCardDialog(false)
      setNewCardNumber("")
      alert("결제 카드가 변경되었습니다. 다음 결제부터 변경된 카드로 결제됩니다.")
    }
  }

  const getServices = () => {
    switch (scenario) {
      case "subscribed": return subscribedServices
      case "cancelling": return cancellingServices
      case "free": return freeServices
      case "free-subscribed": return freeSubscribedServices
      case "subscribed-with-free": return subscribedWithFreeServices
      case "none": return []
    }
  }

  const services = getServices()
  const activeServiceIds = services.map((s) => s.id)
  const additionalProducts = allProducts.filter((p) => !activeServiceIds.includes(p.id))

  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      {/* Dev Mode */}
      <div className="rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 p-4">
        <div className="flex items-center gap-4">
          <Label className="text-xs font-semibold text-amber-700 whitespace-nowrap">시나리오</Label>
          <Select value={scenario} onValueChange={(v) => setScenario(v as Scenario)}>
            <SelectTrigger className="w-[220px] h-8 text-xs bg-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="subscribed">구독중 (복수 상품)</SelectItem>
              <SelectItem value="subscribed-with-free">구독중 + 무료이용권</SelectItem>
              <SelectItem value="cancelling">해지예정</SelectItem>
              <SelectItem value="free">무료이용중 (구독 미신청)</SelectItem>
              <SelectItem value="free-subscribed">무료이용중 (구독 신청완료)</SelectItem>
              <SelectItem value="none">구독 없음</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-[10px] text-amber-600">개발/테스트용</span>
        </div>
      </div>

      {/* 페이지 타이틀 */}
      <div>
        <h1 className="text-2xl font-bold">구독현황</h1>
        <p className="text-sm text-muted-foreground mt-1">현재 이용 중인 서비스와 결제 정보를 확인하고 관리할 수 있습니다.</p>
      </div>

      {/* 구독 없음 */}
      {services.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center space-y-4">
            <p className="text-muted-foreground">현재 구독중인 서비스가 없습니다.</p>
            <p className="text-sm text-muted-foreground">서비스 신청 페이지에서 원하시는 상품을 구독하실 수 있습니다.</p>
            <Button asChild>
              <Link href="/payment/apply">
                서비스 신청하기 <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {services.length > 0 && (
        <>
          {/* ── 등록 결제수단 (상단 배너) ── */}
          <div className="rounded-xl border bg-gradient-to-r from-slate-50 to-slate-100 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">등록 결제수단</p>
                  <p className="font-semibold">{registeredCard.brand} <span className="font-normal text-muted-foreground">{registeredCard.number}</span></p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={() => setShowChangeCardDialog(true)} className="bg-white">
                <RefreshCw className="h-3.5 w-3.5 mr-1.5" />
                변경
              </Button>
            </div>
            <p className="text-[11px] text-muted-foreground mt-3 pl-14">
              모든 구독 서비스는 위 카드로 자동결제됩니다. 변경 시 다음 결제부터 적용됩니다.
            </p>
          </div>

          {/* ── 구독중인 서비스 ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-semibold">구독중인 서비스</h2>
                <Badge variant="secondary">{services.length}건</Badge>
              </div>
            </div>

            <div className="space-y-3">
              {services.map((service) => (
                <SubscriptionCard key={`${scenario}-${service.id}`} service={service} />
              ))}
            </div>
          </div>

          {/* ── 추가 가능한 서비스 ── */}
          {additionalProducts.length > 0 && (
            <div className="space-y-4">
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold text-muted-foreground">추가 가능한 서비스</h2>
                </div>
                <Button variant="ghost" size="sm" asChild className="text-muted-foreground">
                  <Link href="/payment/apply">
                    전체보기 <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {additionalProducts.map((product) => (
                  <div
                    key={product.id}
                    className="group flex flex-col justify-between rounded-lg border border-dashed p-4 hover:border-primary/40 hover:bg-primary/[0.02] transition-colors"
                  >
                    <div className="mb-3">
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{product.description}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild className="w-full">
                      <Link href="/payment/apply">
                        <Plus className="h-3.5 w-3.5 mr-1" />
                        신청하기
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* 카드 변경 다이얼로그 */}
      <Dialog open={showChangeCardDialog} onOpenChange={setShowChangeCardDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>결제 카드 변경</DialogTitle>
            <DialogDescription>새로운 결제 카드 정보를 입력해주세요.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label className="text-sm">현재 등록 카드</Label>
              <div className="flex items-center gap-2 rounded-md bg-muted p-3 text-sm">
                <CreditCard className="h-4 w-4" />
                <span>{registeredCard.brand} {registeredCard.number}</span>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-card" className="text-sm">새 카드 번호</Label>
              <Input
                id="new-card"
                placeholder="0000-0000-0000-0000"
                value={newCardNumber}
                onChange={(e) => setNewCardNumber(e.target.value)}
              />
            </div>
            <div className="flex items-start gap-2 rounded-md bg-amber-50 border border-amber-200 p-3">
              <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
              <p className="text-xs text-amber-700">
                카드를 변경하면 현재 이용 중인 모든 구독 서비스의 다음 자동결제 및 새로운 결제가 변경된 카드로 적용됩니다.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => { setShowChangeCardDialog(false); setNewCardNumber("") }}>취소</Button>
            <Button onClick={handleChangeCard} disabled={!newCardNumber.trim()}>카드 변경</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
