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
import { error } from "console";

const formSchema = z.object({
  // id: z.string(),
  name: z.string(),
  image: z.instanceof(FileList).optional(),
  amount: z.coerce.number(),
  price: z.coerce.number(),
  count: z.coerce.number(),
  date: z.string(),
});

const AddProduct = () => {
  // const { file, previewUrl, error, upload, handlFileChange, handleUpload } =
  //   useImageUpload();

  const [preview, setPreview] = useState("");

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

  // function ImageUplad(event: ChangeEvent<HTMLInputElement>) {
  //   const dataTransfer = new DataTransfer();

  //   Array.from(event.target.files!).forEach((image) =>
  //     dataTransfer.items.add(image)
  //   );

  //   const file = dataTransfer.files;
  //   const displayUrl = URL.createObjectURL(event.target.files![0]);

  //   return { file, displayUrl };
  // }

  const fileRef = form.register("image");
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for preview image

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files?.[0];

    if (!selectedFile) {
      setPreviewImage(null);
      return;
    }
    if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
      alert("Invalid image format. Please select a JPEG or PNG file.");
      setPreviewImage(null);
      return;
    }

    const reader = new FileReader() as FileReader & { result: string };
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.image) {
      console.log("Image is present:", values.image);
    } else {
      console.log("No image selected or image upload failed.");
    }
    addProduct.mutate(
      {
        values,
      },
      console.log(values)
    );
  }
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
                  onSubmit={form.handleSubmit(onSubmit)}
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
                    render={({ field: { onChange } }) => (
                      <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                          <Input
                            type="file"
                            {...fileRef}
                            onChange={handleFileChange}
                          />
                        </FormControl>

                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        {previewImage && (
                          <>
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-30 h-30 object-cover"
                            />
                            <FormMessage>Selected file preview</FormMessage>
                          </>
                        )}
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
