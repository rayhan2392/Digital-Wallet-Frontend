import { useGetAllTransactionsQuery } from "@/redux/features/transaction/transaction.api"

export default function AllTransactions() {
    const {data:transactions}=useGetAllTransactionsQuery({type:"cash_out"});

    console.log(transactions);
  return (
    <div>
        {/* beauty fully design a table and  show all transactions */}
        This is AllTransactions component</div>
  )
}