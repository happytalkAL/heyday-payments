"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function AccountPage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    role: "소유자",
    email: "heythere@hey-there.io",
    name: "헤이데어광식",
    phone: "01062196627",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsEditing(false)
  }

  return (
    <div className="flex h-screen flex-col">
      <div className="flex items-center justify-between border-b px-8 py-4">
        <h1 className="text-2xl font-bold">나의 계정 정보</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)} className="bg-purple-700 hover:bg-purple-800">
            수정하기
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              취소
            </Button>
            <Button onClick={handleSubmit} className="bg-purple-700 hover:bg-purple-800">
              저장
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-auto p-8">
        <form onSubmit={handleSubmit} className="mx-auto max-w-2xl space-y-6">
          {/* 역할 */}
          <div className="space-y-2">
            <Label htmlFor="role">역할</Label>
            <div className="text-sm font-medium text-destructive">{formData.role}</div>
          </div>

          {/* 계정 */}
          <div className="space-y-2">
            <Label htmlFor="email">
              계정 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={!isEditing}
              className="bg-muted"
              required
            />
          </div>

          {/* 이름 */}
          <div className="space-y-2">
            <Label htmlFor="name">
              이름 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={!isEditing}
              className="bg-muted"
              required
            />
          </div>

          {/* 연락처 */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              연락처 <span className="text-destructive">*</span>
            </Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              disabled={!isEditing}
              className="bg-muted"
              required
            />
          </div>

          {/* 비밀번호 재설정 */}
          <div className="pt-4">
            <Button type="button" variant="outline" onClick={() => alert("비밀번호 재설정 이메일이 발송됩니다.")}>
              비밀번호 재설정
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
