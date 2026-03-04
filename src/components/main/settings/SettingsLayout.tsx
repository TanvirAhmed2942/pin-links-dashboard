import SmallPageInfo from "@/components/common/smallPageInfo/smallPageInfo"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Image, Settings, Shield } from "lucide-react"
import PlatformBranding from "./PlatformBranding"
import FeaturesToggle from "./FeaturesToggle"
import CustomSetting from "./CustomSetting"
import LegalDocuments from "./LegalDocuments"


function SettingsLayout() {
    return (
        <div className="space-y-4">
            <SmallPageInfo
                title="Settings Control"
                description="Enable or disable platform features"
            />
            <Tabs >
                <TabsList variant="line" className="gap-4">
                    <TabsTrigger value="platform-branding" className="rounded-none border-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sidebar-foreground hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:border-b-emerald-500"><Image /> Platform Branding</TabsTrigger>
                    <TabsTrigger value="legal-documents" className="rounded-none border-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sidebar-foreground hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:border-b-emerald-500"><FileText />Legal Documents</TabsTrigger>
                    <TabsTrigger value="feature-toggles" className="rounded-none border-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sidebar-foreground hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:border-b-emerald-500"><Settings />Feature Toggles</TabsTrigger>
                    <TabsTrigger value="custom-settings" className="rounded-none border-2 border-transparent bg-transparent px-0 pb-3 pt-3 text-sidebar-foreground hover:text-white data-[state=active]:text-white data-[state=active]:bg-transparent data-[state=active]:border-b-emerald-500"><Shield />Custom Settings</TabsTrigger>

                </TabsList>
                <TabsContent value="platform-branding">
                    <PlatformBranding />
                </TabsContent>
                <TabsContent value="legal-documents">
                    <LegalDocuments />
                </TabsContent>
                <TabsContent value="feature-toggles">
                    <FeaturesToggle />
                </TabsContent>
                <TabsContent value="custom-settings">
                    <CustomSetting />
                </TabsContent>
            </Tabs>
        </div>
    )
}

export default SettingsLayout