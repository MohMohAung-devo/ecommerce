import React, { ChangeEvent, useState } from "react";
import { nullable, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import classes from "./add-product.module.css";
import { Button } from "@/components/ui/button";
// import useImageUpload from "@/pages/hook/use-image";
import { useAddProduct } from "@/api/productApp/mutation";

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = ["image/png"];

const formSchema = z.object({
  // id: z.string(),
  name: z.string(),
  // image: z.instanceof(FileList).optional(),
  image: z.string(),
  amount: z.coerce.number(),
  price: z.coerce.number(),
  count: z.coerce.number(),
  date: z.string(),
});

const AddProduct = () => {
  const addProduct = useAddProduct();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // id: "",
      name: "",
      image: undefined,
      amount: 0,
      price: 0,
      count: 0,
      date: "",
    },
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  // const uploadImage = async () => {
  //   if (selectedImage) {
  //     const formData = new FormData();
  //     formData.append("image", selectedImage);

  //     //   try {
  //     //     const response = await fetch("http://localhost:5000/upload", {
  //     //       method: "POST",
  //     //       body: formData,
  //     //     });
  //     //     if (response.ok) {
  //     //       console.log("Image uploaded successfully");
  //     //     } else {
  //     //       console.error("Failed to upload image");
  //     //     }
  //     //   } catch (error) {
  //     //     console.error("Error uploading image:", error);
  //     //   }
  //   }
  // };

  const uploadImage = async (image: File | null) => {
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      try {
        const response = await fetch("http://localhost:3000/productApp", {
          method: "POST",
          body: formData,
        });
        if (response.ok) {
          const data = await response.json();
          return data.imageUrl; // Return the uploaded image URL
        } else {
          throw new Error("Failed to upload image");
        }
      } catch (error) {
        throw new Error("Error uploading image: " + error.message);
      }
    } else {
      throw new Error("No image selected");
    }
  };

  function submit(values: z.infer<typeof formSchema>) {
    addProduct.mutate(values);
  }

  // const handleSubmit = async () => {
  //   try {
  //     const imageUrl = await uploadImage(selectedImage);
  //     submit({ values, ...form.getValues(), image: imageUrl }); // Update form values with image URL
  //   } catch (error) {
  //     console.error("Error uploading image:", error);
  //   }
  // };

  return (
    <>
      <div className={classes.Container}>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" style={{ borderRadius: "5px" }}>
              Create Product
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-white text-black">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
            </DialogHeader>
            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(submit)}
                  className="grid gap-4 py-2"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
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
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          {/* <Input
                            id="picture"
                            type="file"
                            {...field}
                            // {...fieldProps}
                            // type="file"
                            // accept="image/*, application/pdf"
                            // onChange={(event) =>
                            //   onChange(
                            //     event.target.files && event.target.files[0]
                            //   )
                            // }
                          /> */}

                          <Input
                            id="picture"
                            type="file"
                            onChange={(
                              event: ChangeEvent<HTMLInputElement>
                            ) => {
                              if (event.target.files) {
                                setSelectedImage(event.target.files[0]);
                              }
                              field.onChange(event);
                            }}
                          />
                        </FormControl>
                        <FormDescription>
                          This your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
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
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
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
                    name="count"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Count</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
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
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
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
                    className="bg-black text-white"
                  >
                    Submit
                  </Button>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default AddProduct;
