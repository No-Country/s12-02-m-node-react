import { Card } from "../../atoms/eventCard";

export default function UpcomingEventsGrid() {
  return (
    <section className="grid md:grid-cols-2 md:grid-rows-[repeat(3,_26rem)] lg:grid-cols-8  gap-4">
      <div className="lg:col-span-5 xl:col-span-6 bg-white rounded-lg shadow-md">
        <Card className={'long'}/>
      </div>
      <div className="lg:col-span-3 xl:col-span-2 bg-white rounded-lg shadow-md">
        <Card />
      </div>
      <div className="lg:col-span-3 bg-white rounded-lg shadow-md">
        <Card />
      </div>
      <div className="lg:col-span-5 lg:row-span-2 bg-white rounded-lg shadow-md">
        <Card className={'big'} />
      </div>
      <div className="lg:col-span-3 md:col-span-2 bg-white rounded-lg shadow-md">
        <Card />
      </div>
    </section>
  );
}
