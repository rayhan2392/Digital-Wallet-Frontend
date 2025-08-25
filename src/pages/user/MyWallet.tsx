import { useGetMyWalletQuery } from "@/redux/features/wallet/wallet.api"

export default function MyWallet() {


  const { data: myWallet } = useGetMyWalletQuery(undefined);

  console.log(myWallet);

  return (
    <div>
      {myWallet?.user?.name}
      Total Balance : {myWallet?.balance}

    </div>
  )
}