import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classes from "./Login.module.css";
import { useLogin } from "@/pages/api/server/auth/login/query";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
const formSchema = z.object({
  email: z.string().min(4, {
    message: "Email must be required",
  }),
  password: z.string().min(6, {
    message: "Password must be required",
  }),
});

const Login = () => {
  const login = useLogin();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate(values);
    // console.log(values);
  }
  return (
    <div className={classes.Container}>
      <div className={classes.RegisterContainer}>
        <h1 className="text-black text-3xl mt-10">Register</h1>
        <div className={classes.form}>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-8 "
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email...."
                        {...field}
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "white",
                          border: "1px solid white",
                        }}
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="password..."
                        {...field}
                        style={{
                          borderRadius: "10px",
                          backgroundColor: "white",
                          border: "1px solid white",
                        }}
                      />
                    </FormControl>
                    <FormDescription>
                      This is your public display name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                variant="outline"
                className="bg-white"
                style={{ borderRadius: "10px" }}
              >
                Submit
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
