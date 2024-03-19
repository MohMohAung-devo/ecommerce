// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";

// export function Form() {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="outline">Share</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle>Share link</DialogTitle>
//           <DialogDescription>
//             Anyone who has this link will be able to view this.
//           </DialogDescription>
//         </DialogHeader>
//         <div className="flex items-center space-x-2">
//           <div className="grid flex-1 gap-2">
//             <Label htmlFor="link" className="sr-only">
//               Link
//             </Label>
//             <Input
//               id="link"
//               defaultValue="https://ui.shadcn.com/docs/installation"
//               readOnly
//             />
//           </div>
//           <Button type="submit" size="sm" className="px-3">
//             <span className="sr-only">Copy</span>
//             {/* <CopyIcon className="h-4 w-4" /> */}
//             <h1 className="h-4 w-4">Hello</h1>
//           </Button>
//         </div>
//         <DialogFooter className="sm:justify-start">
//           <DialogClose asChild>
//             <Button type="button" variant="secondary">
//               Close
//             </Button>
//           </DialogClose>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

// export default Form;

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const formSchema = z.object({
//   file: z.instanceof(FileList).optional(),
// });

// export default function Home() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   const fileRef = form.register("file");

//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//     console.log(data);
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field }) => {
//             return (
//               <FormItem>
//                 <FormLabel>File</FormLabel>
//                 <FormControl>
//                   <Input type="file" placeholder="shadcn" {...fileRef} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             );
//           }}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  file: z.instanceof(FileList).optional(),
});

export default function Home() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const fileRef = form.register("file");
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

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
    // Perform form submission logic with the selected file (data.file)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="shadcn"
                  // {...field}
                  {...fileRef}
                  onChange={handleFileChange}
                />
              </FormControl>
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
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

// import { Button } from "@/components/ui/button";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { z } from "zod";

// const formSchema = z.object({
//   file: z.instanceof(FileList).optional(),
// });

// export default function Home() {
//   const form = useForm<z.infer<typeof formSchema>>({
//     resolver: zodResolver(formSchema),
//   });

//   // State variable to store preview image data (string)
//   const [previewImage, setPreviewImage] = useState<string | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];

//     if (!selectedFile) {
//       setPreviewImage(null);
//       return;
//     }

//     // Validate file type (optional)
//     if (!["image/jpeg", "image/png"].includes(selectedFile.type)) {
//       alert("Invalid image format. Please select a JPEG or PNG file.");
//       setPreviewImage(null);
//       return;
//     }

//     const reader = new FileReader();
//     reader.onloadend = () => {
//       if (typeof reader.result === "string") {
//         setPreviewImage(reader.result);
//       }
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const onSubmit = (data: z.infer<typeof formSchema>) => {
//     console.log(data);
//     // Perform form submission logic with the selected file (data.file)
//   };

//   return (
//     <Form {...form}>
//       <form onSubmit={form.handleSubmit(onSubmit)} className="w-full p-10">
//         <FormField
//           control={form.control}
//           name="file"
//           render={({ field }) => (
//             <FormItem>
//               <FormLabel>File</FormLabel>
//               <FormControl>
//                 <Input
//                   type="file"
//                   placeholder="shadcn"
//                   {...field}
//                   onChange={handleFileChange}
//                 />
//               </FormControl>
//               {previewImage && (
//                 <>
//                   <img
//                     src={previewImage}
//                     alt="Preview"
//                     className="w-48 h-48 object-cover"
//                   />
//                   <FormMessage>Selected file preview</FormMessage>
//                 </>
//               )}
//               <FormMessage />
//             </FormItem>
//           )}
//         />
//         <Button type="submit">Submit</Button>
//       </form>
//     </Form>
//   );
// }
