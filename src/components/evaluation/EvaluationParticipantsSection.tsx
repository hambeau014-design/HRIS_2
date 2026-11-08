// src/components/evaluation/EvaluationParticipantsSection.tsx
import { useMemo, useState, useEffect, type JSX } from "react";
import { 
  getStoredParticipants, 
  saveStoredParticipants, 
  type ParticipantMock 
} from "../../mocks/evaluationMock";

const USE_MOCK_DATA = true; // 백엔드 연동 시 false로 전환

const statusOptions = ["전체 상태", "진행 중", "동료 평가", "자기 평가"];

export const EvaluationParticipantsSection = (): JSX.Element => {
  const [participants, setParticipants] = useState<ParticipantMock[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("전체 상태");
  const [isStatusMenuOpen, setIsStatusMenuOpen] = useState(false);
  
  // 모달 및 입력 폼 상태
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  type StatusType = "진행 중" | "자기 평가" | "동료 평가";
  const [form, setForm] = useState<{
  name: string;
  department: string;
  status: StatusType;
}>({
  name: "",
  department: "플랫폼 개발",
  status: "진행 중",
});

  // 데이터 로드
  useEffect(() => {
    if (USE_MOCK_DATA) {
      setParticipants(getStoredParticipants());
    } else {
      // 실제 API 연동 시 evaluationApi.getParticipants() 호출
    }
  }, []);

  const handleAddParticipant = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    const newParticipant: ParticipantMock = {
      name: form.name,
      initial: form.name.charAt(0),
      department: form.department,
      progress: 0,
      status: form.status,
      statusClassName: form.status === "자기 평가" ? "bg-[#fff3d2]" : "bg-[#e4f7fb]",
      statusTextClassName: form.status === "자기 평가" ? "text-[#80621b]" : "text-[#087d98]",
    };

    if (USE_MOCK_DATA) {
      const updated = [newParticipant, ...participants];
      setParticipants(updated);
      saveStoredParticipants(updated);
      alert("평가 대상자가 추가되었습니다.");
      setIsAddModalOpen(false);
      setForm({ name: "", department: "플랫폼 개발", status: "진행 중" });
    } else {
      // 실제 API 연동 로직
    }
  };

  const filteredParticipants = useMemo(() => {
    const normalizedSearchTerm = searchTerm.trim().toLowerCase();

    return participants.filter((participant) => {
      const matchesSearch =
        normalizedSearchTerm.length === 0 ||
        participant.name.toLowerCase().includes(normalizedSearchTerm) ||
        participant.department.toLowerCase().includes(normalizedSearchTerm);

      const matchesStatus =
        selectedStatus === "전체 상태" || participant.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus, participants]);

  return (
    <section className="pt-4 pb-0 px-0 flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
      <div className="flex flex-col h-fit min-h-[372px] items-start relative self-stretch w-full bg-white rounded-2xl overflow-hidden border border-solid border-[#e0e5eb]">
        <header className="flex h-[62px] items-center justify-between px-[22px] py-0 relative self-stretch w-full border-b [border-bottom-style:solid] border-[#edf0f4]">
          <div className="inline-flex items-center gap-[9px] relative flex-[0_0_auto]">
            <h2 className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#121829] text-sm tracking-[0] leading-[21px] whitespace-nowrap">
              평가 대상자
            </h2>
            <div className="inline-flex flex-col items-start px-[7px] py-1 relative flex-[0_0_auto] bg-[#e9fafd] rounded-[9px]">
              <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-bold text-[#0b8fa8] text-[7px] tracking-[0] leading-[10.5px] whitespace-nowrap">
                총 {participants.length}명
              </span>
            </div>
          </div>
          
          <div className="inline-flex items-center gap-2 relative flex-[0_0_auto]">
            {/* 대상자 추가 버튼 */}
            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-3 h-[34px] bg-[#15b9dc] text-white rounded-[9px] text-[8px] font-bold cursor-pointer"
            >
              ＋ 대상자 추가
            </button>

            <label className="flex w-[210px] h-[34px] items-center px-[11px] py-0 relative rounded-[9px] border border-solid border-[#e1e6eb]">
              <span className="flex flex-col h-3 items-start justify-center px-2 py-0 w-full">
                <input
                  type="search"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="이름 또는 부서 검색"
                  aria-label="이름 또는 부서 검색"
                  className="relative self-stretch w-full [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#5d687a] text-[8px] tracking-[0] leading-[normal] placeholder:text-[#9ca6b480] outline-none bg-transparent"
                />
              </span>
            </label>
            
            <div className="relative">
              <button
                type="button"
                aria-haspopup="listbox"
                aria-expanded={isStatusMenuOpen}
                onClick={() => setIsStatusMenuOpen((isOpen) => !isOpen)}
                className="all-unset box-border inline-flex h-[34px] items-center gap-2 px-3 py-0 relative flex-[0_0_auto] bg-white rounded-[9px] border border-solid border-[#e1e6eb] cursor-pointer"
              >
                <span className="relative w-fit [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#121829] text-[8px] text-center tracking-[0] leading-3 whitespace-nowrap">
                  {selectedStatus}
                </span>
              </button>
              {isStatusMenuOpen && (
                <ul
                  aria-label="상태 선택"
                  className="absolute right-0 top-[38px] z-10 min-w-full overflow-hidden rounded-[9px] border border-solid border-[#e1e6eb] bg-white py-1 shadow-[0px_4px_12px_rgba(18,24,41,0.12)]"
                >
                  {statusOptions.map((status) => (
                    <li key={status} aria-selected={selectedStatus === status}>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedStatus(status);
                          setIsStatusMenuOpen(false);
                        }}
                        className="all-unset flex h-7 w-full items-center whitespace-nowrap px-3 [font-family:'Noto_Sans_KR',Helvetica] text-[8px] text-[#121829] hover:bg-[#f5f8fa] cursor-pointer"
                      >
                        {status}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* 목록 영역 */}
        <div className="flex flex-col items-start px-5 py-0 relative self-stretch w-full flex-[0_0_auto]">
          <div className="grid grid-cols-[422.88px_281.92px_338.31px_197.34px_225.53px] grid-rows-[35px] min-h-9 h-fit border-b border-[#edf0f4]">
            {["구성원", "소속", "진행률", "평가 등급", "상태"].map((heading) => (
              <div key={heading} className="relative row-[1_/_2] self-center w-full h-[10.5px] flex flex-col items-start">
                <span className="relative w-fit font-bold text-[#9ca6b4] text-[7px]">{heading}</span>
              </div>
            ))}
          </div>

          {filteredParticipants.map((participant, index) => (
            <div
              key={`${participant.name}-${index}`}
              className="grid grid-cols-[422.88px_281.92px_338.31px_197.34px_225.53px_24px] grid-rows-[51px] min-h-[52px] h-fit border-b border-[#edf0f4]"
            >
              <div className="relative row-[1_/_2] col-[1_/_2] self-center w-[136px] h-fit flex items-center gap-2.5">
                <div className="grid place-items-center w-[35px] h-[35px] bg-[#e6f2fc] rounded-[17.5px] border-2 border-white shadow-[0px_0px_0px_1px_#e5ebf2]">
                  <span className="text-[#66809d] text-xs">{participant.initial}</span>
                </div>
                <span className="font-bold text-[#26364b] text-xs">{participant.name}</span>
              </div>
              <div className="relative row-[1_/_2] col-[2_/_3] self-center text-[8px] text-[#5d687a]">
                {participant.department}
              </div>
              <div className="relative row-[1_/_2] col-[3_/_4] self-center flex items-center gap-2">
                <div className="flex flex-col w-[75px] h-[5px] bg-[#edf1f4] rounded-[5px] overflow-hidden">
                  <div className="h-[5px] bg-[#0db6ce] rounded-[5px]" style={{ width: `${participant.progress}%` }} />
                </div>
                <span className="font-bold text-[7px] text-[#5d687a]">{participant.progress}%</span>
              </div>
              <div className="relative row-[1_/_2] col-[4_/_5] self-center text-[8px] text-[#a7afba] pl-2">-</div>
              <div className={`relative row-[1_/_2] col-[5_/_6] self-center h-[20.5px] px-2 py-[5px] rounded-[10px] w-fit ${participant.statusClassName}`}>
                <span className={`font-bold text-[7px] ${participant.statusTextClassName}`}>{participant.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 신규 평가 대상자 추가 모달 */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl">
            <h3 className="text-sm font-bold text-[#121829] mb-4">평가 대상자 추가</h3>
            <form onSubmit={handleAddParticipant} className="flex flex-col gap-3">
              <label className="flex flex-col text-[10px] text-[#5d687a]">
                이름 *
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-[31px] px-2 mt-1 rounded border border-[#e1e6eb] text-xs text-[#121829] outline-none"
                  placeholder="예: 홍길동"
                />
              </label>
              <label className="flex flex-col text-[10px] text-[#5d687a]">
                소속 부서
                <input
                  required
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="h-[31px] px-2 mt-1 rounded border border-[#e1e6eb] text-xs text-[#121829] outline-none"
                  placeholder="예: 플랫폼 개발"
                />
              </label>
              <label className="flex flex-col text-[10px] text-[#5d687a]">
                평가 상태
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                  className="h-[31px] px-2 mt-1 rounded border border-[#e1e6eb] text-xs text-[#121829] outline-none bg-white"
                >
                  <option value="진행 중">진행 중</option>
                  <option value="자기 평가">자기 평가</option>
                  <option value="동료 평가">동료 평가</option>
                </select>
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#e1e6eb] rounded-lg text-[10px] text-[#5d687a] cursor-pointer"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#15b9dc] text-white rounded-lg text-[10px] font-bold cursor-pointer"
                >
                  저장하기
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};