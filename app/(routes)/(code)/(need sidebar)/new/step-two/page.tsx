"use client";

import LoaderSpinner from "@/components/loader-spinner";
import ProductPreview from "@/components/product-preview";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNewProductFormContext } from "@/contexts/multistep-form-context";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const productStyleSchema = z.object({
  // Colors
  primaryColor: z.string().min(1, "Select a primary color"),
  secondaryColor: z.string().min(1, "Select a secondary color"),
  accentColor: z.string().min(1, "Select an accent color"),
  backgroundColor: z.string().min(1, "Select a background color"),
  textColor: z.string().min(1, "Select a text color"),

  // Typography
  fontFamily: z.string().min(1, "Select a font family"),
  fontSize: z.string().min(1, "Select a base font size"),
  headingStyle: z.string().min(1, "Select a heading style"),

  // Layout
  layout: z.string().min(1, "Select a layout type"),
  spacing: z.string().min(1, "Select spacing scale"),
  borderRadius: z.string().min(1, "Select border radius"),

  // Effects
  shadowStyle: z.string().min(1, "Select shadow style"),
  animation: z.string().min(1, "Select animation style"),
});

type ProductStyleForm = z.infer<typeof productStyleSchema>;

const fontFamilies = [
  { value: "Arial, sans-serif", label: "Arial (Sans-serif)" },
  { value: "Helvetica, sans-serif", label: "Helvetica (Sans-serif)" },
  { value: "Georgia, serif", label: "Georgia (Serif)" },
  { value: "'Roboto', sans-serif", label: "Roboto (Sans-serif)" },
  { value: "'Playfair Display', serif", label: "Playfair Display (Serif)" },
  { value: "'Montserrat', sans-serif", label: "Montserrat (Sans-serif)" },
  { value: "'Open Sans', sans-serif", label: "Open Sans (Sans-serif)" },
];

const fontSizes = [
  { value: "12px", label: "Small (12px)" },
  { value: "14px", label: "Medium (14px)" },
  { value: "16px", label: "Large (16px)" },
  { value: "18px", label: "X-Large (18px)" },
];

const headingStyles = [
  { value: "bold", label: "Bold" },
  { value: "light", label: "Light" },
  { value: "italic", label: "Italic" },
  { value: "uppercase", label: "Uppercase" },
];

const layoutOptions = [
  { value: "grid", label: "Grid Layout" },
  { value: "list", label: "List Layout" },
  { value: "cards", label: "Card Layout" },
  { value: "featured", label: "Featured Layout" },
];

const spacingOptions = [
  { value: "compact", label: "Compact" },
  { value: "comfortable", label: "Comfortable" },
  { value: "spacious", label: "Spacious" },
];

const borderRadiusOptions = [
  { value: "0px", label: "None" },
  { value: "4px", label: "Small" },
  { value: "8px", label: "Medium" },
  { value: "16px", label: "Large" },
  { value: "50%", label: "Rounded" },
];

const shadowOptions = [
  { value: "none", label: "None" },
  { value: "soft", label: "Soft" },
  { value: "medium", label: "Medium" },
  { value: "strong", label: "Strong" },
];

const animationOptions = [
  { value: "none", label: "None" },
  { value: "fade", label: "Fade" },
  { value: "slide", label: "Slide" },
  { value: "bounce", label: "Bounce" },
];

const Step2StyleProduct = () => {
  const { productForm, updateProductForm } = useNewProductFormContext();
  const router = useRouter();
  const [localPreview, setLocalPreview] = useState(null);
  const [isSubmitLoadin, setSubmitLoadin] = useState(false);

  // Use debounceTimer ref to manage color updates
  const debounceTimerRef = useRef(null);

  const defaultStyle: ProductStyleForm = {
    // Colors
    primaryColor: productForm.style?.primaryColor || "#007bff",
    secondaryColor: productForm.style?.secondaryColor || "#6c757d",
    accentColor: productForm.style?.accentColor || "#fd7e14",
    backgroundColor: productForm.style?.backgroundColor || "#f8f9fa",
    textColor: productForm.style?.textColor || "#212529",

    // Typography
    fontFamily: productForm.style?.fontFamily || "Arial, sans-serif",
    fontSize: productForm.style?.fontSize || "16px",
    headingStyle: productForm.style?.headingStyle || "bold",

    // Layout
    layout: productForm.style?.layout || "grid",
    spacing: productForm.style?.spacing || "comfortable",
    borderRadius: productForm.style?.borderRadius || "4px",

    // Effects
    shadowStyle: productForm.style?.shadowStyle || "soft",
    animation: productForm.style?.animation || "none",
  };

  const form = useForm<ProductStyleForm>({
    resolver: zodResolver(productStyleSchema),
    mode: "onChange",
    defaultValues: defaultStyle,
  });

  // Watch form values for live preview updates
  const watchedValues = form.watch();

  // Function to update global state with debounce for color changes
  const debouncedUpdateColor = (styleUpdates) => {
    // For immediate local preview
    setLocalPreview((prev) => ({
      ...(prev || watchedValues),
      ...styleUpdates,
    }));

    // Clear existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Set a new timer for updating the global state
    debounceTimerRef.current = setTimeout(() => {
      updateProductForm({
        style: styleUpdates,
      });
      setLocalPreview(null); // Clear local preview after update
    }, 400); // 300ms debounce time
  };

  // Update form values for non-color settings
  const handleSelectChange = (field, value) => {
    field.onChange(value);

    // Immediately update product form for select fields (no debounce needed)
    updateProductForm({
      style: { [field.name]: value },
    });
  };

  async function onSubmit(values: ProductStyleForm, event: React.FormEvent) {
    if (event) {
      event.preventDefault();
    }
    try {
      console.log(`onsubmit start`)
      toast.success("Updating product...");

      setSubmitLoadin(true);
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }

      // Make sure all values are saved in context
      await updateProductForm({ style: values });
      
      setSubmitLoadin(false);
      
      console.log(`onsubmit end`)
      toast.success("Product updated successfully");
      router.push("/new/step-three");
    } catch (error) {
      setSubmitLoadin(false);
      console.error("Error in form submission:", error);
    }
  }

  // Preview with either local preview values or watched form values
  const previewStyles = localPreview || watchedValues;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Style Your Product</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Left side: the style form */}
        <div>
          <Form {...form}>
            <form onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)(e);
            }}
            className="space-y-6">
              <Tabs defaultValue="colors" className="w-full">
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="colors">Colors</TabsTrigger>
                  <TabsTrigger value="typography">Typography</TabsTrigger>
                  <TabsTrigger value="layout">Layout</TabsTrigger>
                  <TabsTrigger value="effects">Effects</TabsTrigger>
                </TabsList>

                {/* Colors Tab */}
                <TabsContent value="colors" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Color Scheme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        name="primaryColor"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Primary Color</FormLabel>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{field.value}</span>
                                <FormControl>
                                  <Input
                                    type="color"
                                    {...field}
                                    className="w-10 h-10 p-1 rounded"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      debouncedUpdateColor({
                                        primaryColor: e.target.value,
                                      });
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormDescription>
                              Main color used for primary actions and highlights
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="secondaryColor"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Secondary Color</FormLabel>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{field.value}</span>
                                <FormControl>
                                  <Input
                                    type="color"
                                    {...field}
                                    className="w-10 h-10 p-1 rounded"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      debouncedUpdateColor({
                                        secondaryColor: e.target.value,
                                      });
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormDescription>
                              Color used for secondary elements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="accentColor"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Accent Color</FormLabel>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{field.value}</span>
                                <FormControl>
                                  <Input
                                    type="color"
                                    {...field}
                                    className="w-10 h-10 p-1 rounded"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      debouncedUpdateColor({
                                        accentColor: e.target.value,
                                      });
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormDescription>
                              Color for attention-grabbing elements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="backgroundColor"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Background Color</FormLabel>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{field.value}</span>
                                <FormControl>
                                  <Input
                                    type="color"
                                    {...field}
                                    className="w-10 h-10 p-1 rounded"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      debouncedUpdateColor({
                                        backgroundColor: e.target.value,
                                      });
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormDescription>
                              Main background color
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="textColor"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <div className="flex items-center justify-between">
                              <FormLabel>Text Color</FormLabel>
                              <div className="flex items-center gap-2">
                                <span className="text-xs">{field.value}</span>
                                <FormControl>
                                  <Input
                                    type="color"
                                    {...field}
                                    className="w-10 h-10 p-1 rounded"
                                    onChange={(e) => {
                                      field.onChange(e);
                                      debouncedUpdateColor({
                                        textColor: e.target.value,
                                      });
                                    }}
                                  />
                                </FormControl>
                              </div>
                            </div>
                            <FormDescription>Main text color</FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Typography Tab */}
                <TabsContent value="typography" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Typography Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        name="fontFamily"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Font Family</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a font family" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {fontFamilies.map((font) => (
                                  <SelectItem
                                    key={font.value}
                                    value={font.value}
                                    style={{ fontFamily: font.value }}
                                  >
                                    {font.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Primary font used across the product
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="fontSize"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Base Font Size</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a font size" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {fontSizes.map((size) => (
                                  <SelectItem
                                    key={size.value}
                                    value={size.value}
                                  >
                                    {size.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Base size for body text
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="headingStyle"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Heading Style</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a heading style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {headingStyles.map((style) => (
                                  <SelectItem
                                    key={style.value}
                                    value={style.value}
                                  >
                                    {style.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Style applied to all headings
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Layout Tab */}
                <TabsContent value="layout" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Layout Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        name="layout"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Layout Type</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a layout" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {layoutOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              How products will be arranged on the page
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="spacing"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Element Spacing</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select spacing" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {spacingOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Space between elements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="borderRadius"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Border Radius</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select border radius" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {borderRadiusOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Rounded corners for elements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Effects Tab */}
                <TabsContent value="effects" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Visual Effects</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        name="shadowStyle"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Shadow Style</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select shadow style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {shadowOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Shadow depth for elements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        name="animation"
                        control={form.control}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Animation Style</FormLabel>
                            <Select
                              onValueChange={(value) =>
                                handleSelectChange(field, value)
                              }
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select animation style" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {animationOptions.map((option) => (
                                  <SelectItem
                                    key={option.value}
                                    value={option.value}
                                  >
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Animations for interactive elements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              <div className="flex justify-between pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.back()}
                >
                  Back
                </Button>
                <Button type="submit" disabled={isSubmitLoadin}>
                  {isSubmitLoadin ? <LoaderSpinner /> : `Next`}
                </Button>
              </div>
            </form>
          </Form>
        </div>

        {/* Right side: Live preview */}
        <div className="sticky top-4">
          <Card>
            <CardHeader>
              <CardTitle>Live Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <ProductPreview overrideStyle={previewStyles} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Step2StyleProduct;
