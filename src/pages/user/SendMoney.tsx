import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSendMoneyMutation } from "@/redux/features/wallet/wallet.api"
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function SendMoney() {

    const form = useForm();

    const [sendMoney] = useSendMoneyMutation();

    const onSubmit = async (data) => {
          const sendMoneyInfo= {
            receiverPhone:data.receiverPhone,
            amount:data.amount
          }

         try {
            const toastId = toast.loading("send money in progress...")
            const res = await sendMoney(sendMoneyInfo).unwrap();
            if(res.success){
                toast.success("send money successfull",{id:toastId})
            }
         } catch (error) {
            console.log(error);
         }
    }
    return (
        <div>
            This is SendMoney component
            <div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="receiverPhone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Enter Receiver number</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            
                                            <Input
                                                type="number"
                                                placeholder="Enter a valid recepient phone number"
                                                {...field}
                                                className="pl-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sm font-medium">Enter amount</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            
                                            <Input
                                                type="number"
                                                placeholder="Enter amount"
                                                {...field}
                                                className="pl-10 h-12 border-border/50 bg-background/80 backdrop-blur-sm focus:border-primary/50 focus:ring-primary/20 transition-all duration-200"
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Send</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}