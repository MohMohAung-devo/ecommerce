import React, { useState } from "react";
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

const formSchema = z.object({
  // id: z.string(),
  name: z.string(),
  image: z.instanceof(FileList).optional(),
  amount: z.number(),
  date: z.string(),
});

const AddProduct = () => {
  // const { file, previewUrl, error, upload, handlFileChange, handleUpload } =
  //   useImageUpload();

  const addProduct = useAddProduct();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // id: "",
      name: "",
      image: undefined,
      amount: 0,
      date: "",
    },
  });

  const fileRef = form.register("image");
  const [previewImage, setPreviewImage] = useState<string | null>(null); // State for preview image

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target?.files?.[0];

    if (!selectedFile) {
      setPreviewImage(null);
      return;
    }

    // Validate file type (optional)
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
    addProduct.mutate(values);
    console.log(values);
  }
  return (
    <>
      <div className={classes.Container}>
        <Dialog
          open={open}
          onOpenChange={setOpen}
          // position={{ top: 30, right: 20 }}
        >
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
                  {/* <FormField
                    control={form.control}
                    name="id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Id</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>

                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}

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
                          <Input
                            type="file"
                            {...fileRef}
                            onChange={handleFileChange}
                          />
                          {/* {error && <FormMessage error>{error}</FormMessage>} */}
                        </FormControl>

                        {/* <button
                          type="button"
                          onClick={() => handleUpload("your-upload-url")}
                        >
                          Upload
                        </button>

                        {upload > 0 && <p>Upload progress: {upload}%</p>} */}
                        <FormDescription>
                          This is your public display name.
                        </FormDescription>
                        {previewImage && (
                          <>
                            <img
                              src={previewImage}
                              alt="Preview"
                              className="w-48 h-48 object-cover"
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
