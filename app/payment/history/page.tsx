"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { CalendarIcon, Search, Download } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"
import { ReceiptDialog } from "@/components/payment/receipt-dialog"

const mockPayments = [
  {
    id: 1,
    date: "2026.02.20 14:30:00",
    status: "결제완료",
    product: "마수동",
    subscriptionType: "연간 구독",
    method: "신한카드 0000-xxxx-xxxx-1234",
    amount: 594000,
    reason: "-",
    detail: {
      monthlyPrice: 50000,
      months: 12,
      regularPrice: 600000,
      discount: 60000,
      subtotal: 540000,
      vat: 54000,
      finalPrice: 594000,
    },
  },
  {
    id: 2,
    date: "2026.02.20 14:30:00",
    status: "결제완료",
    product: "간편가입",
    subscriptionType: "월간 구독",
    method: "신한카드 0000-xxxx-xxxx-1234",
    amount: 33000,
    reason: "-",
    detail: {
      monthlyPrice: 30000,
      months: 1,
      regularPrice: 30000,
      discount: 0,
      subtotal: 30000,
      vat: 3000,
      finalPrice: 33000,
    },
  },
  {
    id: 3,
    date: "2026.01.15 10:00:00",
    status: "결제취소",
    product: "SNS연동 무제한 채팅상담",
    subscriptionType: "연간 구독",
    method: "신한카드 0000-xxxx-xxxx-5678",
    amount: 106920,
    reason: "구독해지(전액환불)",
    detail: {
      monthlyPrice: 9000,
      months: 12,
      regularPrice: 108000,
      discount: 10800,
      subtotal: 97200,
      vat: 9720,
      finalPrice: 106920,
    },
  },
  {
    id: 4,
    date: "2026.01.10 09:15:00",
    status: "결제실패",
    product: "마수동",
    subscriptionType: "월간 구독",
    method: "신한카드 0000-xxxx-xxxx-1234",
    amount: 55000,
    reason: "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
    detail: {
      monthlyPrice: 50000,
      months: 1,
      regularPrice: 50000,
      discount: 0,
      subtotal: 50000,
      vat: 5000,
      finalPrice: 55000,
    },
  },
]

export default function PaymentHistoryPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [detailOpen, setDetailOpen] = useState(false)
  const [selectedDetail, setSelectedDetail] = useState<(typeof mockPayments)[0] | null>(null)
  const [receiptOpen, setReceiptOpen] = useState(false)
  const [selectedReceipt, setSelectedReceipt] = useState<(typeof mockPayments)[0] | null>(null)

  const getStatusBadge = (status: string) => {
    if (status === "결제완료") return <Badge variant="default">{status}</Badge>
    if (status === "결제취소") return <Badge variant="secondary">{status}</Badge>
    if (status === "결제실패") return <Badge variant="destructive">{status}</Badge>
    return <Badge>{status}</Badge>
  }

  const filtered = mockPayments.filter((p) => {
    if (selectedTab === "all") return true
    return p.status === selectedTab
  })

  const countByStatus = (status: string) => mockPayments.filter((p) => p.status === status).length

  const handleExcelDownload = () => {
    alert("엑셀 다운로드가 실행됩니다.")
  }

  return (
    <>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">결제내역</h1>
            <p className="text-sm text-muted-foreground mt-1">결제 및 환불 내역을 조회하고 영수증을 확인할 수 있습니다.</p>
          </div>
          <Button variant="outline" onClick={handleExcelDownload}>
            <Download className="h-4 w-4 mr-2" />
            엑셀 다운로드
          </Button>
        </div>

        <Card className="p-6 space-y-6">
          {/* 필터 */}
          <div className="flex flex-wrap gap-3 items-center">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP", { locale: ko }) : "시작일"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startDate} onSelect={setStartDate} />
              </PopoverContent>
            </Popover>

            <span>~</span>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="bg-transparent">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? format(endDate, "PPP", { locale: ko }) : "종료일"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={endDate} onSelect={setEndDate} />
              </PopoverContent>
            </Popover>

            <div className="flex gap-1">
              <Button variant="outline" size="sm">전일</Button>
              <Button variant="outline" size="sm">일주일</Button>
              <Button variant="outline" size="sm">한달</Button>
            </div>

            <Button>
              <Search className="h-4 w-4 mr-2" />
              검색
            </Button>
          </div>

          {/* 탭 */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList>
              <TabsTrigger value="all">전체({mockPayments.length})</TabsTrigger>
              <TabsTrigger value="결제완료">결제완료({countByStatus("결제완료")})</TabsTrigger>
              <TabsTrigger value="결제취소">결제취소({countByStatus("결제취소")})</TabsTrigger>
              <TabsTrigger value="결제실패">결제실패({countByStatus("결제실패")})</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* 테이블 */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>결제일시</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>구독상품</TableHead>
                <TableHead>구독유형</TableHead>
                <TableHead>결제수단</TableHead>
                <TableHead>결제금액</TableHead>
                <TableHead>사유</TableHead>
                <TableHead>영수증</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    결제내역이 없습니다.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell className="text-sm">{payment.date}</TableCell>
                    <TableCell>{getStatusBadge(payment.status)}</TableCell>
                    <TableCell className="font-medium">{payment.product}</TableCell>
                    <TableCell>{payment.subscriptionType}</TableCell>
                    <TableCell className="text-sm">{payment.method}</TableCell>
                    <TableCell>
                      <Button
                        variant="link"
                        className="p-0 h-auto font-medium"
                        onClick={() => {
                          setSelectedDetail(payment)
                          setDetailOpen(true)
                        }}
                      >
                        {payment.amount.toLocaleString()}원
                        <span className="text-xs ml-1 text-muted-foreground">[상세]</span>
                      </Button>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground max-w-[200px]">
                      {payment.reason}
                    </TableCell>
                    <TableCell>
                      {payment.status === "결제완료" ? (
                        <Button
                          variant="link"
                          className="p-0 h-auto"
                          onClick={() => {
                            setSelectedReceipt(payment)
                            setReceiptOpen(true)
                          }}
                        >
                          [보기]
                        </Button>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>

      {/* 결제금액 상세 팝업 */}
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>결제금액 상세</DialogTitle>
          </DialogHeader>
          {selectedDetail && (
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">월 정가</span>
                <span>{selectedDetail.detail.monthlyPrice.toLocaleString()}원</span>
              </div>
              {selectedDetail.detail.months > 1 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">이용기간</span>
                  <span>x {selectedDetail.detail.months}개월</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">정가 금액</span>
                <span>{selectedDetail.detail.regularPrice.toLocaleString()}원</span>
              </div>
              {selectedDetail.detail.discount > 0 && (
                <div className="flex justify-between text-destructive">
                  <span>할인 금액 (10%)</span>
                  <span>-{selectedDetail.detail.discount.toLocaleString()}원</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">공급가액</span>
                <span>{selectedDetail.detail.subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">부가세 (10%)</span>
                <span>{selectedDetail.detail.vat.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                <span>최종 결제금액</span>
                <span className="text-primary">{selectedDetail.detail.finalPrice.toLocaleString()}원</span>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setDetailOpen(false)}>확인</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 영수증 팝업 */}
      {selectedReceipt && (
        <ReceiptDialog open={receiptOpen} onOpenChange={setReceiptOpen} payment={selectedReceipt} />
      )}
    </>
  )
}
