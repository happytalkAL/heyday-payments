"use client"

import { useState } from "react"
import { Printer, Download, ChevronRight, CreditCard, Calendar, RotateCcw, CheckCircle2, AlertCircle, Info, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PaymentManualPage() {
  const [isPrinting, setIsPrinting] = useState(false)

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 인쇄 시 숨길 상단 툴바 */}
      <div className="print:hidden sticky top-0 z-10 bg-white border-b px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="font-semibold text-gray-800">헤이데어</span>
          <ChevronRight className="h-4 w-4" />
          <span>메뉴얼 가이드</span>
          <ChevronRight className="h-4 w-4" />
          <span className="text-blue-600 font-medium">결제 서비스</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
            <Printer className="h-4 w-4" />
            인쇄 / PDF 저장
          </Button>
        </div>
      </div>

      {/* 본문 */}
      <div className="max-w-4xl mx-auto px-8 py-10 bg-white my-6 rounded-xl shadow-sm print:shadow-none print:my-0 print:rounded-none print:max-w-full">

        {/* 헤더 */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-3 print:hidden">
            <span>결제 서비스 메뉴얼</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-3">결제 서비스</h1>
          <p className="text-base text-gray-500 leading-relaxed">
            헤이데어의 유료 서비스를 월간 또는 연간 구독 방식으로 직접 신청하고 관리할 수 있어요.
          </p>
        </div>

        {/* 개요 callout */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-10 flex gap-3">
          <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-900 space-y-1.5 leading-relaxed">
            <p className="font-semibold text-blue-800 text-base">결제 서비스란?</p>
            <p>
              헤이데어가 제공하는 <strong>유료 서비스를 고객이 직접 구독 신청·결제·관리</strong>할 수 있는 셀프 결제 시스템이에요.
            </p>
            <p>
              월간 또는 연간 구독을 선택할 수 있으며, 구독 현황 확인부터 결제 내역 조회까지 한 곳에서 관리할 수 있어요.
            </p>
          </div>
        </div>

        {/* 메뉴 구성 소개 */}
        <div className="mb-10">
          <p className="text-sm text-gray-500 mb-4">결제 서비스는 아래 4개의 메뉴로 구성되어 있어요.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { icon: "📊", title: "사용현황", desc: "잔여 이용량 확인" },
              { icon: "👑", title: "구독현황", desc: "구독 상태 및 관리" },
              { icon: "🛒", title: "서비스 신청", desc: "신규 구독 신청" },
              { icon: "📄", title: "결제내역", desc: "결제 및 환불 내역" },
            ].map((item) => (
              <div key={item.title} className="border rounded-lg p-4 text-center space-y-1 bg-gray-50">
                <div className="text-2xl">{item.icon}</div>
                <p className="font-semibold text-sm text-gray-800">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        {/* 1. 사용현황 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">1</span>
            사용현황
          </h2>
          <p className="text-sm text-gray-500 mb-5">구독 중인 서비스의 잔여 이용량을 한눈에 확인할 수 있어요.</p>

          {/* 목업 이미지 영역 */}
          <div className="border rounded-xl overflow-hidden mb-5 bg-gray-50">
            <div className="bg-white border-b px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-400">사용현황 화면</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-bold text-gray-800 text-sm">사용현황</h3>
                <span className="text-xs text-gray-400">2026.03 기준</span>
              </div>
              {[
                { name: "SNS연동 무제한 채팅상담", used: 320, total: 999, unit: "건", unlimited: true },
                { name: "마수동", used: 45, total: 100, unit: "건", unlimited: false },
              ].map((svc) => (
                <div key={svc.name} className="bg-gray-50 rounded-lg p-4 border">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">{svc.name}</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">구독중</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: svc.unlimited ? "32%" : `${(svc.used / svc.total) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>사용량: {svc.used}{svc.unit}</span>
                    <span>{svc.unlimited ? "무제한" : `총 ${svc.total}${svc.unit}`}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ul className="space-y-2 text-sm text-gray-700 pl-1">
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>구독 중인 서비스별 이용량과 잔여량을 확인할 수 있어요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>무제한 서비스는 사용량만 표시되며 한도가 적용되지 않아요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>이용량은 당월 기준으로 집계돼요.</span></li>
          </ul>
        </section>

        <hr className="my-10 border-gray-200" />

        {/* 2. 구독현황 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">2</span>
            구독현황
          </h2>
          <p className="text-sm text-gray-500 mb-5">현재 이용 중인 서비스의 구독 상태를 확인하고 관리할 수 있어요.</p>

          {/* 상태 배지 설명 */}
          <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
            {[
              { label: "구독중", color: "bg-blue-100 text-blue-700", desc: "유료 구독 이용 중" },
              { label: "해지예정", color: "bg-amber-100 text-amber-700", desc: "구독 기간 후 해지" },
              { label: "무료이용중", color: "bg-green-100 text-green-700", desc: "무료이용권 사용 중" },
              { label: "구독 없음", color: "bg-gray-100 text-gray-600", desc: "미가입 상태" },
            ].map((s) => (
              <div key={s.label} className="border rounded-lg p-3 space-y-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${s.color}`}>{s.label}</span>
                <p className="text-xs text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* 목업 */}
          <div className="border rounded-xl overflow-hidden mb-5 bg-gray-50">
            <div className="bg-white border-b px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-400">구독현황 화면</span>
            </div>
            <div className="p-6 space-y-4">
              {/* 구독중 카드 */}
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">SNS연동 무제한 채팅상담</span>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-medium">구독중</span>
                  </div>
                  <span className="text-xs text-gray-400">연간 구독</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <span className="text-gray-500">구독 시작일</span><span className="font-medium text-right">2026.01.20</span>
                  <span className="text-gray-500">다음 결제일</span><span className="font-medium text-right">2027.01.20</span>
                  <span className="text-gray-500">결제 금액</span><span className="font-medium text-right">월 55,000원(VAT포함)</span>
                </div>
                <div className="flex justify-end">
                  <button className="text-xs text-gray-400 hover:text-gray-600">구독 해지</button>
                </div>
              </div>
              {/* 무료이용중 카드 */}
              <div className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-800">마수동</span>
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">무료이용중</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm mb-4">
                  <span className="text-gray-500">무료이용 기간</span><span className="font-medium text-right">2026.02.01 ~ 2026.04.01</span>
                  <span className="text-gray-500">남은 기간</span><span className="font-medium text-right text-green-600">40일</span>
                </div>
              </div>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-gray-700 pl-1">
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>구독 중인 서비스의 시작일, 다음 결제일, 결제 금액을 확인할 수 있어요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span><strong>구독 해지</strong>를 누르면 다음 결제일부터 자동결제가 중단되며, 현재 구독 기간까지는 정상 이용할 수 있어요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>결제 당일 해지 시 전액 환불이 가능하며, 그 외에는 환불이 불가해요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>무료이용권이 있는 경우 무료 기간 종료 후 자동으로 유료 구독이 시작돼요.</span></li>
          </ul>
        </section>

        <hr className="my-10 border-gray-200" />

        {/* 3. 서비스 신청 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">3</span>
            서비스 신청
          </h2>
          <p className="text-sm text-gray-500 mb-5">원하는 유료 서비스를 선택하고 구독을 신청할 수 있어요. 총 2단계로 구성돼요.</p>

          {/* Step 흐름 */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">
              <span>Step 1</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">서비스 선택 + 결제수단 선택 + 약관 동의</div>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg">
              <span>Step 2</span>
            </div>
            <div className="text-sm text-gray-600 font-medium">신청 내역 확인 + 최종 결제</div>
          </div>

          {/* Step 1 */}
          <div className="border rounded-xl overflow-hidden mb-6">
            <div className="bg-blue-600 px-5 py-3">
              <span className="text-white font-semibold text-sm">Step 1 · 서비스 선택 및 결제 설정</span>
            </div>
            <div className="p-5 bg-white space-y-5">
              {/* 사업자 정보 미등록 안내 */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
                <div className="flex gap-2 items-start">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-amber-800 space-y-1">
                    <p className="font-semibold">사업자명 미등록 고객의 경우</p>
                    <p>사업자명(법인명)과 사업자등록증이 등록되지 않은 경우, 서비스 신청 전에 아래 정보를 입력해야 해요.</p>
                    <ul className="pl-3 space-y-0.5 mt-1">
                      <li>- 사업자명(법인명) 입력</li>
                      <li>- 사업자등록증 파일 첨부 (JPG, PNG, PDF / 최대 10MB)</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-sm text-gray-700">서비스 선택</p>
                <div className="space-y-2">
                  {["SNS연동 무제한 채팅상담", "마수동"].map((svc, i) => (
                    <div key={svc} className={`border rounded-lg p-3 flex items-center gap-3 ${i === 0 ? "border-blue-500 bg-blue-50" : ""}`}>
                      <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${i === 0 ? "border-blue-500 bg-blue-500" : "border-gray-300"}`} />
                      <span className="text-sm font-medium">{svc}</span>
                      {i === 0 && <span className="ml-auto text-xs text-blue-600 font-medium">선택됨</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-sm text-gray-700">구독 유형 선택</p>
                <div className="flex gap-3">
                  {["월간 구독", "연간 구독"].map((t, i) => (
                    <div key={t} className={`flex-1 border rounded-lg p-3 text-center text-sm font-medium ${i === 1 ? "border-blue-500 bg-blue-50 text-blue-700" : "text-gray-600"}`}>
                      {t}
                      {i === 1 && <span className="block text-xs text-blue-500 mt-0.5">2개월 할인</span>}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-sm text-gray-700">결제수단</p>
                <div className="border rounded-lg p-3 flex items-center gap-3">
                  <CreditCard className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">신한카드 ****-****-****-1234</span>
                  <span className="ml-auto text-xs text-gray-400">등록된 카드</span>
                </div>
              </div>

              <div className="bg-gray-50 border rounded-lg p-4 space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded">필수</span>
                  <span className="font-semibold">유료서비스 이용 및 결제약관 동의</span>
                </div>
                <p className="text-blue-600 underline text-xs pl-1 cursor-pointer">약관 전문 보기</p>
                <div className="flex items-center gap-2 pl-1">
                  <div className="w-4 h-4 border-2 border-blue-500 rounded bg-blue-500 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-gray-700">위 약관에 동의합니다.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="border rounded-xl overflow-hidden mb-6">
            <div className="bg-gray-700 px-5 py-3">
              <span className="text-white font-semibold text-sm">Step 2 · 신청 내역 확인 및 최종 결제</span>
            </div>
            <div className="p-5 bg-white space-y-4">
              <div className="bg-gray-50 border rounded-lg p-4 space-y-3 text-sm">
                <p className="font-semibold text-gray-700">신청 내역 요약</p>
                <div className="space-y-2 text-sm">
                  {[
                    ["신청 서비스", "SNS연동 무제한 채팅상담"],
                    ["구독 유형", "연간 구독"],
                    ["결제 금액", "연 594,000원 (VAT포함)"],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between">
                      <span className="text-gray-500">{k}</span>
                      <span className="font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="border rounded-lg p-3 flex items-center gap-3">
                <CreditCard className="h-4 w-4 text-gray-500" />
                <span className="text-sm text-gray-700">신한카드 ****-1234로 결제</span>
              </div>
              <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold text-sm">결제하기</button>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-gray-700 pl-1">
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>서비스는 복수 선택이 가능해요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>연간 구독 선택 시 2개월 요금이 할인돼요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>결제수단은 사전에 등록된 카드가 사용되며, 카드 미등록 시 카드를 먼저 등록해야 해요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>사업자명(법인명)과 사업자등록증이 미등록된 경우 Step 1에서 입력 후 진행할 수 있어요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>[필수] 유료서비스 이용 및 결제약관에 동의해야 결제가 가능해요.</span></li>
          </ul>
        </section>

        <hr className="my-10 border-gray-200" />

        {/* 4. 결제내역 */}
        <section className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 mb-1 flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">4</span>
            결제내역
          </h2>
          <p className="text-sm text-gray-500 mb-5">결제 및 환불 내역을 조회하고 영수증을 확인할 수 있어요.</p>

          {/* 목업 */}
          <div className="border rounded-xl overflow-hidden mb-5 bg-gray-50">
            <div className="bg-white border-b px-5 py-3 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-3 text-xs text-gray-400">결제내역 화면</span>
            </div>
            <div className="p-5 bg-white">
              {/* 필터 */}
              <div className="flex gap-2 mb-4 flex-wrap">
                <div className="border rounded-md px-3 py-1.5 text-xs text-gray-600 bg-white">2026.01 ~ 2026.03</div>
                <div className="border rounded-md px-3 py-1.5 text-xs bg-blue-600 text-white">전체</div>
                <div className="border rounded-md px-3 py-1.5 text-xs text-gray-600 bg-white">결제</div>
                <div className="border rounded-md px-3 py-1.5 text-xs text-gray-600 bg-white">환불</div>
              </div>
              {/* 탭 */}
              <div className="flex border-b mb-4">
                {["전체", "SNS연동 무제한 채팅상담", "마수동"].map((t, i) => (
                  <button key={t} className={`px-4 py-2 text-xs font-medium border-b-2 ${i === 0 ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"}`}>{t}</button>
                ))}
              </div>
              {/* 내역 목록 */}
              <div className="space-y-3">
                {[
                  { date: "2026.03.20", product: "SNS연동 무제한 채팅상담", type: "결제", amount: "55,000원" },
                  { date: "2026.02.20", product: "SNS연동 무제한 채팅상담", type: "결제", amount: "55,000원" },
                  { date: "2026.01.20", product: "마수동", type: "환불", amount: "-30,000원" },
                ].map((row, i) => (
                  <div key={i} className="flex items-center justify-between text-sm border-b pb-3 last:border-0">
                    <div>
                      <p className="font-medium text-gray-800">{row.product}</p>
                      <p className="text-xs text-gray-400">{row.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`text-xs px-2 py-0.5 rounded-full mr-2 ${row.type === "환불" ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"}`}>{row.type}</span>
                      <span className={`font-semibold ${row.type === "환불" ? "text-red-500" : "text-gray-800"}`}>{row.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ul className="space-y-2 text-sm text-gray-700 pl-1">
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>조회 기간과 결제/환불 유형으로 필터링할 수 있어요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>서비스별 탭을 통해 특정 서비스의 결제 내역만 확인할 수 있어요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>각 내역의 영수증을 확인하거나, 결제 당일 건에 한해 전액 환불을 신청할 수 있어요.</span></li>
            <li className="flex gap-2"><span className="text-gray-400 mt-0.5">•</span><span>엑셀 다운로드를 통해 전체 결제 내역을 파일로 저장할 수 있어요.</span></li>
          </ul>
        </section>

        <hr className="my-10 border-gray-200" />

        {/* 자주 묻는 질문 */}
        <section className="mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">자주 묻는 질문</h2>
          <div className="space-y-4">
            {[
              {
                q: "구독을 해지하면 바로 서비스가 중단되나요?",
                a: "아니요. 해지를 신청해도 현재 구독 기간이 끝날 때까지는 정상적으로 서비스를 이용할 수 있어요. 다음 결제일부터 자동결제가 중단돼요.",
              },
              {
                q: "결제 당일 실수로 결제했는데 환불 가능한가요?",
                a: "네. 결제 당일에 한해 전액 환불이 가능해요. 결제 내역에서 해당 건을 선택하고 환불 신청을 진행해 주세요.",
              },
              {
                q: "사업자명이 없으면 서비스 신청이 안 되나요?",
                a: "사업자명(법인명)과 사업자등록증은 유료서비스 결제 시 필수예요. 미등록 상태라면 서비스 신청 Step 1에서 바로 입력하고 진행할 수 있어요.",
              },
              {
                q: "무료이용권과 구독을 동시에 가지고 있으면 어떻게 되나요?",
                a: "구독 기간이 먼저 진행되고, 구독이 종료된 다음 날부터 무료이용권이 자동으로 시작돼요. 구독현황 화면에서 두 기간을 모두 확인할 수 있어요.",
              },
            ].map((faq, i) => (
              <div key={i} className="border rounded-xl p-5">
                <p className="font-semibold text-sm text-gray-800 mb-2 flex gap-2">
                  <span className="text-blue-500 font-bold">Q.</span>
                  {faq.q}
                </p>
                <p className="text-sm text-gray-600 pl-5">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 푸터 */}
        <div className="bg-gray-50 rounded-xl p-5 text-center text-sm text-gray-500 print:hidden">
          <p className="font-semibold text-gray-700 mb-1">헤이데어 고객센터</p>
          <p>서비스 이용 중 불편한 점이 있으시면 언제든지 문의해 주세요.</p>
        </div>

        <div className="hidden print:block text-center text-xs text-gray-400 mt-8 pt-4 border-t">
          헤이데어 결제 서비스 메뉴얼 | heydaer.com
        </div>
      </div>

      {/* 인쇄 스타일 */}
      <style>{`
        @media print {
          body { background: white; }
          @page { margin: 20mm; }
        }
      `}</style>
    </div>
  )
}
