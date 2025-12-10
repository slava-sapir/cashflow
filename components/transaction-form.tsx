"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { addDays } from "date-fns"
import { useForm, Resolver } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { Input } from "./ui/input";
import { type Category } from "@/types/Category";

export const transactionFormSchema = z.object({
  transactionType: z.enum(["income", "expense"]),
  categoryId: z.coerce.number().positive("Please select a category"),
  transactionDate: z.coerce
  .date()
  .max(addDays(new Date(), 1), "Transaction date cannot be in the future"),
  amount: z.coerce.number().positive("Amount must be greater then 0"),
  description: 
  z.string()
  .min(3, "Description must contain at least 3 characters")
  .max(300, "Description must contain at maximum 300 characters")
});

type Props = {
    categories: Category[];
    onSubmit:(data:z.infer<typeof transactionFormSchema>) => Promise<void>;
    defaultValues?: {
        amount: number,
        categoryId: number,
        description: string,
        transactionType: "income" | "expense",
        transactionDate: Date
        },
}
export default function TransactionForm( { categories, onSubmit, defaultValues }: Props ) {
    const form = useForm<z.infer<typeof transactionFormSchema>>({
        resolver: zodResolver(transactionFormSchema) as unknown as Resolver<z.infer<typeof transactionFormSchema>>,
        defaultValues: {
        amount: 0,
        categoryId: 0,
        description: "",
        transactionType: "income",
        transactionDate: new Date(),
        ...defaultValues
        },
    });

    const transactionType = form.watch("transactionType")
    const filteredCategories = categories.filter( (category) => (
        category.type === transactionType
    ) );

  return <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} >
    <fieldset 
    disabled={form.formState.isSubmitting}
    className="grid grid-cols-2 gap-y-5 gap-x-2">
    <FormField 
        control={form.control} 
        name="transactionType" 
        render={( { field } )=>{
        return (
            <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <FormControl>
                    <Select onValueChange={(newValue) => {
                        field.onChange(newValue)
                        form.setValue("categoryId", 0)
                        }} 
                        value={field.value}>
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="income">
                               Income
                            </SelectItem>
                            <SelectItem value="expense">
                               Expence
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )
    }}/>
    <FormField 
        control={form.control} 
        name="categoryId" 
        render={( { field } )=>{
        return (
            <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                    <Select onValueChange={field.onChange} value={field.value.toString()}>
                        <SelectTrigger>
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            {filteredCategories.map((category) => (
                                <SelectItem key={category.id} value={category.id.toString()}>
                                    {category.name}
                                </SelectItem>
                              ))
                            }
                        </SelectContent>
                    </Select>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )
    }}/>
     <FormField 
        control={form.control} 
        name="transactionDate"
        render={( { field } )=>{
        return (
            <FormItem>
                <FormLabel>Transaction Date</FormLabel>
                <FormControl>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            id="date"
                            className="w-48 justify-between font-normal"
                        >
                            {field.value ? field.value.toLocaleDateString() : "Select date"}
                            <CalendarIcon/>
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                        <Calendar
                            mode="single"
                            selected={field.value}
                            captionLayout="dropdown"
                            onSelect={field.onChange}
                            disabled={{after: new Date() }}
                        />
                        </PopoverContent>
                    </Popover>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )
    }}/>
    <FormField 
        control={form.control} 
        name="amount" 
        render={( { field } )=>{
        return (
            <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                    <Input {...field} type="number"/>
                </FormControl>
                <FormMessage/>
            </FormItem>
        )
    }}/>
    </fieldset>
    <fieldset 
    disabled={form.formState.isSubmitting}
    className="mt-5 flex flex-col gap-5">
      <FormField 
        control={form.control} 
        name="description" 
        render={( { field } )=>{
        return (
            <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                    <Input {...field} />
                </FormControl>
                <FormMessage/>
            </FormItem>
        )
    }}/>
    <Button>Submit</Button>
    </fieldset>
    </form>
    </Form>
}