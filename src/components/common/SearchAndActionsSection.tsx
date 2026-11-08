import type { JSX } from "react/jsx-runtime";

export const SearchAndActionsSection = (): JSX.Element => {
  return (
    <header
      className="flex h-[103px] items-center justify-between pl-[53px] pr-[50px] py-0 relative self-stretch w-full bg-transparent [border-top-style:none] [border-right-style:none] border-b [border-bottom-style:solid] [border-left-style:none] border-[#e7ebf2]"
      aria-label="검색 및 작업"
    >
      <form
        className="flex w-[593.03px] h-14 items-center gap-4 px-[23px] py-0 relative bg-[#f1f4f9] rounded-[17px]"
        role="search"
        onSubmit={(event) => event.preventDefault()}
      >
        <div className="relative w-[18.73px] h-5" aria-hidden="true">
          <img
            className="absolute w-[86.87%] h-[84.54%] top-[15.46%] left-[13.13%]"
            src="/img/dashboard/vector-20.svg"
            alt=""
          />
          <img
            className="absolute w-[36.87%] h-[37.71%] top-[62.29%] left-[63.13%]"
            src="/img/dashboard/vector-21.svg"
            alt=""
          />
        </div>
        <div className="flex flex-col w-[512.3px] h-6 items-start justify-center relative">
          <label htmlFor="global-search" className="sr-only">
            구성원, 문서, 메뉴 검색
          </label>
          <input
            id="global-search"
            name="search"
            type="search"
            placeholder="구성원, 문서, 메뉴 검색"
            autoComplete="off"
            className="relative self-stretch w-full h-6 [font-family:'Noto_Sans_KR',Helvetica] font-normal text-[#94a5ba] text-base tracking-[0] leading-[normal] placeholder:text-[#94a5ba]"
          />
        </div>
      </form>
      <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
        <button
          type="button"
          className="grid grid-cols-[53px] grid-rows-[53px] w-[55px] h-[55px] rounded-2xl border border-solid border-[#dfe5ee]"
          aria-label="알림"
        >
          <div
            className="relative row-[1_/_2] col-[1_/_2] justify-self-center self-center w-[23px] h-[23px]"
            aria-hidden="true"
          >
            <img
              className="absolute w-[91.04%] h-[95.21%] top-[4.79%] left-[8.96%]"
              src="/img/dashboard/vector-22.svg"
              alt=""
            />
          </div>
          <span
            className="absolute top-[13px] left-9 w-1.5 h-1.5 bg-[#20a5ff] rounded-[3px]"
            aria-label="새 알림"
          />
        </button>
        <button
          type="button"
          className="all-unset box-border inline-flex h-[59px] items-center gap-3 px-[21px] py-0 relative flex-[0_0_auto] bg-[#070b1e] rounded-[15px] cursor-pointer"
          aria-label="구성원 초대"
        >
          <div className="relative w-[22px] h-[22px]" aria-hidden="true">
            <img
              className="absolute w-[99.37%] h-[41.04%] top-[58.96%] left-0"
              src="/img/dashboard/vector-23.svg"
              alt=""
            />
            <img
              className="absolute w-[84.79%] h-[91.04%] top-[8.96%] left-[15.21%]"
              src="/img/dashboard/vector-24.svg"
              alt=""
            />
            <img
              className="absolute w-[32.71%] h-[91.04%] top-[8.96%] left-[67.29%]"
              src="/img/dashboard/vector-25.svg"
              alt=""
            />
          </div>
          <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <span className="relative w-fit mt-[-1.00px] [font-family:'Noto_Sans_KR',Helvetica] font-normal text-white text-lg tracking-[0] leading-[27px] whitespace-nowrap">
              Invite
            </span>
          </span>
        </button>
      </div>
    </header>
  );
};
