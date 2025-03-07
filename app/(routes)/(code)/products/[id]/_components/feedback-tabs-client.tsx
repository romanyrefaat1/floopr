
// import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import ContentTab from "./tabs/content-tab";
import { Product } from "../page";

type FeedbackTabsClientProps = {
  productData: Product;
  isOwner: boolean;
};

export function FeedbackTabsClient({ productData, isOwner=false }: FeedbackTabsClientProps) {
  return (
    <Tabs
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger className="max-w-fit]" value="feedback-content">Content</TabsTrigger>
        {isOwner && <><TabsTrigger value="feedback-analytics">Analytics</TabsTrigger>
        <TabsTrigger value="feedback-settings">Settings</TabsTrigger>
        </>}
      </TabsList>
      <TabsContent value="feedback-content">
      <ContentTab productData={productData} />
      </TabsContent>
      {
      isOwner && <>
      <TabsContent value="feedback-analytics">
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>View your analytics here.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="Pedro Duarte" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input id="username" defaultValue="@peduarte" />
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="feedback-settings">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
            <CardDescription>
              Change your password here. After saving, you'll be logged out.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="space-y-1">
              <Label htmlFor="current">Current password</Label>
              <Input id="current" type="password" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="new">New password</Label>
              <Input id="new" type="password" />
            </div>
          </CardContent>
          <CardFooter>
            <Button>Save password</Button>
          </CardFooter>
        </Card>
      </TabsContent></>
      }
    </Tabs>
  );
}
