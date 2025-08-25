import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api"

export default function MyTransactions() {
  const { data: transactions } = useGetMyTransactionsQuery({})
  console.log(transactions);
  return (
    <div>This is MyTransactions component</div>
  )
}