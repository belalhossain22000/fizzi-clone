import { content } from "@/lib/content";

export default function BigText() {
  const words = content.bigText.second.split(" ");

  return (
    <section
      data-slice-type="big_text"
      data-slice-variation="default"
      className="min-h-screen w-screen overflow-hidden bg-[#FE6334] text-[#FEE832]"
    >
      <h2 className="grid w-full gap-[3vw] py-10 text-center font-black uppercase leading-[.7]">
        <div className="text-[34vw]">{content.bigText.first}</div>
        <div className="grid gap-[3vw] text-[34vw] md:flex md:text-[11vw]">
          <span className="inline-block">{words[0]} </span>
          <span className="inline-block max-md:text-[27vw]">{words[1]} </span>
          <span className="inline-block max-md:text-[40vw]">{words[2]} </span>
        </div>
        <div className="text-[32vw]">{content.bigText.third}</div>
      </h2>
    </section>
  );
}
