"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Download, Printer } from "lucide-react"
import { format } from "date-fns"
import { ko } from "date-fns/locale"

interface Payment {
  id: number
  date: string
  status: string
  products: string
  period: string
  method: string
  amount: number
  paymentDate: string
  requester: string
  reason: string
}

interface ReceiptDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  payment: Payment
}

export function ReceiptDialog({ open, onOpenChange, payment }: ReceiptDialogProps) {
  const handleDownloadPDF = () => {
    // PDF 다운로드 로직
    // 실제로는 PDF 생성 라이브러리(예: jsPDF, react-pdf 등)를 사용
    console.log("[v0] PDF 다운로드 시작")

    // 임시로 브라우저 프린트 다이얼로그 열기
    window.print()
  }

  const handlePrint = () => {
    window.print()
  }

  // 부가세 계산 (10%)
  const vat = Math.round(payment.amount / 11)
  const supplyPrice = payment.amount - vat

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto print:shadow-none">
        <DialogHeader className="print:hidden">
          <DialogTitle>결제 영수증</DialogTitle>
        </DialogHeader>

        {/* 영수증 내용 */}
        <div id="receipt-content" className="space-y-6 p-6 bg-white">
          {/* 헤더 */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold">결제 영수증</h1>
            <p className="text-sm text-muted-foreground">Receipt</p>
          </div>

          <Separator />

          {/* 사업자 정보 */}
          <div className="space-y-2">
            <h2 className="font-semibold text-lg">헤이데어</h2>
            <div className="text-sm space-y-1 text-muted-foreground">
              <p>사업자등록번호: 123-45-67890</p>
              <p>대표자: 홍길동</p>
              <p>주소: 서울특별시 강남구 테헤란로 123</p>
              <p>전화: 02-1234-5678</p>
            </div>
          </div>

          <Separator />

          {/* 결제 정보 */}
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-muted-foreground">영수증 번호</div>
              <div className="font-medium">#{payment.id.toString().padStart(8, "0")}</div>

              <div className="text-muted-foreground">결제일시</div>
              <div className="font-medium">{payment.paymentDate}</div>

              <div className="text-muted-foreground">신청자</div>
              <div className="font-medium">{payment.requester}</div>

              <div className="text-muted-foreground">결제수단</div>
              <div className="font-medium">{payment.method}</div>
            </div>
          </div>

          <Separator />

          {/* 상품 정보 */}
          <div className="space-y-3">
            <h3 className="font-semibold">결제 상품</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{payment.products}</span>
                <span className="font-medium">{payment.amount.toLocaleString()}원</span>
              </div>
              <div className="text-xs text-muted-foreground">이용기간: {payment.period}</div>
            </div>
          </div>

          <Separator />

          {/* 금액 정보 */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">공급가액</span>
              <span>{supplyPrice.toLocaleString()}원</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">부가세 (10%)</span>
              <span>{vat.toLocaleString()}원</span>
            </div>
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>합계</span>
              <span className="text-primary">{payment.amount.toLocaleString()}원</span>
            </div>
          </div>

          <Separator />

          {/* 안내사항 */}
          <div className="space-y-2 text-xs text-muted-foreground">
            <p>• 본 영수증은 전자문서로 발행되었습니다.</p>
            <p>• 영수증 관련 문의사항은 고객센터(02-1234-5678)로 연락주시기 바랍니다.</p>
            <p>• 발행일: {format(new Date(), "PPP", { locale: ko })}</p>
          </div>
        </div>

        {/* 하단 버튼 */}
        <div className="flex gap-2 print:hidden">
          <Button onClick={handlePrint} variant="outline" className="flex-1 bg-transparent">
            <Printer className="h-4 w-4 mr-2" />
            인쇄
          </Button>
          <Button onClick={handleDownloadPDF} className="flex-1">
            <Download className="h-4 w-4 mr-2" />
            PDF 다운로드
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
