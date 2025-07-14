import React from "react";
import { ContentCard } from "./ContentCard";
import { NavigationButtons } from "./NavigationButtons";

const navigationItems = [
  { label: "Trang chủ" },
  { label: "Khám phá" },
  { label: "Sự kiện" },
  { label: "Về chúng tôi" },
];

export const MainContentSection: React.FC = () => {
  return (
    <main className="flex flex-col px-14 mt-7 w-full max-md:px-5 max-md:max-w-full">
      <section className="self-end w-full max-w-[1238px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-[27%] max-md:ml-0 max-md:w-full">
            <ContentCard title="Vị trí" className="my-auto max-md:mt-10" />
          </div>
          <div className="ml-5 w-2/5 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col grow text-black max-md:mt-10">
              <div className="flex flex-col items-start self-end px-2.5 pt-40 pb-5 mr-5 max-w-full text-2xl bg-zinc-300 w-[331px] max-md:pt-24 max-md:pr-5 max-md:mr-2.5">
                <h2>Khí hậu</h2>
              </div>
              <h1 className="mt-24 text-8xl text-center max-md:mt-10 max-md:text-4xl">
                An Giang
              </h1>
            </div>
          </div>
          <div className="ml-5 w-[33%] max-md:ml-0 max-md:w-full">
            <ContentCard
              title="Lịch sử"
              className="mt-48 max-md:mt-10"
              paddingTop="pt-40"
            />
          </div>
        </div>
      </section>

      <section className="mt-9 w-full max-w-[1219px] max-md:max-w-full">
        <div className="flex gap-5 max-md:flex-col">
          <div className="w-3/12 max-md:ml-0 max-md:w-full">
            <ContentCard
              title="Văn hoá - Xã hội"
              className="max-md:mt-10"
              paddingTop="pt-40"
            />
          </div>
          <div className="ml-5 w-9/12 max-md:ml-0 max-md:w-full">
            <div className="flex flex-col mt-10 w-full max-md:max-w-full">
              <NavigationButtons items={navigationItems} />

              <div className="self-end mt-12 max-w-full w-[801px] max-md:mt-10">
                <div className="flex gap-5 max-md:flex-col">
                  <div className="w-[36%] max-md:ml-0 max-md:w-full">
                    <ContentCard
                      title="Lưu ý"
                      className="my-auto aspect-square max-md:mt-10"
                      paddingTop="pt-44"
                      width="w-full"
                    />
                  </div>
                  <div className="ml-5 w-[64%] max-md:ml-0 max-md:w-full">
                    <section className="flex flex-col grow items-start px-8 pt-52 pb-5 w-full text-2xl text-black bg-zinc-300 max-md:px-5 max-md:pt-24 max-md:mt-10">
                      <h2 className="w-[290px]">
                        Địa điểm và món ăn không thể bỏ qua
                      </h2>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
