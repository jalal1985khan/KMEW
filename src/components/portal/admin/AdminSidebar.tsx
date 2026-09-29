"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge,
  SidebarRail,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  CreditCard,
  Users,
  UserCheck,
  History,
  Newspaper,
  Image as ImageIcon,
  ExternalLink,
  LogOut,
  Shield,
} from "lucide-react";

export type AdminSectionKey =
  | "payments"
  | "members"
  | "associates"
  | "audit"
  | "news"
  | "gallery";

interface AdminSidebarProps {
  activeSection: AdminSectionKey;
  onSelectSection: (section: AdminSectionKey) => void;
  counts: {
    pendingPayments: number;
    members: number;
    associates: number;
    auditLogs: number;
    news: number;
    gallery: number;
  };
}

export function AdminSidebar({
  activeSection,
  onSelectSection,
  counts,
}: AdminSidebarProps) {
  const { currentUser, logout } = useAuth();

  return (
    <Sidebar collapsible="icon" variant="inset" className="border-r border-border">
      {/* 1. Header: Branding and Super Admin Title */}
      <SidebarHeader className="border-b border-border/60 p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <div className="size-9 rounded-xl bg-[#073531] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 ring-1 ring-[#0e705b]/40">
            <Shield className="size-5 text-emerald-400" />
          </div>
          <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden">
            <span className="font-extrabold text-sm tracking-tight text-slate-900 truncate">
              KMEW Central Admin
            </span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-mono font-medium text-slate-500">
                Governance Portal
              </span>
            </div>
          </div>
        </div>
      </SidebarHeader>

      {/* 2. Content: Grouped Navigation */}
      <SidebarContent className="px-2 py-3">
        {/* Group A: Financial Governance & Audit */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Financial Governance
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "payments"}
                  onClick={() => onSelectSection("payments")}
                  tooltip="4-Tier Financial Pipeline"
                  className="font-medium cursor-pointer"
                >
                  <CreditCard className="size-4 text-emerald-700" />
                  <span>4-Tier Pipeline</span>
                </SidebarMenuButton>
                {counts.pendingPayments > 0 && (
                  <SidebarMenuBadge className="bg-amber-100 text-amber-900 border border-amber-300 font-extrabold text-[10px]">
                    {counts.pendingPayments}
                  </SidebarMenuBadge>
                )}
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "audit"}
                  onClick={() => onSelectSection("audit")}
                  tooltip="Audit Ledger"
                  className="font-medium cursor-pointer"
                >
                  <History className="size-4 text-slate-600" />
                  <span>Audit Ledger</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-slate-100 text-slate-700 text-[10px] font-bold">
                  {counts.auditLogs}
                </SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-1.5" />

        {/* Group B: Operations & Directory */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Directory & Field Network
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "members"}
                  onClick={() => onSelectSection("members")}
                  tooltip="Member Directory"
                  className="font-medium cursor-pointer"
                >
                  <Users className="size-4 text-blue-700" />
                  <span>Member Directory</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-blue-50 text-blue-800 text-[10px] font-bold">
                  {counts.members}
                </SidebarMenuBadge>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "associates"}
                  onClick={() => onSelectSection("associates")}
                  tooltip="Field Associates"
                  className="font-medium cursor-pointer"
                >
                  <UserCheck className="size-4 text-indigo-700" />
                  <span>Field Associates</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-indigo-50 text-indigo-800 text-[10px] font-bold">
                  {counts.associates}
                </SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-1.5" />

        {/* Group C: Public Website Content */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Content Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "news"}
                  onClick={() => onSelectSection("news")}
                  tooltip="News & Events Manager"
                  className="font-medium cursor-pointer"
                >
                  <Newspaper className="size-4 text-teal-700" />
                  <span>News & Events</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-teal-50 text-teal-800 text-[10px] font-bold">
                  {counts.news}
                </SidebarMenuBadge>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  isActive={activeSection === "gallery"}
                  onClick={() => onSelectSection("gallery")}
                  tooltip="Photo Gallery Manager"
                  className="font-medium cursor-pointer"
                >
                  <ImageIcon className="size-4 text-purple-700" />
                  <span>Photo Gallery</span>
                </SidebarMenuButton>
                <SidebarMenuBadge className="bg-purple-50 text-purple-800 text-[10px] font-bold">
                  {counts.gallery}
                </SidebarMenuBadge>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="my-1.5" />

        {/* Group D: External Links */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={
                    <Link
                      href="/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-slate-600 hover:text-slate-900"
                    />
                  }
                  tooltip="View Public Website"
                >
                  <ExternalLink className="size-4 text-slate-400" />
                  <span>Public Website</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* 3. Footer: Admin Identity & Sign Out */}
      <SidebarFooter className="border-t border-border/60 p-3">
        {currentUser && (
          <div className="flex items-center justify-between gap-2 group-data-[collapsible=icon]:justify-center">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar size="sm" className="ring-2 ring-emerald-500/30 shrink-0">
                <AvatarFallback className="bg-[#073531] text-emerald-300 font-bold text-xs">
                  {currentUser.avatarLetter}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col min-w-0 group-data-[collapsible=icon]:hidden leading-tight">
                <span className="font-bold text-xs text-slate-900 truncate">
                  {currentUser.name}
                </span>
                <span className="text-[10px] text-slate-500 font-mono truncate">
                  {currentUser.email}
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon-xs"
              onClick={logout}
              className="text-rose-600 hover:bg-rose-50 group-data-[collapsible=icon]:hidden shrink-0"
              title="Sign Out"
            >
              <LogOut className="size-3.5" />
            </Button>
          </div>
        )}
      </SidebarFooter>

      {/* 4. Rail for resizing/collapsing */}
      <SidebarRail />
    </Sidebar>
  );
}
