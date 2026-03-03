"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Upload, FileText, X, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CompanyInfoPage() {
  const [companyName, setCompanyName] = useState("블름사업개발팀")
  const [representativeName, setRepresentativeName] = useState("헤이데어공식")
  const [businessName, setBusinessName] = useState("")
  const [mainAddress, setMainAddress] = useState("")
  const [detailAddress, setDetailAddress] = useState("")
  const [businessType, setBusinessType] = useState("")
  const [businessCategory, setBusinessCategory] = useState("")
  const [businessLicense, setBusinessLicense] = useState<File | null>(null)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type (image or PDF)
      const validTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"]
      if (!validTypes.includes(file.type)) {
        alert("JPG, PNG, PDF 파일만 업로드 가능합니다.")
        return
      }
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert("파일 크기는 10MB를 초과할 수 없습니다.")
        return
      }
      setBusinessLicense(file)
    }
  }

  const handleFileRemove = () => {
    setBusinessLicense(null)
  }

  const handleSubmit = () => {
    if (!businessLicense) {
      alert("사업자등록증을 첨부해주세요.")
      return
    }
    console.log("[v0] Company info updated with business license")
    alert("회사 정보가 수정되었습니다.")
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b px-8 py-4">
        <h1 className="text-2xl font-bold">회사 정보 관리</h1>
        <Button onClick={handleSubmit} className="bg-purple-700 hover:bg-purple-800">
          수정하기
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-8 py-6">
        <div className="mx-auto max-w-3xl space-y-6">
          <Alert className="border-amber-500 bg-amber-50">
            <AlertCircle className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-sm text-amber-800">
              사업자등록증이 없으면 유료상품을 결제할 수 없습니다. 사업자등록증을 첨부해주세요.
            </AlertDescription>
          </Alert>

          {/* 회사명 */}
          <div className="space-y-2">
            <Label htmlFor="companyName" className="text-sm font-medium">
              회사명 <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                maxLength={50}
                className="bg-muted pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {companyName.length}/50
              </span>
            </div>
          </div>

          {/* 대표자명 */}
          <div className="space-y-2">
            <Label htmlFor="representativeName" className="text-sm font-medium">
              대표자명
            </Label>
            <div className="relative">
              <Input
                id="representativeName"
                value={representativeName}
                onChange={(e) => setRepresentativeName(e.target.value)}
                maxLength={30}
                className="bg-muted pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {representativeName.length}/30
              </span>
            </div>
          </div>

          {/* 사업자명 */}
          <div className="space-y-2">
            <Label htmlFor="businessName" className="text-sm font-medium">
              사업자명
            </Label>
            <div className="relative">
              <Input
                id="businessName"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                placeholder="사업자명을 입력해 주세요."
                maxLength={50}
                className="bg-muted pr-16"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                {businessName.length}/50
              </span>
            </div>
          </div>

          {/* 사업자 주소 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">사업자 주소</Label>
            <div className="space-y-3">
              <Input
                value={mainAddress}
                onChange={(e) => setMainAddress(e.target.value)}
                placeholder="주소를 입력해 주세요."
                className="bg-muted"
              />
              <Input
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                placeholder="상세 주소를 입력해 주세요."
                className="bg-muted"
              />
            </div>
          </div>

          {/* 업태 업종 */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">업태 업종</Label>
            <div className="space-y-3">
              <Input
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                placeholder="업태를 입력해 주세요."
                className="bg-muted"
              />
              <Input
                value={businessCategory}
                onChange={(e) => setBusinessCategory(e.target.value)}
                placeholder="업종을 입력해 주세요."
                className="bg-muted"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">
              사업자등록증 <span className="text-destructive">*</span>
            </Label>

            {!businessLicense ? (
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                <input
                  type="file"
                  id="businessLicense"
                  className="hidden"
                  accept="image/jpeg,image/jpg,image/png,application/pdf"
                  onChange={handleFileUpload}
                />
                <label htmlFor="businessLicense" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="h-10 w-10 text-muted-foreground" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium">파일을 업로드하세요</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG, PDF (최대 10MB)</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" className="mt-2 bg-transparent">
                    파일 선택
                  </Button>
                </label>
              </div>
            ) : (
              <div className="border rounded-lg p-4 bg-muted/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-100 rounded">
                      <FileText className="h-5 w-5 text-purple-700" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{businessLicense.name}</p>
                      <p className="text-xs text-muted-foreground">{(businessLicense.size / 1024).toFixed(1)} KB</p>
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={handleFileRemove} className="h-8 w-8 p-0">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* 서비스 탈퇴 */}
          <div className="pt-6">
            <Separator className="mb-6" />
            <div className="space-y-2">
              <h3 className="text-sm font-medium">서비스 탈퇴</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
