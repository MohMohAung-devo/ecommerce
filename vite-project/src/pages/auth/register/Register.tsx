import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import classes from "./Register.module.css";
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
import { useAllRegister } from "@/pages/api/server/auth/register/query";
const formSchema = z.object({
  name: z.string().min(4, {
    message: "UserName must be required",
  }),
  phone: z.string().min(11, {
    message: "Phone number must be required",
  }),
  email: z.string(),
  password: z.string().min(6, {
    message: "Password must be required",
  }),
  currentLocation: z.string().min(6, {
    message: "Location must be required",
  }),
});

const Register = () => {
  const register = useAllRegister();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      currentLocation: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    register.mutate(values);
    console.log(values);
  }
  return (
    <div className={classes.Container}>
      <div className={classes.RegisterContainer}>
        <h1 className="text-black text-3xl mb-4 mt-10">Register</h1>
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
                        placeholder="shadcn"
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
                    <FormLabel>Your Phone Number</FormLabel>
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
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="email"
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
                        placeholder="password"
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
                name="currentLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="location....."
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

export default Register;
