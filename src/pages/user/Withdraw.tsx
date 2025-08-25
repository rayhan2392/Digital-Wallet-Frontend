import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAgentInfoQuery } from "@/redux/features/auth/auth.api"
import { useWithdrawMutation } from "@/redux/features/wallet/wallet.api";

import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Withdraw() {

    //all approved agents filtered from backend
    const { data: agents } = useAgentInfoQuery({});
    const [withdraw] = useWithdrawMutation();
    const form = useForm();

    const onSubmit = async (data) => {
       const withdrawInfo = {
        agentPhone:data.agent,
        amount:data.amount
       }
      try {
                 const toastId = toast.loading("withdraw in progress...")
                 const res = await withdraw(withdrawInfo).unwrap();
                 if(res.success){
                     toast.success("withdraw successfull",{id:toastId})
                 }
              } catch (error) {
                 console.log(error);
              }

    }

    return (
        <div>This is Withdraw component

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
                    <FormField
                        control={form.control}
                        name="agent"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Select an Agent</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="select an agent" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {agents?.map((item) => (
                                            <SelectItem key={item._id} value={item?.phone}>
                                                {item?.name}
                                            </SelectItem>
                                        ))}

                                    </SelectContent>
                                </Select>


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
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Withdraw</Button>
                </form>
            </Form>

        </div>
    )
}