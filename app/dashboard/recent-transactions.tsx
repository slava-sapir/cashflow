import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { getRecentTransactions } from '@/data/getRecentTransactions';
import { Badge} from '@/components/ui/badge';
import Link from 'next/link';
import numeral from 'numeral';
import { format } from 'date-fns';


export default async function RecentTransactions() {
    const recentTransactions = await getRecentTransactions();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex justify-between items-center gap-2">
                    <span>Recent Transactions</span>
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/dashboard/transactions">
                               View All
                            </Link>
                        </Button>
                        <Button>
                            <Link href="/dashboard/transactions/new">
                               Create New
                            </Link>
                        </Button>
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
            {!recentTransactions?.length && (
            <p className="mt-4 py-10 text-center text-lg text-muted-foreground">
              You have no transaction yet. 
              Start by hitting "Create New" to create your first transaction
            </p>
            )
            }
          {!!recentTransactions?.length && (
            <Table className="mt-4">  
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>{recentTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {format(transaction.transactionDate, "do MMM yyyy")}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell className="capitalize">
                     <Badge 
                      className={
                      transaction.transactionType === "income" 
                      ? "bg-lime-500" 
                      : "bg-orange-500"
                     }
                      >
                      {transaction.transactionType}
                     </Badge>
                  </TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>{numeral(transaction.amount).format("$0,0[.]00")}</TableCell>
                </TableRow>
              ))}
              </TableBody>
            </Table>
            )
          }
            </CardContent>
        </Card>
    )
}