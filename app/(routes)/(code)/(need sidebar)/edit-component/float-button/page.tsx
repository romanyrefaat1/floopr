"use client";

import FloatingFeedbackButton from "@/components/floopr-integration/float-button-circle/floating-feedback-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useRef } from "react";
import { toast } from "sonner";

type PaddingSize = "sm" | "md" | "lg" | "xl";
type BorderRadiusSize = "sm" | "md" | "lg" | "xl";
type Position = "top-left" | "top-right" | "bottom-left" | "bottom-right";

interface ColorConfig {
  main: string;
  glow: string;
}

interface FeedbackTypeColors {
  feature?: ColorConfig;
  idea?: ColorConfig;
  bug?: ColorConfig;
  other?: ColorConfig;
}

interface FloatButtonConfig {
  metaData: {
    name: string;
    description: string;
    imageUrl: string;
  };
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  overlayColor: string;
  accentColor: string;
  borderColor: string;
  padding: PaddingSize;
  borderRadius: BorderRadiusSize;
  position: Position;
  isSecondSectionColorLikeFeatureType: boolean;
  feedbackTypeColors: FeedbackTypeColors;
  componentId: string;
  productId: string;
  isModal?: boolean;
}

export default function FloatButtonEditPage({ searchParams }) {
  const { ref: productRef, userTitle, userDescription } = searchParams;
  const router = useRouter();
  const componentId =
    typeof window !== "undefined" && window.crypto
      ? window.crypto.randomUUID()
      : "";

  const [config, setConfig] = useState<FloatButtonConfig>({
    metaData: {
      name: decodeURIComponent(userTitle) || "Float Button",
      description:
        decodeURIComponent(userDescription) ||
        "A customizable floating feedback button that appears on your website. Users can click it to leave feedback.",
      imageUrl: "/images/online/components/float-button.png",
    },
    primaryColor: "#7D65F6",
    backgroundColor: "#ffffff",
    textColor: "#000",
    overlayColor: "rgb(0 0 0 / 0.5)",
    accentColor: "#E1DCDC",
    borderColor: "#333333",
    padding: "md",
    borderRadius: "xl",
    position: "bottom-right",
    isSecondSectionColorLikeFeatureType: true,
    feedbackTypeColors: {},
    componentId,
    productId: productRef,
    isModal: false,
  });
  console.log(config.metaData.name, config.metaData.description);

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Debounced color change handler for main config colors
  const handleColorChange = (key: string, value: any) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setConfig((prev) => ({
        ...prev,
        [key]: value,
      }));
    }, 120);
  };

  // Add handleConfigChange for non-color, non-feedbackType fields
  const handleConfigChange = (key: string, value: any) => {
    setConfig((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // Debounced color change handler for feedbackTypeColors
  const handleFeedbackTypeColorChange = (
    type: string,
    colorKey: "main" | "glow",
    value: string
  ) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => {
      setConfig((prev) => ({
        ...prev,
        feedbackTypeColors: {
          ...prev.feedbackTypeColors,
          [type]: {
            ...prev.feedbackTypeColors[type],
            [colorKey]: value,
          },
        },
      }));
    }, 120);
  };

  const handleSave = async () => {
    try {
      const loadingToast = toast.loading("Saving component...");

      const response = await fetch("/api/save-component", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          componentData: config,
          cUserData: {
            uTitle: decodeURIComponent(userTitle),
            uDesc: decodeURIComponent(userDescription),
          },
          productId: productRef,
          componentType: "float-button",
        }),
      });

      toast.dismiss(loadingToast);

      if (!response.ok) {
        toast.error("Failed to save component. Please try again");
        return;
      }

      toast.success("Component saved successfully");
      router.push(`/products/${productRef}/#integrations`);
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <main className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Edit Float Button</h1>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>

      <div className="grid grid-cols-[1fr,400px] gap-6">
        <div className="space-y-6">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="colors">Colors</TabsTrigger>
              <TabsTrigger value="layout">Layout</TabsTrigger>
              <TabsTrigger value="feedback-types">Feedback Types</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select
                    value={config.position}
                    onValueChange={(value) =>
                      handleConfigChange("position", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Position Type</Label>
                  <Select
                    value={config.isModal ? "modal" : "popup"}
                    onValueChange={(value) =>
                      handleConfigChange("isModal", value === "modal")
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="modal">Modal</SelectItem>
                      <SelectItem value="popup">Pop up</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Primary Color</Label>
                  <Input
                    type="color"
                    value={config.primaryColor}
                    onChange={(e) =>
                      handleColorChange("primaryColor", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Background Color</Label>
                  <Input
                    type="color"
                    value={config.backgroundColor}
                    onChange={(e) =>
                      handleColorChange("backgroundColor", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>Text Color</Label>
                  <Input
                    type="color"
                    value={config.textColor}
                    onChange={(e) =>
                      handleColorChange("textColor", e.target.value)
                    }
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label>Padding</Label>
                  <Select
                    value={config.padding}
                    onValueChange={(value) =>
                      handleConfigChange("padding", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select padding" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Border Radius</Label>
                  <Select
                    value={config.borderRadius}
                    onValueChange={(value) =>
                      handleConfigChange("borderRadius", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select border radius" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sm">Small</SelectItem>
                      <SelectItem value="md">Medium</SelectItem>
                      <SelectItem value="lg">Large</SelectItem>
                      <SelectItem value="xl">Extra Large</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="feedback-types" className="space-y-4">
              <div className="grid gap-6">
                {["feature", "idea", "bug", "other"].map((type) => (
                  <div key={type} className="space-y-4">
                    <h3 className="text-lg font-semibold capitalize">{type}</h3>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <Label>Main Color</Label>
                        <Input
                          type="color"
                          value={config.feedbackTypeColors[type]?.main || ""}
                          onChange={(e) =>
                            handleFeedbackTypeColorChange(
                              type,
                              "main",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Glow Color</Label>
                        <Input
                          type="color"
                          value={config.feedbackTypeColors[type]?.glow || ""}
                          onChange={(e) =>
                            handleFeedbackTypeColorChange(
                              type,
                              "glow",
                              e.target.value
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="border rounded-lg p-4 sticky top-2 h-fit overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Preview</h2>
          <div className="relative h-[400px] border rounded-lg">
            <FloatingFeedbackButton {...config} isFixed={false} />
          </div>
        </div>
      </div>
    </main>
  );
}
