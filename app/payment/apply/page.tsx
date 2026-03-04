import { ServicePayment } from "@/components/payment/service-payment"

export default function ApplyPage() {
  return (
    <div className="container mx-auto p-6 max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold">서비스 신청</h1>
        <p className="text-sm text-muted-foreground mt-1">원하시는 서비스 상품을 선택하고 결제를 진행해주세요.</p>
      </div>

      <ServicePayment />
    </div>
  )
}
