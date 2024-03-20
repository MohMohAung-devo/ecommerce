import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classes from "./Login.module.css";
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
import { Link } from "react-router-dom";
const formSchema = z.object({
  name: z.string(),
  phone: z.string(),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name...."
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="phone..."
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
              <Link to="/">
                <Button
                  type="submit"
                  variant="outline"
                  className="bg-white"
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
