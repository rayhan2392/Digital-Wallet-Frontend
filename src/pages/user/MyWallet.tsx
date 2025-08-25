import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api"

export default function MyWallet() {


  const { data: myWallet } = useGetMyWalletQuery(undefined);

  console.log(myWallet);

  return (
    <div>
      {/* Overview with wallet balance, quick actions, and recent transactions */}
      {myWallet?.user?.name}
      Total Balance : {myWallet?.balance}

    </div>
  )
}