import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import classes from "./Login.module.css";
import { Link } from "react-router-dom";

const formSchema = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.string(),
});
export const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className={classes.formContainer}>
      <div className={classes.Container}>
        <h1 className="text-lg">Login</h1>
        <div className={classes.formItem}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name...."
                        {...field}
                        className="rounded-md bg-black text-white"
                        style={{ borderRadius: "10px" }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email..."
                        {...field}
                        className="rounded-md bg-black text-white"
                        style={{ borderRadius: "10px" }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your phone number...."
                        {...field}
                        className="rounded-md bg-black text-white"
                        style={{ borderRadius: "10px" }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Link to="/">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-black text-white rounded-md w-[100px]"
                  style={{ borderRadius: "10px" }}
                >
                  Submit
                </Button>
              </Link>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
