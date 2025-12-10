import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAnnualCashFlow } from "@/data/getAnnaulCashFlow";
import CashFlowFilters from "./cashflow-filters";
import { getTransactionYearsRange } from "@/data/getTransactionYearsRange";
import { CashflowContent } from "./cashflow-content";

export default async function CashFlow({
    year
} : {
    year: number
}) {
    const [cashflow, yearsRange ] = await Promise.all( [
        getAnnualCashFlow(year), 
        getTransactionYearsRange()
    ]);
    return (
        <Card className="mb-5">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    <span>Cash Flow</span>
                    <CashFlowFilters year={year} yearsRange={yearsRange}/>
                </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-[1fr_250px]">
              <CashflowContent annualCashFlow={cashflow}/>
            </CardContent>
        </Card>
       
    );
}