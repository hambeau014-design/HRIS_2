// src/mocks/evaluationsMock.ts
export type ParticipantMock = {
  name: string;
  initial: string;
  department: string;
  progress: number;
  status: "진행 중" | "동료 평가" | "자기 평가";
  statusClassName: string;
  statusTextClassName: string;
};

const STORAGE_KEY = "hris_evaluations_mock_v1";

const initialParticipants: ParticipantMock[] = [
  {
    name: "김민수",
    initial: "김",
    department: "플랫폼 개발",
    progress: 75,
    status: "진행 중",
    statusClassName: "bg-[#e4f7fb]",
    statusTextClassName: "text-[#087d98]",
  },
  {
    name: "김만수",
    initial: "김",
    department: "피플팀",
    progress: 50,
    status: "동료 평가",
    statusClassName: "bg-[#e4f7fb]",
    statusTextClassName: "text-[#087d98]",
  },
  {
    name: "김매수",
    initial: "김",
    department: "사업 전략",
    progress: 25,
    status: "자기 평가",
    statusClassName: "bg-[#fff3d2]",
    statusTextClassName: "text-[#80621b]",
  },
];

export const getStoredParticipants = (): ParticipantMock[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialParticipants));
    return initialParticipants;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialParticipants;
  }
};

export const saveStoredParticipants = (participants: ParticipantMock[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
};