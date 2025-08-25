import { useGetMyTransactionsQuery } from "@/redux/features/transaction/transaction.api"

export default function Transactions() {

  const {data:transactions} = useGetMyTransactionsQuery({});
  console.log(transactions);

  return (
    <div>
        {/* Filtering by type/date range */}
        This is Transactions component</div>
  )
}