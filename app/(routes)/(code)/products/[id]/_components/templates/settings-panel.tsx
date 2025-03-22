import { Product } from "../../page";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SettingsPanel({
  productData,
}: {
  productData: Product;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-4">Settings</h2>
        <p className="text-muted-foreground mb-6">
          Configure your product settings and preferences
        </p>
      </div>

      <Tabs defaultValue="general">
        <TabsList className="mb-4">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Manage your product details and configuration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="product-name">Product Name</Label>
                <Input id="product-name" defaultValue={productData.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-description">Description</Label>
                <Input
                  id="product-description"
                  defaultValue={productData.description}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="product-url">Product URL</Label>
                <Input id="product-url" placeholder="https://yourproduct.com" />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-feedback">Public Feedback</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow users to see other feedback
                  </p>
                </div>
                <Switch id="public-feedback" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>
                Customize how your feedback forms and widgets look
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Primary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    defaultValue="#7c64f6"
                    className="w-12 h-12 p-1"
                  />
                  <Input defaultValue="#7c64f6" className="flex-1" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Font Family</Label>
                <Select defaultValue="inter">
                  <SelectTrigger>
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                    <SelectItem value="system">System Default</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Border Radius</Label>
                <Select defaultValue="md">
                  <SelectTrigger>
                    <SelectValue placeholder="Select border radius" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="sm">Small</SelectItem>
                    <SelectItem value="md">Medium</SelectItem>
                    <SelectItem value="lg">Large</SelectItem>
                    <SelectItem value="full">Full</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you receive notifications about new feedback
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email when new feedback is submitted
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Slack Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Send notifications to a Slack channel
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive a weekly summary of feedback
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Notification Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Team Management</CardTitle>
              <CardDescription>
                Manage team members who can access this product
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Invite Team Member</Label>
                <div className="flex gap-2">
                  <Input placeholder="Email address" className="flex-1" />
                  <Button>Invite</Button>
                </div>
              </div>
              <div className="border rounded-md">
                <div className="flex items-center justify-between p-4 border-b">
                  <div>
                    <p className="font-medium">john@example.com</p>
                    <p className="text-sm text-muted-foreground">Admin</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">sarah@example.com</p>
                    <p className="text-sm text-muted-foreground">Viewer</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Remove
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
