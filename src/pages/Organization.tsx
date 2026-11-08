import { useState, type JSX } from "react";

import { OrganizationSettingsTabsSection } from "../components/organization/OrganizationSettingsTabsSection";

import { CompanyInformationSection } from "../components/organization/CompanyInformationSection";

import { ManagementPage } from "../components/organization/ManagementPage/ManagementPage";

const tabs = [
  "회사 기본정보",
  "부서 관리",
  "직급 관리",
  "직책 관리",
  "직무 관리",
  "조직별 인원조회",
  "조직 정보 삭제",
];

export default function Organization(): JSX.Element {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="space-y-6">
      <OrganizationSettingsTabsSection
        activeTab={activeTab}
        onChange={setActiveTab}
      />

      <div
        id="organization-tab-panel"
        role="tabpanel"
        aria-label={tabs[activeTab]}
      >
        {activeTab === 0 && (
          <CompanyInformationSection />
        )}

       {activeTab >= 1 && activeTab <= 4 && (
  <ManagementPage activeTab={activeTab} />
)}

      </div>
    </div>
  );
}