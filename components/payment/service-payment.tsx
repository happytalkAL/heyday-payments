"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CreditCard, AlertCircle, ChevronRight, ChevronLeft, Check, Upload, FileText, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const products = [
  {
    id: "masudong",
    name: "마수동",
    description: "마케팅 수신동의 자동 전환 메시지 팝업 노출",
    monthlyPrice: 50000,
    yearlyPrice: 540000,
    isFreeTrialing: true,
    freeTrialEnd: "2026.04.01",
  },
  {
    id: "simple-join",
    name: "간편가입",
    description: "카카오/네이버 간편가입 제공",
    monthlyPrice: 30000,
    yearlyPrice: 324000,
    isFreeTrialing: false,
    freeTrialEnd: "",
  },
  {
    id: "chat",
    name: "SNS연동 무제한 채팅상담",
    description: "카카오/네이버 채팅상담 무제한 제공",
    monthlyPrice: 9000,
    yearlyPrice: 97200,
    isFreeTrialing: false,
    freeTrialEnd: "",
  },
]

type Step = 1 | 2
type PaymentMethod = "existing" | "new"

export function ServicePayment() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [selectedPeriod, setSelectedPeriod] = useState("monthly")
  const [agreedToCancel, setAgreedToCancel] = useState(false)

  // 사업자 정보 등록 상태 (개발자 모드)
  const [hasBusinessInfo, setHasBusinessInfo] = useState(true)

  // 사업자명/사업자등록증 인라인 입력 (hasBusinessInfo === false일 때 사용)
  const [businessNameInput, setBusinessNameInput] = useState("")
  const [businessLicenseFile, setBusinessLicenseFile] = useState<File | null>(null)

  // 카드 등록 상태 (개발자 모드)
  const [hasRegisteredCard, setHasRegisteredCard] = useState(true)
  const [registeredCard] = useState({
    brand: "신한카드",
    number: "0000-xxxx-xxxx-1234",
  })

  // Step 2 결제 방식 선택
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("existing")

  const toggleProduct = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const price = useMemo(() => {
    const selected = products.filter((p) => selectedProducts.includes(p.id))
    const isYearly = selectedPeriod === "yearly"
    const monthlyTotal = selected.reduce((sum, p) => sum + p.monthlyPrice, 0)

    let regularPrice: number
    let discount: number

    if (isYearly) {
      const fullYearPrice = monthlyTotal * 12
      const yearlyTotal = selected.reduce((sum, p) => sum + p.yearlyPrice, 0)
      regularPrice = fullYearPrice
      discount = fullYearPrice - yearlyTotal
    } else {
      regularPrice = monthlyTotal
      discount = 0
    }

    const subtotal = regularPrice - discount
    const vat = Math.round(subtotal * 0.1)
    const finalPrice = subtotal + vat

    return { monthlyTotal, months: isYearly ? 12 : 1, regularPrice, discount, subtotal, vat, finalPrice }
  }, [selectedProducts, selectedPeriod])

  const handlePayExisting = () => {
    // 기존카드 결제: 바로 결제 처리 -> 구독현황 이동
    router.push("/payment/subscription")
    setTimeout(() => {
      alert("결제가 완료되었습니다.")
    }, 300)
  }

  const handlePayNew = () => {
    // 신규카드 결제: 토스 카드등록 화면 노출 시뮬레이션 -> 등록 완료 시 바로 결제 -> 구독현황 이동
    const confirmed = window.confirm(
      "[토스페이먼츠 카드 등록]\n\n새로운 카드를 등록하시겠습니까?\n\n(실제 환경에서는 토스페이먼츠 카드등록 화면이 표시됩니다)\n\n확인을 누르면 카드 등록 및 결제가 동시에 진행됩니다."
    )
    if (confirmed) {
      router.push("/payment/subscription")
      setTimeout(() => {
        alert("결제가 완료되었습니다.")
      }, 300)
    }
  }

  // 사업자등록증 파일 업로드 핸들러
  const handleBusinessLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        alert("JPG, PNG, PDF 파일만 업로드 가능합니다.")
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.")
        return
      }
      setBusinessLicenseFile(file)
    }
  }

  const handleBusinessLicenseRemove = () => {
    setBusinessLicenseFile(null)
  }

  const canProceedStep1 =
    selectedProducts.length > 0 &&
    (hasBusinessInfo || (businessNameInput.trim() !== "" && businessLicenseFile !== null))

  const steps = [
    { num: 1, label: "서비스 / 결제수단 선택" },
    { num: 2, label: "카드 선택 / 결제" },
  ]

  return (
    <div className="space-y-6">
      {/* 개발자 모드 */}
      <div className="rounded-lg border-2 border-dashed border-amber-400 bg-amber-50 p-3 space-y-2">
        <p className="text-xs font-semibold text-amber-700">개발자 모드: 상태 전환</p>
        <div className="flex flex-wrap gap-3">
          <label className="flex items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={hasBusinessInfo}
              onChange={(e) => setHasBusinessInfo(e.target.checked)}
              className="rounded"
            />
            사업자 정보 등록됨
          </label>
          <label className="flex items-center gap-1.5 text-xs">
            <input
              type="checkbox"
              checked={hasRegisteredCard}
              onChange={(e) => setHasRegisteredCard(e.target.checked)}
              className="rounded"
            />
            카드 등록됨
          </label>
        </div>
      </div>

      {/* 스텝 인디케이터 */}
      <div className="flex items-center gap-4">
        {steps.map((step, idx) => (
          <div key={step.num} className="flex items-center flex-1">
            <div className="flex items-center gap-2.5">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold flex-shrink-0 transition-colors ${
                  currentStep === step.num
                    ? "bg-foreground text-background"
                    : currentStep > step.num
                    ? "bg-foreground/80 text-background"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep > step.num ? <Check className="h-4 w-4" /> : step.num}
              </div>
              <span
                className={`text-sm whitespace-nowrap ${
                  currentStep === step.num ? "font-semibold text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.label}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <div className={`h-px flex-1 mx-4 ${currentStep > step.num ? "bg-foreground/30" : "bg-muted"}`} />
            )}
          </div>
        ))}
      </div>

      {/* ==================== Step 1: 서비스 / 결제수단 선택 ==================== */}
      {currentStep === 1 && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* 사업자 정보 미등록 시 인라인 입력 */}
            {!hasBusinessInfo && (
              <div className="space-y-4">
                <Alert className="border-amber-500 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-sm text-amber-800">
                    사업자명(법인명)과 사업자등록증이 등록되지 않았습니다. 서비스 신청을 위해 아래 정보를 입력해주세요.
                  </AlertDescription>
                </Alert>

                {/* 사업자명 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="businessNameInput" className="text-sm font-medium">
                    사업자명(법인명) <span className="text-destructive">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="businessNameInput"
                      value={businessNameInput}
                      onChange={(e) => setBusinessNameInput(e.target.value)}
                      placeholder="사업자명을 입력해 주세요."
                      maxLength={50}
                      className="pr-16"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                      {businessNameInput.length}/50
                    </span>
                  </div>
                </div>

                {/* 사업자등록증 파일 업로드 */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    사업자등록증 <span className="text-destructive">*</span>
                  </Label>

                  {!businessLicenseFile ? (
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="businessLicenseUpload"
                        className="hidden"
                        accept="image/jpeg,image/jpg,image/png,application/pdf"
                        onChange={handleBusinessLicenseUpload}
                      />
                      <label htmlFor="businessLicenseUpload" className="cursor-pointer flex flex-col items-center gap-2">
                        <Upload className="h-8 w-8 text-muted-foreground" />
                        <div className="space-y-1">
                          <p className="text-sm font-medium">파일을 업로드하세요</p>
                          <p className="text-xs text-muted-foreground">JPG, PNG, PDF (최대 10MB)</p>
                        </div>
                        <Button type="button" variant="outline" size="sm" className="mt-1 bg-transparent">
                          파일 선택
                        </Button>
                      </label>
                    </div>
                  ) : (
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">{businessLicenseFile.name}</p>
                            <p className="text-xs text-muted-foreground">{(businessLicenseFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <Button type="button" variant="ghost" size="sm" onClick={handleBusinessLicenseRemove} className="h-8 w-8 p-0">
                          <X className="h-4 w-4" />
                          <span className="sr-only">파일 삭제</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>

                <Separator />
              </div>
            )}

            {/* 서비스 선택 */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">서비스 선택</Label>
              <div className="space-y-2">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className={`flex items-center justify-between rounded-lg border p-4 cursor-pointer transition-colors ${
                      selectedProducts.includes(product.id) ? "border-primary bg-primary/5" : "hover:bg-muted/50"
                    }`}
                    onClick={() => toggleProduct(product.id)}
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        checked={selectedProducts.includes(product.id)}
                        onCheckedChange={() => toggleProduct(product.id)}
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{product.name}</p>
                          {product.isFreeTrialing && (
                            <Badge className="bg-green-100 text-green-800 border-green-200 text-[10px] px-1.5 py-0">
                              무료 이용 중
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{product.description}</p>
                        {product.isFreeTrialing && (
                          <p className="text-xs text-green-700 mt-1">
                            무료 이용 기간: ~{product.freeTrialEnd} | 구독 시 무료 종료 후 결제 시작
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right text-sm">
                      <p className="font-medium">{product.monthlyPrice.toLocaleString()}원/월</p>
                      <p className="text-muted-foreground">
                        {product.yearlyPrice.toLocaleString()}원/년{" "}
                        <span className="text-primary">(10% 할인)</span>
                      </p>
                      <p className="text-xs text-muted-foreground">VAT별도</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* 이용기간 선택 */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">이용기간 선택</Label>
              <RadioGroup value={selectedPeriod} onValueChange={setSelectedPeriod}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="font-normal cursor-pointer">
                    월간 구독 (매월 자동결제)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="yearly" id="yearly" />
                  <Label htmlFor="yearly" className="font-normal cursor-pointer">
                    연간 구독 (매년 자동결제)
                    <span className="ml-2 text-sm text-primary">(정가 대비 10% 할인)</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Separator />

            {/* 결제수단 선택 */}
            <div className="space-y-3">
              <Label className="text-base font-semibold">결제수단</Label>
              <div className="flex items-center gap-3 rounded-lg border border-primary bg-primary/5 p-4">
                <CreditCard className="h-5 w-5 text-primary" />
                <span className="font-medium">카드결제</span>
                <Badge variant="secondary" className="text-xs">추후 계좌이체 추가 예정</Badge>
              </div>
            </div>

            <Separator />

            {/* 결제 금액 미리보기 */}
            {selectedProducts.length > 0 && (
              <div className="rounded-lg border bg-muted/30 p-4 space-y-1.5 text-sm">
                <h4 className="font-semibold mb-2">
                  결제 금액 ({selectedPeriod === "monthly" ? "월간 구독" : "연간 구독"})
                </h4>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">월 정가 합계</span>
                  <span>
                    {products
                      .filter((p) => selectedProducts.includes(p.id))
                      .map((p) => p.monthlyPrice.toLocaleString())
                      .join(" + ")}{" "}
                    = {price.monthlyTotal.toLocaleString()}원
                  </span>
                </div>

                {selectedPeriod === "monthly" ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">부가세 (10%)</span>
                      <span>{price.vat.toLocaleString()}원</span>
                    </div>
                    <Separator className="my-1" />
                    <div className="flex justify-between font-semibold text-base pt-1">
                      <span>최종 결제금액</span>
                      <span className="text-primary text-lg">{price.finalPrice.toLocaleString()}원</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">이용기간</span>
                      <span>x 12개월 (연간 구독)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">정가 금액</span>
                      <span>{price.regularPrice.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-destructive">
                      <span>할인 금액 (10%)</span>
                      <span>-{price.discount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">공급가액</span>
                      <span>{price.subtotal.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">부가세 (10%)</span>
                      <span>{price.vat.toLocaleString()}원</span>
                    </div>
                    <Separator className="my-1" />
                    <div className="flex justify-between font-semibold text-base pt-1">
                      <span>최종 결제금액</span>
                      <span className="text-primary text-lg">{price.finalPrice.toLocaleString()}원</span>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* 구독 시작일 안내 */}
            {selectedProducts.length > 0 && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 space-y-2 text-sm">
                <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  구독 시작일 안내
                </h4>
                <ul className="space-y-1 text-blue-800 ml-6">
                  {products
                    .filter((p) => selectedProducts.includes(p.id))
                    .map((p) => (
                      <li key={p.id}>
                        {"- "}
                        <strong>{p.name}</strong>:{" "}
                        {p.isFreeTrialing
                          ? `무료 이용 종료일(${p.freeTrialEnd}) 다음날부터 구독 시작 및 첫 결제`
                          : "결제 완료 즉시 구독 시작"}
                      </li>
                    ))}
                </ul>
              </div>
            )}

            {/* 구독 해지 안내 동의 */}
            <div className="rounded-lg bg-muted p-4 space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <h4 className="font-semibold">구독 해지 안내</h4>
              </div>
              <ul className="space-y-1 text-muted-foreground ml-6">
                <li>{"- "}구독을 해지하면 다음 결제일부터 자동결제가 중단됩니다.</li>
                <li>{"- "}현재 구독 기간까지는 정상적으로 이용 가능합니다.</li>
                <li>{"- "}<strong className="text-foreground">결제 당일에는 전액 환불이 가능</strong>합니다. 결제 당일이 아닌 경우 부분 환불은 불가하며, 현재 구독 기간 종료 시 자동으로 해지됩니다.</li>
              </ul>
              <div className="flex items-center space-x-2 pt-2 ml-6">
                <input
                  type="checkbox"
                  id="agree-cancel"
                  checked={agreedToCancel}
                  onChange={(e) => setAgreedToCancel(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <Label htmlFor="agree-cancel" className="font-normal cursor-pointer">
                  위 구독 해지 안내를 확인하였습니다.
                </Label>
              </div>
            </div>

            {/* 다음 버튼 */}
            <Button
              className="w-full"
              size="lg"
              disabled={!canProceedStep1 || !agreedToCancel}
              onClick={() => {
                setPaymentMethod(hasRegisteredCard ? "existing" : "new")
                setCurrentStep(2)
              }}
            >
              다음
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* ==================== Step 2: 카드 선택 / 결제 ==================== */}
      {currentStep === 2 && (
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* 신청 요약 */}
            <div className="rounded-lg border bg-muted/30 p-4 space-y-3">
              <h4 className="text-sm font-semibold text-muted-foreground">신청 내역</h4>
              <div className="flex flex-wrap gap-2">
                {products
                  .filter((p) => selectedProducts.includes(p.id))
                  .map((p) => (
                    <Badge key={p.id} variant="secondary" className="text-sm py-1 px-3">
                      {p.name}
                    </Badge>
                  ))}
              </div>
              {!hasBusinessInfo && businessNameInput.trim() !== "" && (
                <>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">사업자명(법인명)</span>
                    <span className="font-medium">{businessNameInput}</span>
                  </div>
                  {businessLicenseFile && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">사업자등록증</span>
                      <span className="font-medium flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5" />
                        {businessLicenseFile.name}
                      </span>
                    </div>
                  )}
                  <Separator />
                </>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">구독 유형</span>
                <span className="font-medium">{selectedPeriod === "monthly" ? "월간 구독" : "연간 구독"}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">결제 금액</span>
                <span className="text-lg font-bold text-primary">{price.finalPrice.toLocaleString()}원</span>
              </div>
            </div>

            <Separator />

            {/* 결제 카드 선택 */}
            <div className="space-y-2">
              <h3 className="text-base font-semibold">결제 카드 선택</h3>
              <p className="text-sm text-muted-foreground">결제에 사용할 카드를 선택해주세요.</p>
            </div>

            <div className="space-y-3">
              {/* 등록된 카드 선택 버튼 */}
              {hasRegisteredCard && (
                <button
                  type="button"
                  onClick={() => setPaymentMethod("existing")}
                  className={`w-full flex items-center gap-4 rounded-lg border-2 p-5 text-left transition-all ${
                    paymentMethod === "existing"
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-muted-foreground/30"
                  }`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${
                    paymentMethod === "existing" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}>
                    <CreditCard className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{registeredCard.brand}</p>
                    <p className="text-sm text-muted-foreground">{registeredCard.number}</p>
                  </div>
                  {paymentMethod === "existing" && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                  )}
                </button>
              )}

              {/* 신규 카드로 결제 선택 버튼 */}
              <button
                type="button"
                onClick={() => setPaymentMethod("new")}
                className={`w-full flex items-center gap-4 rounded-lg border-2 border-dashed p-5 text-left transition-all ${
                  paymentMethod === "new"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-muted-foreground/30"
                }`}
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-full flex-shrink-0 ${
                  paymentMethod === "new" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}>
                  <span className="text-lg font-light">+</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold">신규 카드로 결제</p>
                  <p className="text-sm text-muted-foreground">
                    새로운 카드를 등록하고 바로 결제합니다.
                  </p>
                </div>
                {paymentMethod === "new" && (
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground flex-shrink-0">
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </button>
            </div>

            {/* 신규카드 결제 시 안내 */}
            {paymentMethod === "new" && (
              <div className="flex items-start gap-2.5 rounded-lg bg-blue-50 border border-blue-200 p-4">
                <AlertCircle className="h-4 w-4 mt-0.5 text-blue-600 flex-shrink-0" />
                <p className="text-sm text-blue-700">
                  결제하기를 누르면 토스페이먼츠 카드 등록 화면이 표시됩니다. 카드 등록이 완료되면 자동으로 결제가 진행됩니다.
                </p>
              </div>
            )}

            {/* 신규카드 선택 + 기존 카드 있을 때 안내 */}
            {paymentMethod === "new" && hasRegisteredCard && (
              <div className="flex items-start gap-2.5 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <AlertCircle className="h-4 w-4 mt-0.5 text-amber-600 flex-shrink-0" />
                <p className="text-sm text-amber-700">
                  신규 카드로 결제하면 현재 이용 중인 다른 구독 서비스의 다음 자동결제 수단도 새로 등록된 카드로 변경됩니다.
                </p>
              </div>
            )}

            {/* 하단 버튼 */}
            <div className="flex gap-3 pt-2">
              <Button variant="outline" className="flex-1" size="lg" onClick={() => setCurrentStep(1)}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                이전
              </Button>
              <Button
                className="flex-1"
                size="lg"
                onClick={paymentMethod === "existing" ? handlePayExisting : handlePayNew}
              >
                결제하기 ({price.finalPrice.toLocaleString()}원)
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
