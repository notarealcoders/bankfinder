import React from "react";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { toast } from "sonner";

const ShareButton = ({ branchData }) => {
  const handleShare = async () => {
    const shareData = {
      title: `${branchData.BANK} - ${branchData.BRANCH}`,
      text: `Check out this bank branch:\n${branchData.BANK}\n${branchData.BRANCH}\nIFSC: ${branchData.IFSC}`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  return (
    <Button onClick={handleShare} variant="outline" size="sm">
      <Share2 className="mr-2 h-4 w-4" />
      Share
    </Button>
  );
};
export default ShareButton;
