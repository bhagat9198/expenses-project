import BodyLayout from "~/components/common/body-layout";

export default function Index() {
  return (
    <BodyLayout>
      <main className="bg-brand-light-color-2 px-20" > 
        <div className="flex" >
          <div className="bg-brand-light-color-3 rounded-lg p-5" >
            <div>
              <span>Expense</span>
              <span>Exchange</span>
              <span>Income</span>
            </div>
            
          </div>
          <div></div>
        </div>
      </main>
    </BodyLayout>
  );
}
