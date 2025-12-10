import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getCategories } from "@/data/getCategories";
import Link from "next/link";
import NewTransactionForm from "./new-transaction-form";

export default async function NewTransactionPage() {
    const categories = await getCategories();
  return (
    <div className="max-w-7xl mx-auto py-10">
        <Breadcrumb>
        <BreadcrumbList>
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link href="/dashboard">Dashboard</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
        <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
            <Link href="/dashboard/transactions">Transactions</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
        <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbPage>New Transaction</BreadcrumbPage>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>
        <Card className="mt-4 max-w-3xl">
            <CardHeader>New Transaction</CardHeader>
            <CardContent><NewTransactionForm categories={categories}/></CardContent>
        </Card>    
    </div>
  );
}